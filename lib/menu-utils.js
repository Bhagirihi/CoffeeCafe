"use client";

import { newMenuData, convertMenuDataToSections } from "./menu-data";

// Initialize menu data in localStorage if not exists
// export function initializeMenuData() {
//   if (typeof window === "undefined") return;

//   if (!localStorage.getItem("menuData")) {
//     const convertedData = convertMenuDataToSections(newMenuData);
//     const menuData = { sections: convertedData };
//     localStorage.setItem("menuData", JSON.stringify(menuData));
//   }
// }

export function initializeMenuData() {
  if (typeof window === "undefined") return;

  const stored = localStorage.getItem("menuData");
  const convertedData = convertMenuDataToSections(newMenuData);
  const latestData = { sections: convertedData };

  // If nothing stored, initialize
  if (!stored) {
    localStorage.setItem("menuData", JSON.stringify(latestData));
    return;
  }

  const existing = JSON.parse(stored);

  // If any change, overwrite section-wise and item-wise
  const updatedSections = latestData.sections.map((latestSection) => {
    const existingSection =
      existing.sections?.find((s) => s.id === latestSection.id) ||
      latestSection;

    // Ensure arrays exist
    const latestItems = Array.isArray(latestSection.items)
      ? latestSection.items
      : [];

    const existingItems = Array.isArray(existingSection.items)
      ? existingSection.items
      : [];

    const updatedItems = latestItems.map((latestItem) => {
      const existingItem =
        existingItems.find((i) => i.id === latestItem.id) || latestItem;

      return {
        ...existingItem,
        ...latestItem,
      };
    });

    return {
      ...existingSection,
      ...latestSection,
      items: updatedItems,
    };
  });

  const finalData = { sections: updatedSections };

  localStorage.setItem("menuData", JSON.stringify(finalData));
}

// Get menu data from localStorage
export function getMenuData() {
  if (typeof window === "undefined") return { sections: [] };

  initializeMenuData();
  try {
    return JSON.parse(localStorage.getItem("menuData") || '{"sections":[]}');
  } catch (e) {
    return { sections: [] };
  }
}

// Save menu data to localStorage
export function saveMenuData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem("menuData", JSON.stringify(data));
}

// Get all special dishes from menu data
export function getSpecialDishes() {
  const menuData = getMenuData();
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
export function getFirstSpecialDish() {
  const specialDishes = getSpecialDishes();
  return specialDishes.length > 0 ? specialDishes[0] : null;
}
