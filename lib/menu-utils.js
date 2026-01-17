"use client";

import { newMenuData, convertMenuDataToSections } from "./menu-data";
import { supabase } from "./supabase";

// Transform database sections to display format
function transformSectionsToDisplayFormat(sections, categories, items) {
  return sections.map((section) => {
    const sectionCategories = categories
      .filter((cat) => cat.section_id === section.id)
      .map((category) => {
        const categoryItems = items
          .filter((item) => item.category_id === category.id)
          .map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            jar_price: item.jar_price,
            slice_price: item.slice_price,
            description: item.description,
            ingredients: item.ingredients,
            image: item.image || "/assets/images/menu-1.png",
            badge: item.badge,
            isSpecialDish: item.is_special_dish || false,
            imageData: item.image_data,
          }));

        return {
          name: category.name,
          items: categoryItems,
        };
      });

    return {
      id: section.id,
      name: section.name,
      categories: sectionCategories,
      note: section.note,
      offer: section.offer,
    };
  });
}

// Initialize menu data in Supabase (sync with default data if empty)
export async function initializeMenuData() {
  try {
    // Check if we have any sections in the database
    const { data: existingSections, error: sectionsError } = await supabase
      .from("menu_sections")
      .select("*")
      .limit(1);

    if (sectionsError && sectionsError.code !== "PGRST116") {
      console.error("Error checking menu sections:", sectionsError);
      return;
    }

    // If database is empty, initialize with default data
    if (!existingSections || existingSections.length === 0) {
      const convertedData = convertMenuDataToSections(newMenuData);
      await saveMenuData({ sections: convertedData });
    }
  } catch (error) {
    console.error("Error initializing menu data:", error);
  }
}

// Get menu data from Supabase
export async function getMenuData() {
  try {
    // Fetch all sections
    const { data: sections, error: sectionsError } = await supabase
      .from("menu_sections")
      .select("*")
      .order("id");

    if (sectionsError) {
      console.error("Error fetching menu sections:", sectionsError);
      return { sections: [] };
    }

    if (!sections || sections.length === 0) {
      // Initialize if empty
      await initializeMenuData();
      return await getMenuData(); // Recursive call after initialization
    }

    // Fetch all categories
    const { data: categories, error: categoriesError } = await supabase
      .from("menu_categories")
      .select("*")
      .order("id");

    if (categoriesError) {
      console.error("Error fetching menu categories:", categoriesError);
      return { sections: [] };
    }

    // Fetch all items
    const { data: items, error: itemsError } = await supabase
      .from("menu_items")
      .select("*")
      .order("id");

    if (itemsError) {
      console.error("Error fetching menu items:", itemsError);
      return { sections: [] };
    }

    // Transform to display format
    const transformedSections = transformSectionsToDisplayFormat(
      sections,
      categories || [],
      items || []
    );

    return { sections: transformedSections };
  } catch (error) {
    console.error("Error getting menu data:", error);
    return { sections: [] };
  }
}

