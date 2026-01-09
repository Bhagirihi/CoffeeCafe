// Convert sections format back to newMenuData format
export function convertSectionsToMenuData(sections) {
  const menuData = {
    dessert_menu: {},
    food_menu: {},
    coffee_menu: {},
  };

  sections.forEach((section) => {
    if (section.id === "dessert") {
      // Process dessert menu categories
      if (section.categories) {
        section.categories.forEach((category) => {
          const categoryKey = getCategoryKey(category.name, "dessert");
          if (categoryKey) {
            menuData.dessert_menu[categoryKey] = category.items
              .filter((item) => item.name && item.name.trim() !== "") // Filter out empty items
              .map((item) => {
                // Remove display-only properties
                const itemData = {
                  name: item.name,
                  description: item.description || "",
                  ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
                };

                // Handle different price structures
                if (categoryKey === "cheesecake_jars_and_slices") {
                  if (item.jar_price !== undefined && item.jar_price !== null) {
                    itemData.jar_price = item.jar_price;
                  }
                  if (item.slice_price !== undefined && item.slice_price !== null) {
                    itemData.slice_price = item.slice_price;
                  }
                  // If neither is set but price exists, use price as jar_price
                  if (!itemData.jar_price && !itemData.slice_price && item.price !== undefined && item.price !== null) {
                    itemData.jar_price = item.price;
                  }
                } else {
                  if (item.price !== undefined && item.price !== null) {
                    itemData.price = item.price;
                  }
                }

                return itemData;
              });
          }
        });
      }
    } else if (section.id === "food") {
      // Process food menu categories
      if (section.categories) {
        section.categories.forEach((category) => {
          const categoryKey = getCategoryKey(category.name, "food");
          if (categoryKey) {
            menuData.food_menu[categoryKey] = category.items
              .filter((item) => item.name && item.name.trim() !== "")
              .map((item) => ({
                name: item.name,
                price: item.price || 0,
                description: item.description || "",
                ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
              }));
          }
        });
      }
    } else if (section.id === "coffee") {
      // Process coffee menu categories
      if (section.categories) {
        section.categories.forEach((category) => {
          const categoryKey = getCategoryKey(category.name, "coffee");
          if (categoryKey) {
            menuData.coffee_menu[categoryKey] = category.items
              .filter((item) => item.name && item.name.trim() !== "")
              .map((item) => ({
                name: item.name,
                price: item.price || 0,
                description: item.description || "",
                ingredients: Array.isArray(item.ingredients) ? item.ingredients : [],
              }));
          }
        });
      }
    }
    // Note: Custom sections are not saved back to newMenuData structure
    // They will remain only in localStorage
  });

  // Remove empty menu objects and empty categories
  Object.keys(menuData.dessert_menu).forEach((key) => {
    if (menuData.dessert_menu[key].length === 0) {
      delete menuData.dessert_menu[key];
    }
  });
  Object.keys(menuData.food_menu).forEach((key) => {
    if (menuData.food_menu[key].length === 0) {
      delete menuData.food_menu[key];
    }
  });
  Object.keys(menuData.coffee_menu).forEach((key) => {
    if (menuData.coffee_menu[key].length === 0) {
      delete menuData.coffee_menu[key];
    }
  });

  if (Object.keys(menuData.dessert_menu).length === 0) {
    delete menuData.dessert_menu;
  }
  if (Object.keys(menuData.food_menu).length === 0) {
    delete menuData.food_menu;
  }
  if (Object.keys(menuData.coffee_menu).length === 0) {
    delete menuData.coffee_menu;
  }

  return menuData;
}

// Helper function to map category names to keys
function getCategoryKey(categoryName, menuType) {
  const mapping = {
    dessert: {
      "Bento Cakes": "bento_cakes",
      "Cheesecake (Jars & Slices)": "cheesecake_jars_and_slices",
      "Tres Leches": "tres_leches",
      "Cakes (500g)": "cakes_500g",
      "Tea Cakes": "tea_cakes",
      "Cake Tubs": "cake_tubs",
    },
    food: {
      "Light Bites": "light_bites",
      "Burgers & Sandwiches": "burgers_and_sandwiches",
      "Pizza (Neapolitan Base - 11 inch)": "pizza_neapolitan_base_11_inch",
    },
    coffee: {
      "Hot Coffee": "hot_coffee",
      "Hot Latte": "hot_latte",
      "Frappe": "frappe",
      "Iced Coffee": "iced_coffee",
    },
  };

  return mapping[menuType]?.[categoryName] || null;
}

// Generate JavaScript file content from menu data
export function generateMenuDataFile(menuData) {
  let fileContent = '// New menu data structure\n';
  fileContent += 'export const newMenuData = ';
  fileContent += JSON.stringify(menuData, null, 2)
    .replace(/"([^"]+)":/g, '$1:')  // Remove quotes from keys
    .replace(/null/g, 'null')
    .replace(/\[/g, '[')
    .replace(/\]/g, ']')
    .replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas

  // Fix the JSON stringification to match JS object format better
  fileContent = fileContent
    .replace(/(\w+):/g, '$1:')
    .replace(/"/g, '"')
    .replace(/:\s*"([^"]*)"/g, ': "$1"')
    .replace(/:\s*(\d+)/g, ': $1')
    .replace(/:\s*null/g, ': null')
    .replace(/:\s*\[/g, ': [')
    .replace(/,\s*\n\s*\}/g, '\n  }')
    .replace(/,\s*\n\s*\]/g, '\n  ]');

  fileContent += ';\n\n';
  fileContent += '// Convert new menu structure to display format\n';
  fileContent += 'export function convertMenuDataToSections(menuData) {\n';
  // ... rest of the existing convertMenuDataToSections function

  return fileContent;
}

// Better approach: Format as JavaScript object directly
export function formatMenuDataAsJS(menuData) {
  function formatValue(value, indent = 2) {
    const spaces = ' '.repeat(indent);

    if (Array.isArray(value)) {
      if (value.length === 0) return '[]';
      let result = '[\n';
      value.forEach((item, index) => {
        result += `${spaces}  `;
        result += formatValue(item, indent + 2);
        if (index < value.length - 1) result += ',';
        result += '\n';
      });
      result += `${spaces}]`;
      return result;
    }

    if (typeof value === 'object' && value !== null) {
      const keys = Object.keys(value);
      if (keys.length === 0) return '{}';
      let result = '{\n';
      keys.forEach((key, index) => {
        result += `${spaces}  ${key}: `;
        result += formatValue(value[key], indent + 2);
        if (index < keys.length - 1) result += ',';
        result += '\n';
      });
      result += `${spaces}}`;
      return result;
    }

    if (typeof value === 'string') {
      // Escape special characters in strings
      const escaped = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
      return `"${escaped}"`;
    }

    if (value === null) return 'null';
    return String(value);
  }

  return formatValue(menuData, 0);
}
