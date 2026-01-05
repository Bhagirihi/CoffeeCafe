"use strict";

/**
 * MENU MANAGER
 * Handles dynamic menu loading and admin functionality
 */

// New menu data structure from user
const newMenuData = {
  dessert_menu: {
    bento_cakes: [
      {
        name: "Choco Nutella (Hazelnut)",
        price: 440,
        description:
          "Rich chocolate sponge layered with creamy Nutella and roasted hazelnut notes.",
        ingredients: ["Chocolate Sponge", "Nutella", "Hazelnut Cream", "Cocoa"],
      },
      {
        name: "Chocolate Mousse",
        price: 360,
        description:
          "Light and airy chocolate mousse layered over soft chocolate cake.",
        ingredients: [
          "Dark Chocolate",
          "Cream",
          "Eggless Mousse",
          "Chocolate Sponge",
        ],
      },
      {
        name: "Cookies & Cream (Oreo)",
        price: 360,
        description: "Classic Oreo cream layered with moist vanilla sponge.",
        ingredients: [
          "Vanilla Sponge",
          "Oreo Crumbs",
          "Cream Cheese",
          "Whipped Cream",
        ],
      },
      {
        name: "Lotus Biscoff",
        price: 440,
        description:
          "Smooth Biscoff spread paired with caramelized sponge layers.",
        ingredients: ["Biscoff Spread", "Vanilla Sponge", "Cream Cheese"],
      },
      {
        name: "Rose & Honey",
        price: 330,
        description:
          "Delicately floral cake infused with rose essence and natural honey.",
        ingredients: ["Vanilla Sponge", "Rose Syrup", "Honey", "Fresh Cream"],
      },
      {
        name: "Strawberry",
        price: 360,
        description:
          "Fresh strawberry compote layered with soft sponge and cream.",
        ingredients: ["Strawberry Compote", "Vanilla Sponge", "Whipped Cream"],
      },
      {
        name: "Nutella Berry",
        price: 440,
        description: "A rich Nutella base balanced with tangy mixed berries.",
        ingredients: ["Nutella", "Mixed Berries", "Chocolate Sponge", "Cream"],
      },
    ],

    cheesecake_jars_and_slices: [
      {
        name: "Biscoff",
        jar_price: 400,
        slice_price: 375,
        description: "Creamy baked cheesecake with a spiced Biscoff base.",
        ingredients: [
          "Cream Cheese",
          "Biscoff Biscuit Base",
          "Butter",
          "Sugar",
        ],
      },
      {
        name: "Blueberry",
        jar_price: 360,
        slice_price: 340,
        description: "Classic cheesecake topped with blueberry compote.",
        ingredients: ["Cream Cheese", "Blueberry Compote", "Biscuit Base"],
      },
      {
        name: "Nutella",
        jar_price: 400,
        slice_price: 350,
        description:
          "Decadent Nutella-infused cheesecake with a chocolate base.",
        ingredients: ["Cream Cheese", "Nutella", "Chocolate Biscuit Base"],
      },
      {
        name: "Strawberry",
        jar_price: 360,
        slice_price: 360,
        description:
          "Smooth cheesecake finished with fresh strawberry topping.",
        ingredients: ["Cream Cheese", "Strawberry Compote", "Biscuit Base"],
      },
      {
        name: "Tiramisu",
        jar_price: 360,
        slice_price: null,
        description:
          "Italian-style dessert with coffee-soaked layers and mascarpone.",
        ingredients: ["Mascarpone", "Coffee", "Cocoa", "Sponge Fingers"],
      },
      {
        name: "New York",
        jar_price: null,
        slice_price: 300,
        description: "Dense, classic New York-style baked cheesecake.",
        ingredients: ["Cream Cheese", "Cream", "Eggless Base", "Vanilla"],
      },
    ],

    tres_leches: [
      {
        name: "Milk",
        price: 400,
        description:
          "Soft sponge soaked in three-milk blend for a rich, moist bite.",
        ingredients: ["Milk", "Condensed Milk", "Cream", "Sponge Cake"],
      },
      {
        name: "Biscoff",
        price: 450,
        description: "Tres leches topped with smooth Biscoff cream.",
        ingredients: ["Milk Blend", "Biscoff Spread", "Vanilla Sponge"],
      },
      {
        name: "Strawberry",
        price: 450,
        description: "Classic tres leches with strawberry cream topping.",
        ingredients: ["Milk Blend", "Strawberry Cream", "Sponge Cake"],
      },
      {
        name: "Chocolate",
        price: 400,
        description: "Chocolate sponge soaked in rich milk blend.",
        ingredients: ["Chocolate Sponge", "Milk Blend", "Cocoa Cream"],
      },
    ],
  },

  food_menu: {
    light_bites: [
      {
        name: "Fries",
        price: 140,
        description: "Crispy golden potato fries.",
        ingredients: ["Potato", "Salt", "Oil"],
      },
      {
        name: "Peri Peri Fries",
        price: 180,
        description: "Fries tossed in spicy peri peri seasoning.",
        ingredients: ["Potato", "Peri Peri Spice", "Oil"],
      },
      {
        name: "Garlic Potato Bites",
        price: 180,
        description: "Crispy potato bites tossed in garlic butter.",
        ingredients: ["Potato", "Garlic", "Butter", "Herbs"],
      },
    ],

    burgers_and_sandwiches: [
      {
        name: "Tandoori Aloo Tikki Burger",
        price: 140,
        description: "Spiced aloo tikki with tandoori flavors.",
        ingredients: ["Aloo Patty", "Tandoori Masala", "Burger Bun", "Sauce"],
      },
      {
        name: "Spicy Paneer Burger",
        price: 250,
        description: "Grilled paneer patty with spicy house sauce.",
        ingredients: ["Paneer", "Burger Bun", "Spicy Sauce", "Veggies"],
      },
      {
        name: "Pesto Falafel Burger",
        price: 250,
        description: "Crispy falafel layered with basil pesto.",
        ingredients: ["Falafel", "Pesto Sauce", "Burger Bun", "Lettuce"],
      },
    ],

    pizza_neapolitan_base_11_inch: [
      {
        name: "Classic Margherita Pizza",
        price: 460,
        description:
          "Traditional Neapolitan pizza with rich cheese and tangy sauce.",
        ingredients: ["Neapolitan Dough", "Mozzarella", "Tomato Sauce"],
      },
      {
        name: "Tandoori Paneer Pizza",
        price: 550,
        description: "Smoky paneer tossed in tandoori sauce on a thin crust.",
        ingredients: ["Paneer", "Tandoori Sauce", "Onion", "Capsicum"],
      },
    ],
  },

  coffee_menu: {
    hot_coffee: [
      {
        name: "Espresso",
        price: 90,
        description: "Strong and bold single-shot espresso.",
        ingredients: ["Fresh Coffee Beans", "Water"],
      },
      {
        name: "Cappuccino",
        price: 180,
        description: "Balanced espresso with steamed milk and foam.",
        ingredients: ["Espresso", "Steamed Milk", "Milk Foam"],
      },
    ],

    iced_coffee: [
      {
        name: "Vietnamese Iced Coffee",
        price: 230,
        description: "Strong brewed coffee with condensed milk over ice.",
        ingredients: ["Coffee", "Condensed Milk", "Ice"],
      },
      {
        name: "Espresso Tonic",
        price: 249,
        description: "Refreshing espresso poured over chilled tonic water.",
        ingredients: ["Espresso", "Tonic Water", "Ice"],
      },
    ],
  },
};