// Save menu data to Supabase
export async function saveMenuData(data) {
  try {
    console.log("[Supabase] Starting to save menu data to Supabase...");
    if (!data || !data.sections) {
      console.error("[Supabase] Invalid menu data format");
      return;
    }

    // Process each section
    for (const section of data.sections) {
      // Upsert section
      const { error: sectionError } = await supabase
        .from("menu_sections")
        .upsert(
          {
            id: section.id,
            name: section.name,
            note: section.note || null,
            offer: section.offer || null,
          },
          { onConflict: "id" }
        );

      if (sectionError) {
        console.error(`Error saving section ${section.id}:`, sectionError);
        continue;
      }

      // Process categories and items
      if (section.categories && section.categories.length > 0) {
        for (const category of section.categories) {
          // Get or create category
          let categoryId;
          // Use maybeSingle() to handle cases where there might be duplicates
          // It returns the first match or null if none found
          const { data: existingCategories, error: fetchError } = await supabase
            .from("menu_categories")
            .select("id")
            .eq("section_id", section.id)
            .eq("name", category.name)
            .limit(1);

          if (fetchError) {
            console.error(
              `Error fetching category ${category.name}:`,
              fetchError
            );
            continue;
          }

          if (existingCategories && existingCategories.length > 0) {
            categoryId = existingCategories[0].id;
          } else {
            const { data: newCategory, error: categoryError } = await supabase
              .from("menu_categories")
              .insert({
                section_id: section.id,
                name: category.name,
              })
              .select("id")
              .limit(1);

            if (categoryError) {
              console.error(
                `Error creating category ${category.name}:`,
                categoryError
              );
              continue;
            }
            categoryId = newCategory && newCategory.length > 0 ? newCategory[0].id : null;
            if (!categoryId) {
              console.error(`Failed to get category ID for ${category.name}`);
              continue;
            }
          }

          // Upsert items in this category
          if (category.items && category.items.length > 0) {
            for (const item of category.items) {
              const itemData = {
                id: item.id,
                category_id: categoryId,
                section_id: section.id,
                name: item.name,
                price: item.price || null,
                jar_price: item.jar_price || null,
                slice_price: item.slice_price || null,
                description: item.description || null,
                ingredients: item.ingredients || null,
                image: item.image || "/assets/images/menu-1.png",
                badge: item.badge || null,
                is_special_dish: item.isSpecialDish || false,
                image_data: item.imageData || null,
              };

              console.log(`[Supabase] Saving menu item to database:`, {
                itemId: item.id,
                itemName: item.name,
                sectionId: section.id,
                categoryId: categoryId,
              });

              // Check if item exists and has changed before updating
              const { data: existingItem } = await supabase
                .from("menu_items")
                .select("*")
                .eq("id", item.id)
                .maybeSingle();

              // Only update if item doesn't exist or data has changed
              let needsUpdate = true;
              if (existingItem) {
                // Compare key fields to see if update is needed
                needsUpdate =
                  existingItem.name !== itemData.name ||
                  existingItem.price !== itemData.price ||
                  existingItem.description !== itemData.description ||
                  existingItem.badge !== itemData.badge ||
                  existingItem.is_special_dish !== itemData.is_special_dish ||
                  existingItem.image !== itemData.image ||
                  existingItem.image_data !== itemData.image_data ||
                  existingItem.category_id !== itemData.category_id ||
                  existingItem.section_id !== itemData.section_id;
              }

              if (!needsUpdate) {
                console.log(`[Supabase] Item ${item.id} unchanged, skipping update`);
                continue;
              }

              const { data: savedItem, error: itemError } = await supabase
                .from("menu_items")
                .upsert(itemData, { onConflict: "id" })
                .select()
                .limit(1);

              if (itemError) {
                console.error(`[Supabase] Error saving item ${item.id}:`, itemError);
                throw new Error(`Failed to save item ${item.name}: ${itemError.message}`);
              } else {
                const savedItemData = Array.isArray(savedItem) ? savedItem[0] : savedItem;
                console.log(`[Supabase] ✅ Successfully ${existingItem ? 'updated' : 'created'} item in database:`, {
                  itemId: savedItemData?.id,
                  itemName: savedItemData?.name,
                });
              }
            }
          }
        }
      }
    }
    console.log("[Supabase] ✅ Successfully saved all menu data to Supabase");
  } catch (error) {
    console.error("[Supabase] ❌ Error saving menu data:", error);
    throw error;
  }
}

// Get all special dishes from menu data
export async function getSpecialDishes() {
  const menuData = await getMenuData();
  const specialDishes = [];

  menuData.sections.forEach((section) => {
    if (section.categories && section.categories.length > 0) {
      section.categories.forEach((category) => {
        category.items.forEach((item) => {
          if (item.isSpecialDish) {
            specialDishes.push({
              ...item,
              sectionName: section.name,
              categoryName: category.name,
            });
          }
        });
      });
    } else if (section.items) {
      section.items.forEach((item) => {
        if (item.isSpecialDish) {
          specialDishes.push({
            ...item,
            sectionName: section.name,
          });
        }
      });
    }
  });

  return specialDishes;
}

// Get first special dish (for Special Dish section on homepage)
export async function getFirstSpecialDish() {
  const specialDishes = await getSpecialDishes();
  return specialDishes.length > 0 ? specialDishes[0] : null;
}
