// New menu data structure
export const newMenuData = {
    dessert_menu: {
      bento_cakes: [
        {
          name: "Choco Nutella (Hazelnut)",
          description: "Rich chocolate sponge layered with creamy Nutella and roasted hazelnut notes.",
          ingredients: [
            "Chocolate Sponge",
            "Nutella",
            "Hazelnut Cream",
            "Cocoa"
          ],
          price: 440
        },
        {
          name: "Chocolate Mousse",
          description: "Light and airy chocolate mousse layered over soft chocolate cake.",
          ingredients: [
            "Dark Chocolate",
            "Cream",
            "Eggless Mousse",
            "Chocolate Sponge"
          ],
          price: 360
        },
        {
          name: "Cookies & Cream (Oreo)",
          description: "Classic Oreo cream layered with moist vanilla sponge.",
          ingredients: [
            "Vanilla Sponge",
            "Oreo Crumbs",
            "Cream Cheese",
            "Whipped Cream"
          ],
          price: 360
        },
        {
          name: "Lotus Biscoff",
          description: "Smooth Biscoff spread paired with caramelized sponge layers.",
          ingredients: [
            "Biscoff Spread",
            "Vanilla Sponge",
            "Cream Cheese"
          ],
          price: 440
        },
        {
          name: "Rose & Honey",
          description: "Delicately floral cake infused with rose essence and natural honey.",
          ingredients: [
            "Vanilla Sponge",
            "Rose Syrup",
            "Honey",
            "Fresh Cream"
          ],
          price: 330
        },
        {
          name: "Strawberry",
          description: "Fresh strawberry compote layered with soft sponge and cream.",
          ingredients: [
            "Strawberry Compote",
            "Vanilla Sponge",
            "Whipped Cream"
          ],
          price: 360
        },
        {
          name: "Nutella Berry",
          description: "A rich Nutella base balanced with tangy mixed berries.",
          ingredients: [
            "Nutella",
            "Mixed Berries",
            "Chocolate Sponge",
            "Cream"
          ],
          price: 440
        }
      ],
      cheesecake_jars_and_slices: [
        {
          name: "Biscoff",
          description: "Creamy baked cheesecake with a spiced Biscoff base.",
          ingredients: [
            "Cream Cheese",
            "Biscoff Biscuit Base",
            "Butter",
            "Sugar"
          ],
          jar_price: 400,
          slice_price: 375
        },
        {
          name: "Blueberry",
          description: "Classic cheesecake topped with blueberry compote.",
          ingredients: [
            "Cream Cheese",
            "Blueberry Compote",
            "Biscuit Base"
          ],
          jar_price: 360,
          slice_price: 340
        },
        {
          name: "Nutella",
          description: "Decadent Nutella-infused cheesecake with a chocolate base.",
          ingredients: [
            "Cream Cheese",
            "Nutella",
            "Chocolate Biscuit Base"
          ],
          jar_price: 400,
          slice_price: 350
        },
        {
          name: "Strawberry",
          description: "Smooth cheesecake finished with fresh strawberry topping.",
          ingredients: [
            "Cream Cheese",
            "Strawberry Compote",
            "Biscuit Base"
          ],
          jar_price: 360,
          slice_price: 360
        },
        {
          name: "Tiramisu",
          description: "Italian-style dessert with coffee-soaked layers and mascarpone.",
          ingredients: [
            "Mascarpone",
            "Coffee",
            "Cocoa",
            "Sponge Fingers"
          ],
          jar_price: 360
        },
        {
          name: "New York",
          description: "Dense, classic New York-style baked cheesecake.",
          ingredients: [
            "Cream Cheese",
            "Cream",
            "Eggless Base",
            "Vanilla"
          ],
          slice_price: 300
        }
      ],
      tres_leches: [
        {
          name: "Milk",
          description: "Soft sponge soaked in three-milk blend for a rich, moist bite.",
          ingredients: [
            "Milk",
            "Condensed Milk",
            "Cream",
            "Sponge Cake"
          ],
          price: 400
        },
        {
          name: "Biscoff",
          description: "Tres leches topped with smooth Biscoff cream.",
          ingredients: [
            "Milk Blend",
            "Biscoff Spread",
            "Vanilla Sponge"
          ],
          price: 450
        },
        {
          name: "Strawberry",
          description: "Classic tres leches with strawberry cream topping.",
          ingredients: [
            "Milk Blend",
            "Strawberry Cream",
            "Sponge Cake"
          ],
          price: 450
        },
        {
          name: "Chocolate",
          description: "Chocolate sponge soaked in rich milk blend.",
          ingredients: [
            "Chocolate Sponge",
            "Milk Blend",
            "Cocoa Cream"
          ],
          price: 400
        }
      ]
    },
    food_menu: {
      light_bites: [
        {
          name: "Fries",
          price: 140,
          description: "Crispy golden potato fries.",
          ingredients: [
            "Potato",
            "Salt",
            "Oil"
          ]
        },
        {
          name: "Peri Peri Fries",
          price: 180,
          description: "Fries tossed in spicy peri peri seasoning.",
          ingredients: [
            "Potato",
            "Peri Peri Spice",
            "Oil"
          ]
        },
        {
          name: "Garlic Potato Bites",
          price: 180,
          description: "Crispy potato bites tossed in garlic butter.",
          ingredients: [
            "Potato",
            "Garlic",
            "Butter",
            "Herbs"
          ]
        }
      ],
      burgers_and_sandwiches: [
        {
          name: "Tandoori Aloo Tikki Burger",
          price: 140,
          description: "Spiced aloo tikki with tandoori flavors.",
          ingredients: [
            "Aloo Patty",
            "Tandoori Masala",
            "Burger Bun",
            "Sauce"
          ]
        },
        {
          name: "Spicy Paneer Burger",
          price: 250,
          description: "Grilled paneer patty with spicy house sauce.",
          ingredients: [
            "Paneer",
            "Burger Bun",
            "Spicy Sauce",
            "Veggies"
          ]
        },
        {
          name: "Pesto Falafel Burger",
          price: 250,
          description: "Crispy falafel layered with basil pesto.",
          ingredients: [
            "Falafel",
            "Pesto Sauce",
            "Burger Bun",
            "Lettuce"
          ]
        }
      ],
      pizza_neapolitan_base_11_inch: [
        {
          name: "Classic Margherita Pizza",
          price: 460,
          description: "Traditional Neapolitan pizza with rich cheese and tangy sauce.",
          ingredients: [
            "Neapolitan Dough",
            "Mozzarella",
            "Tomato Sauce"
          ]
        },
        {
          name: "Tandoori Paneer Pizza",
          price: 550,
          description: "Smoky paneer tossed in tandoori sauce on a thin crust.",
          ingredients: [
            "Paneer",
            "Tandoori Sauce",
            "Onion",
            "Capsicum"
          ]
        }
      ]
    },
    coffee_menu: {
      hot_coffee: [
        {
          name: "Espresso",
          price: 898,
          description: "Strong and bold single-shot espresso.",
          ingredients: []
        },
        {
          name: "Cappuccino",
          price: 180,
          description: "Balanced espresso with steamed milk and foam.",
          ingredients: [
            "Espresso",
            "Steamed Milk",
            "Milk Foam"
          ]
        }
      ],
      iced_coffee: [
        {
          name: "Vietnamese Iced Coffee",
          price: 230,
          description: "Strong brewed coffee with condensed milk over ice.",
          ingredients: [
            "Coffee",
            "Condensed Milk",
            "Ice"
          ]
        },
        {
          name: "Espresso Tonic",
          price: 249,
          description: "Refreshing espresso poured over chilled tonic water.",
          ingredients: [
            "Espresso",
            "Tonic Water",
            "Ice"
          ]
        }
      ]
    }
  };

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