// Convert new menu structure to display format
function convertMenuDataToSections(menuData) {
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
          image: "./assets/images/menu-1.png",
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
          image: "./assets/images/menu-2.png",
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
          image: "./assets/images/menu-3.png",
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
          image: "./assets/images/menu-4.png",
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
          image: "./assets/images/menu-1.png",
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
          image: "./assets/images/menu-2.png",
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
          description: item.description || null,
          image: "./assets/images/menu-3.png",
          badge: null,
          ingredients: item.ingredients || null,
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
          image: "./assets/images/menu-1.png",
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
          image: "./assets/images/menu-2.png",
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
          image: "./assets/images/menu-3.png",
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
          image: "./assets/images/menu-4.png",
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
          image: "./assets/images/menu-5.png",
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
          image: "./assets/images/menu-6.png",
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

// Default menu data structure (converted format)
const defaultMenuData = {
  sections: convertMenuDataToSections(newMenuData),
};

// Initialize menu data in localStorage if not exists
function initializeMenuData() {
  if (localStorage.getItem("menuData")) {
    // Use new menu structure for initial setup
    const convertedData = convertMenuDataToSections(newMenuData);
    const menuData = { sections: convertedData };
    localStorage.setItem("menuData", JSON.stringify(menuData));
  }
}

// Reset menu to new structure (useful for updates)
function resetMenuToNewData() {
  const convertedData = convertMenuDataToSections(newMenuData);
  const menuData = { sections: convertedData };
  localStorage.setItem("menuData", JSON.stringify(menuData));
  if (typeof document !== "undefined") {
    renderMenu();
  }
}

// Get menu data from localStorage
function getMenuData() {
  initializeMenuData();
  return JSON.parse(localStorage.getItem("menuData"));
}

// Save menu data to localStorage
function saveMenuData(data) {
  localStorage.setItem("menuData", JSON.stringify(data));
}

// Format price display
function formatPrice(price) {
  if (!price && price !== 0) return "N/A";
  return `₹${price}`;
}

// Format price range (for jar/slice prices)
function formatPriceRange(item) {
  if (item.jar_price && item.slice_price) {
    return `₹${item.jar_price} / ₹${item.slice_price}`;
  } else if (item.jar_price) {
    return `₹${item.jar_price} (Jar)`;
  } else if (item.slice_price) {
    return `₹${item.slice_price} (Slice)`;
  }
  return formatPrice(item.price);
}

// Render menu sections and items
function renderMenu() {
  const menuData = getMenuData();
  const menuContainer = document.getElementById("menu-container");

  if (!menuContainer) return;

  menuContainer.innerHTML = "";

  menuData.sections.forEach((section) => {
    // Create section wrapper
    const sectionWrapper = document.createElement("div");
    sectionWrapper.className = "menu-section";
    sectionWrapper.id = `section-${section.id}`;
    sectionWrapper.style.marginBottom = "80px";

    // Create section header
    const sectionHeader = document.createElement("div");
    sectionHeader.className = "section-header";
    sectionHeader.style.textAlign = "center";
    sectionHeader.style.marginBottom = "40px";
    sectionHeader.innerHTML = `
      <h3 class="headline-2 section-name" style="color: var(--gold-crayola);">${section.name}</h3>
    `;
    sectionWrapper.appendChild(sectionHeader);

    // Add note if exists
    if (section.note) {
      const noteDiv = document.createElement("p");
      noteDiv.className = "body-4 text-center";
      noteDiv.style.color = "var(--quick-silver)";
      noteDiv.style.marginBottom = "30px";
      noteDiv.style.fontStyle = "italic";
      noteDiv.textContent = `Note: ${section.note}`;
      sectionWrapper.appendChild(noteDiv);
    }

    // Add offer if exists
    if (section.offer) {
      const offerDiv = document.createElement("div");
      offerDiv.className = "text-center";
      offerDiv.style.marginBottom = "30px";
      offerDiv.style.padding = "15px";
      offerDiv.style.background = "var(--gold-crayola)";
      offerDiv.style.color = "var(--black)";
      offerDiv.style.borderRadius = "8px";
      offerDiv.style.fontWeight = "bold";
      offerDiv.textContent = section.offer;
      sectionWrapper.appendChild(offerDiv);
    }

    // Render categories
    if (section.categories && section.categories.length > 0) {
      section.categories.forEach((category) => {
        // Category header
        const categoryHeader = document.createElement("h4");
        categoryHeader.className = "title-3";
        categoryHeader.style.color = "var(--white)";
        categoryHeader.style.marginTop = "40px";
        categoryHeader.style.marginBottom = "25px";
        categoryHeader.style.textAlign = "center";
        categoryHeader.style.borderBottom = "2px solid var(--gold-crayola)";
        categoryHeader.style.paddingBottom = "10px";
        categoryHeader.textContent = category.name;
        sectionWrapper.appendChild(categoryHeader);

        // Create items grid
        const itemsGrid = document.createElement("ul");
        itemsGrid.className = "grid-list";

        category.items.forEach((item) => {
          const menuItem = document.createElement("li");
          const imageSrc =
            item.imageData || item.image || "./assets/images/menu-1.png";

          // Handle price display - use formatPriceRange if jar/slice exists, otherwise simple price
          let priceDisplay = formatPrice(item.price);
          if (item.jar_price || item.slice_price) {
            priceDisplay = formatPriceRange(item);
          }

          // Special dish styling - consistent across all pages
          const specialDishBadge = item.isSpecialDish
            ? '<span class="badge label-1" style="background: var(--gold-crayola); color: var(--black); font-weight: bold; padding: 6px 12px; border-radius: 20px; box-shadow: 0 2px 8px rgba(218, 165, 32, 0.4);">⭐ Special</span>'
            : "";
          const specialDishBorder = item.isSpecialDish
            ? 'style="border: 3px solid var(--gold-crayola); border-radius: 10px; padding: 10px;"'
            : "";

          // Build description
          let description = item.description || "";
          let ingredients = [];
          if (item.ingredients && item.ingredients.length > 0) {
            ingredients = `Ingredients: ${item.ingredients.join(", ")}`;
          }

          menuItem.innerHTML = `
            <div class="menu-card hover:card" ${specialDishBorder}>
              <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
                <img src="${imageSrc}" width="100" height="100" loading="lazy" alt="${
            item.name
          }" class="img-cover">
              </figure>
              <div>
                <div class="title-wrapper">
                  <h3 class="title-3">
                    <a href="#" class="card-title">${item.name}</a>
                  </h3>
                  ${
                    item.badge
                      ? `<span class="badge label-1">${item.badge}</span>`
                      : ""
                  }
                  ${specialDishBadge}
                  <span class="span title-2">${priceDisplay}/-</span>
                </div>
                <p class="card-text label-1">${description}</p>
                 <p class="card-text label-1">${ingredients}</p>
              </div>
            </div>
          `;
          itemsGrid.appendChild(menuItem);
        });

        sectionWrapper.appendChild(itemsGrid);
      });
    } else if (section.items) {
      // Fallback for old format
      const itemsGrid = document.createElement("ul");
      itemsGrid.className = "grid-list";

      section.items.forEach((item) => {
        const menuItem = document.createElement("li");
        const imageSrc =
          item.imageData || item.image || "./assets/images/menu-1.png";
        const priceDisplay = formatPrice(item.price);

        // Special dish styling - consistent across all pages
        const specialDishBadge = item.isSpecialDish
          ? '<span class="badge label-1" style="background: var(--gold-crayola); color: var(--black); font-weight: bold; padding: 6px 10px; border-radius: 5px; box-shadow: 0 2px 8px rgba(218, 165, 32, 0.4);">⭐ Special</span>'
          : "";
        const specialDishBorder = item.isSpecialDish
          ? 'style="border: 3px solid var(--gold-crayola); border-radius: 10px; padding: 10px;"'
          : "";

        menuItem.innerHTML = `
          <div class="menu-card hover:card" ${specialDishBorder}>
            <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
              <img src="${imageSrc}" width="100" height="100" loading="lazy" alt="${
          item.name
        }" class="img-cover">
            </figure>
            <div>
              <div class="title-wrapper">
                <h3 class="title-3">
                ${
                  item.badge
                    ? `<span class="badge label-1">${item.badge}</span>`
                    : ""
                }
                  <a href="#" class="card-title">${item.name}</a>
                </h3>

                ${specialDishBadge}
                <span class="span title-2">${priceDisplay}</span>
              </div>
              <p class="card-text label-1">${item.description || ""}</p>
            </div>
          </div>
        `;
        itemsGrid.appendChild(menuItem);
      });

      sectionWrapper.appendChild(itemsGrid);
    }

    menuContainer.appendChild(sectionWrapper);
  });
}

// Force load new menu data (call this to update menu)
function loadNewMenuData() {
  resetMenuToNewData();
}

// Get all special dishes from menu data
function getSpecialDishes() {
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
function getFirstSpecialDish() {
  const specialDishes = getSpecialDishes();
  return specialDishes.length > 0 ? specialDishes[0] : null;
}

// Render special dish section (for index.html)
function renderSpecialDishSection() {
  const specialDish = getFirstSpecialDish();
  const container = document.getElementById("special-dish-content");

  if (!container || !specialDish) {
    // If no special dish, hide the section or show default
    const section = document.querySelector(".special-dish");
    if (section) {
      section.style.display = "none";
    }
    return;
  }

  const imageSrc =
    specialDish.imageData ||
    specialDish.image ||
    "./assets/images/special-dish-banner.jpg";
  const priceDisplay = formatPrice(specialDish.price);
  const description =
    specialDish.description ||
    "A delicious special dish crafted with care and premium ingredients.";

  // Update the banner image dynamically
  const bannerImg = document.querySelector(".special-dish-banner img");
  if (bannerImg) {
    bannerImg.src = imageSrc;
    bannerImg.alt = specialDish.name;
  }

  // Update content
  const titleElement = container.querySelector(".headline-1.section-title");
  const descriptionElement = container.querySelector(".section-text");
  const priceElement = container.querySelector(".span.body-1");

  if (titleElement) {
    titleElement.textContent = specialDish.name;
    titleElement.style.whiteSpace = "nowrap";
    titleElement.style.overflow = "hidden";
    titleElement.style.textOverflow = "ellipsis";
  }
  if (descriptionElement) descriptionElement.textContent = description;
  if (priceElement) priceElement.textContent = priceDisplay;

  // Remove old price if exists
  const oldPriceElement = container.querySelector(".del.body-3");
  if (oldPriceElement) oldPriceElement.remove();
}

// Render menu preview on index.html (first 6 items or special dishes)
function renderMenuPreview(limit = 6) {
  const menuData = getMenuData();
  const container = document.getElementById("menu-preview-container");

  if (!container) return;

  const allItems = [];

  // Collect all items
  menuData.sections.forEach((section) => {
    if (section.categories && section.categories.length > 0) {
      section.categories.forEach((category) => {
        category.items.forEach((item) => {
          allItems.push(item);
        });
      });
    } else if (section.items) {
      section.items.forEach((item) => {
        allItems.push(item);
      });
    }
  });

  // Prioritize special dishes, then take first items
  const specialDishes = allItems.filter((item) => item.isSpecialDish);
  const regularItems = allItems.filter((item) => !item.isSpecialDish);
  const displayItems = [...specialDishes, ...regularItems].slice(0, limit);

  container.innerHTML = "";
  const itemsGrid = document.createElement("ul");
  itemsGrid.className = "grid-list";

  displayItems.forEach((item) => {
    const menuItem = document.createElement("li");
    const imageSrc =
      item.imageData || item.image || "./assets/images/menu-1.png";
    const priceDisplay = formatPrice(item.price);

    // Special dish styling - consistent across all pages
    const specialDishBadge = item.isSpecialDish
      ? '<span class="badge label-1" style="background: var(--gold-crayola); color: var(--black); font-weight: bold; padding: 6px 12px; border-radius: 20px; box-shadow: 0 2px 8px rgba(218, 165, 32, 0.4);">⭐ Special</span>'
      : "";
    const specialDishBorder = item.isSpecialDish
      ? 'style="border: 3px solid var(--gold-crayola); border-radius: 10px; padding: 10px;"'
      : "";

    menuItem.innerHTML = `
      <div class="menu-card hover:card" ${specialDishBorder}>
        <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
          <img src="${imageSrc}" width="100" height="100" loading="lazy" alt="${
      item.name
    }" class="img-cover">
        </figure>
        <div>
          <div class="title-wrapper">
            <h3 class="title-3">
              <a href="menu.html" class="card-title">${item.name}</a>
            </h3>
            ${
              item.badge
                ? `<span class="badge label-1">${item.badge}</span>`
                : ""
            }
            ${specialDishBadge}
            <span class="span title-2">${priceDisplay}</span>
          </div>
          <p class="card-text label-1">${item.description || ""}</p>
        </div>
      </div>
    `;
    itemsGrid.appendChild(menuItem);
  });

  container.appendChild(itemsGrid);
}

// Initialize menu on page load
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMenu);
  } else {
    renderMenu();
  }
}

// Export functions for admin page
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    getMenuData,
    saveMenuData,
    initializeMenuData,
    defaultMenuData,
    convertMenuDataToSections,
    newMenuData,
  };
}
