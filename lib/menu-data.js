// New menu data structure
export const newMenuData = {};

// Convert new menu structure to display format
export function convertMenuDataToSections(menuData) {
  const sections = [];
  let itemIdCounter = 1;

  // Coffee Menu
  if (menuData.coffee_menu) {
    const coffeeCategories = [];
    const coffee = menuData.coffee_menu;

    if (coffee.hot_coffee && coffee.hot_coffee.length > 0) {
      coffeeCategories.push({
        name: "Hot Coffee",
        items: coffee.hot_coffee.map((item) => ({
          id: `coffee-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-1.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (coffee.hot_latte && coffee.hot_latte.length > 0) {
      coffeeCategories.push({
        name: "Hot Latte",
        items: coffee.hot_latte.map((item) => ({
          id: `coffee-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-2.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (coffee.frappe && coffee.frappe.length > 0) {
      coffeeCategories.push({
        name: "Frappe",
        items: coffee.frappe.map((item) => ({
          id: `coffee-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-3.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (coffee.iced_coffee && coffee.iced_coffee.length > 0) {
      coffeeCategories.push({
        name: "Iced Coffee",
        items: coffee.iced_coffee.map((item) => ({
          id: `coffee-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-4.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (coffeeCategories.length > 0) {
      sections.push({
        id: "coffee",
        name: "Coffee Menu",
        categories: coffeeCategories,
        note: coffee.note || null,
      });
    }
  }

  // Food Menu
  if (menuData.food_menu) {
    const foodCategories = [];
    const food = menuData.food_menu;

    if (food.light_bites && food.light_bites.length > 0) {
      foodCategories.push({
        name: "Light Bites",
        items: food.light_bites.map((item) => ({
          id: `food-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-1.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (food.burgers_and_sandwiches && food.burgers_and_sandwiches.length > 0) {
      foodCategories.push({
        name: "Burgers & Sandwiches",
        items: food.burgers_and_sandwiches.map((item) => ({
          id: `food-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-2.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (
      food.pizza_neapolitan_base_11_inch &&
      food.pizza_neapolitan_base_11_inch.length > 0
    ) {
      foodCategories.push({
        name: "Pizza (Neapolitan Base - 11 inch)",
        items: food.pizza_neapolitan_base_11_inch.map((item) => ({
          id: `food-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          //  description: item.ingredients ? item.ingredients.join(", ") : "",

          image: "/assets/images/menu-3.png",
          badge: null,
          ingredients: item.ingredients || null,
          description: item.description || null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (foodCategories.length > 0) {
      sections.push({
        id: "food",
        name: "Food Menu",
        categories: foodCategories,
        note: food.notes || null,
      });
    }
  }

  // Dessert Menu
  if (menuData.dessert_menu) {
    const dessertCategories = [];
    const dessert = menuData.dessert_menu;

    if (dessert.bento_cakes && dessert.bento_cakes.length > 0) {
      dessertCategories.push({
        name: "Bento Cakes",
        items: dessert.bento_cakes.map((item) => ({
          id: `dessert-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-1.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (
      dessert.cheesecake_jars_and_slices &&
      dessert.cheesecake_jars_and_slices.length > 0
    ) {
      dessertCategories.push({
        name: "Cheesecake (Jars & Slices)",
        items: dessert.cheesecake_jars_and_slices.map((item) => ({
          id: `dessert-${itemIdCounter++}`,
          name: item.name,
          price: item.jar_price || item.slice_price,
          jar_price: item.jar_price || null,
          slice_price: item.slice_price || null,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-2.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (dessert.tres_leches && dessert.tres_leches.length > 0) {
      dessertCategories.push({
        name: "Tres Leches",
        items: dessert.tres_leches.map((item) => ({
          id: `dessert-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-3.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (dessert.cakes_500g && dessert.cakes_500g.length > 0) {
      dessertCategories.push({
        name: "Cakes (500g)",
        items: dessert.cakes_500g.map((item) => ({
          id: `dessert-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-4.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (dessert.tea_cakes && dessert.tea_cakes.length > 0) {
      dessertCategories.push({
        name: "Tea Cakes",
        items: dessert.tea_cakes.map((item) => ({
          id: `dessert-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-5.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (dessert.cake_tubs && dessert.cake_tubs.length > 0) {
      dessertCategories.push({
        name: "Cake Tubs",
        items: dessert.cake_tubs.map((item) => ({
          id: `dessert-${itemIdCounter++}`,
          name: item.name,
          price: item.price,
          description: item.description || null,
          ingredients: item.ingredients || null,
          image: "/assets/images/menu-6.png",
          badge: null,
          isSpecialDish: false,
          imageData: null,
        })),
      });
    }

    if (dessertCategories.length > 0) {
      sections.push({
        id: "dessert",
        name: "Dessert Menu",
        categories: dessertCategories,
        offer: dessert.offers ? dessert.offers.discount : null,
      });
    }
  }

  return sections;
}

// Format price display
export function formatPrice(price) {
  if (!price && price !== 0) return "N/A";
  return `₹${price}`;
}

// Format price range (for jar/slice prices)
export function formatPriceRange(item) {
  if (item.jar_price && item.slice_price) {
    return `₹${item.jar_price} / ₹${item.slice_price}`;
  } else if (item.jar_price) {
    return `₹${item.jar_price} (Jar)`;
  } else if (item.slice_price) {
    return `₹${item.slice_price} (Slice)`;
  }
  return formatPrice(item.price);
}
