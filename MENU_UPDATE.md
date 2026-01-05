# Menu Update Documentation

## Overview
The menu system has been updated to use the new menu structure provided. The menu now includes:

### Coffee Menu
- **Hot Coffee**: Espresso, Doppio, Americano, Cappuccino, Mocha, Macchiato, Cortado
- **Hot Latte**: Latte, Vanilla Latte, Hazelnut Latte, Caramel Latte, Irish Latte
- **Frappe**: Classic Cold Coffee, Vanilla, Hazelnut, Mocha, Caramel Popcorn, Irish, Strawberry
- **Iced Coffee**: Iced Latte, Flavour Add-on, Iced Americano, Vietnamese Iced Coffee, Redbull Espresso, Espresso Tonic, Iced Mocha
- **Note**: "Ask for hot chocolate"

### Food Menu
- **Light Bites**: Fries, Peri Peri Fries, Garlic Potato Bites
- **Burgers & Sandwiches**: Various vegetarian options including Tandoori Aloo Tikki Burger, Spicy Paneer Burger, Pesto Falafel Burger, and sandwiches
- **Pizza (Neapolitan Base - 11 inch)**: Veggie Overload, Basil Pesto, Classic Margherita, Tandoori Paneer, Creamy Paneer (with ingredients listed)
- **Note**: "Preparation time may take 15 minutes"

### Dessert Menu
- **Bento Cakes**: 7 varieties including Choco Nutella, Chocolate Mousse, Cookies & Cream, Lotus Biscoff, etc.
- **Cheesecake (Jars & Slices)**: Available in both jar and slice options with different pricing
- **Tres Leches**: Milk, Biscoff, Strawberry, Chocolate
- **Cakes (500g)**: 7 varieties including Vanilla, Rose & Honey, Pineapple, Fresh Strawberry, Tiramisu, etc.
- **Tea Cakes**: Banana Walnut, Choco Marble, Dark Chocolate Orange
- **Cake Tubs**: 8 varieties including Tiramisu, Pineapple, Chocochip, Rose & Honey, etc.
- **Offer**: "Flat 20% off on above"

## Features

### Price Display
- All prices are displayed in Indian Rupees (₹)
- Cheesecake items show both jar and slice prices when available
- Format: "₹400 / ₹375" for items with both options

### Special Handling
1. **Cheesecake Items**: Display both jar_price and slice_price when both are available
2. **Pizza Items**: Show ingredients list in description
3. **Notes**: Section notes are displayed at the top of each menu section
4. **Offers**: Dessert menu shows the discount offer prominently

### Category Organization
Each main menu (Coffee, Food, Dessert) is organized into subcategories for better navigation.

## How to Use

### View Menu
Simply open `menu.html` in your browser. The menu will automatically load with the new structure.

### Reset Menu to New Data
If you need to reset the menu to the original new structure (useful if admin made changes you want to undo), open the browser console and run:

```javascript
resetMenuToNewData();
```

Or call:

```javascript
loadNewMenuData();
```

### Admin Panel
The admin panel (`admin.html`) can still be used to edit menu items. Changes made through the admin panel will be preserved until you reset the menu.

## Technical Details

### Data Structure
The menu data is stored in `localStorage` under the key `menuData`. The structure is:

```javascript
{
  sections: [
    {
      id: 'coffee',
      name: 'Coffee Menu',
      categories: [
        {
          name: 'Hot Coffee',
          items: [...]
        }
      ],
      note: 'Ask for hot chocolate'
    }
  ]
}
```

### Conversion
The original JSON structure is automatically converted to the display format when the page loads.

## Notes
- Prices are in Indian Rupees (₹)
- All menu items are displayed with proper formatting
- The menu is fully responsive and works on all device sizes
- Admin functionality is preserved and can be used to edit the menu

