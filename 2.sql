create table menu_categories (
  id uuid primary key default gen_random_uuid(),
  key text not null unique, -- dessert_menu, food_menu, coffee_menu
  name text not null,
  created_at timestamptz default now()
);

create table menu_sections (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references menu_categories(id) on delete cascade,
  key text not null, -- bento_cakes, light_bites, etc
  name text not null,
  created_at timestamptz default now(),
  unique(category_id, key)
);

create table menu_items (
  id uuid primary key default gen_random_uuid(),
  section_id uuid references menu_sections(id) on delete cascade,
  name text not null,
  description text,
  ingredients text[],
  price numeric(10,2),
  jar_price numeric(10,2),
  slice_price numeric(10,2),
  is_available boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);

create table table_bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  guests text not null, -- e.g. "2-person"
  booking_date date not null,
  booking_time time not null,
  message text,
  created_at timestamptz default now()
);

create index on menu_sections(category_id);
create index on menu_items(section_id);
create index on table_bookings(booking_date);

insert into menu_categories (key, name) values
('dessert_menu', 'Dessert Menu'),
('food_menu', 'Food Menu'),
('coffee_menu', 'Coffee Menu')
returning id, key;

insert into menu_sections (category_id, key, name)
select c.id, s.key, s.name
from menu_categories c
join (values
  ('dessert_menu','bento_cakes','Bento Cakes'),
  ('dessert_menu','cheesecake_jars_and_slices','Cheesecake Jars & Slices'),
  ('dessert_menu','tres_leches','Tres Leches'),
  ('food_menu','light_bites','Light Bites'),
  ('food_menu','burgers_and_sandwiches','Burgers & Sandwiches'),
  ('food_menu','pizza_neapolitan_base_11_inch','Pizza (Neapolitan Base - 11 Inch)'),
  ('coffee_menu','hot_coffee','Hot Coffee'),
  ('coffee_menu','iced_coffee','Iced Coffee')
) s(category_key, key, name)
on c.key = s.category_key;

insert into menu_items (section_id, name, description, ingredients, price, jar_price, slice_price)
select s.id, i.name, i.description, string_to_array(i.ingredients, '|'), i.price, i.jar_price, i.slice_price
from menu_sections s
join (values
  ('bento_cakes','Choco Nutella (Hazelnut)','Rich chocolate sponge layered with creamy Nutella and roasted hazelnut notes.','Chocolate Sponge|Nutella|Hazelnut Cream|Cocoa',440,null,null),
  ('bento_cakes','Chocolate Mousse','Light and airy chocolate mousse layered over soft chocolate cake.','Dark Chocolate|Cream|Eggless Mousse|Chocolate Sponge',360,null,null),
  ('bento_cakes','Cookies & Cream (Oreo)','Classic Oreo cream layered with moist vanilla sponge.','Vanilla Sponge|Oreo Crumbs|Cream Cheese|Whipped Cream',360,null,null),
  ('bento_cakes','Lotus Biscoff','Smooth Biscoff spread paired with caramelized sponge layers.','Biscoff Spread|Vanilla Sponge|Cream Cheese',440,null,null),
  ('bento_cakes','Rose & Honey','Delicately floral cake infused with rose essence and natural honey.','Vanilla Sponge|Rose Syrup|Honey|Fresh Cream',330,null,null),
  ('bento_cakes','Strawberry','Fresh strawberry compote layered with soft sponge and cream.','Strawberry Compote|Vanilla Sponge|Whipped Cream',360,null,null),
  ('bento_cakes','Nutella Berry','A rich Nutella base balanced with tangy mixed berries.','Nutella|Mixed Berries|Chocolate Sponge|Cream',440,null,null),

  ('cheesecake_jars_and_slices','Biscoff','Creamy baked cheesecake with a spiced Biscoff base.','Cream Cheese|Biscoff Biscuit Base|Butter|Sugar',null,400,375),
  ('cheesecake_jars_and_slices','Blueberry','Classic cheesecake topped with blueberry compote.','Cream Cheese|Blueberry Compote|Biscuit Base',null,360,340),
  ('cheesecake_jars_and_slices','Nutella','Decadent Nutella-infused cheesecake with a chocolate base.','Cream Cheese|Nutella|Chocolate Biscuit Base',null,400,350),
  ('cheesecake_jars_and_slices','Strawberry','Smooth cheesecake finished with fresh strawberry topping.','Cream Cheese|Strawberry Compote|Biscuit Base',null,360,360),
  ('cheesecake_jars_and_slices','Tiramisu','Italian-style dessert with coffee-soaked layers and mascarpone.','Mascarpone|Coffee|Cocoa|Sponge Fingers',null,360,null),
  ('cheesecake_jars_and_slices','New York','Dense, classic New York-style baked cheesecake.','Cream Cheese|Cream|Eggless Base|Vanilla',null,null,300),

  ('tres_leches','Milk','Soft sponge soaked in three-milk blend for a rich, moist bite.','Milk|Condensed Milk|Cream|Sponge Cake',400,null,null),
  ('tres_leches','Biscoff','Tres leches topped with smooth Biscoff cream.','Milk Blend|Biscoff Spread|Vanilla Sponge',450,null,null),
  ('tres_leches','Strawberry','Classic tres leches with strawberry cream topping.','Milk Blend|Strawberry Cream|Sponge Cake',450,null,null),
  ('tres_leches','Chocolate','Chocolate sponge soaked in rich milk blend.','Chocolate Sponge|Milk Blend|Cocoa Cream',400,null,null),

  ('light_bites','Fries','Crispy golden potato fries.','Potato|Salt|Oil',140,null,null),
  ('light_bites','Peri Peri Fries','Fries tossed in spicy peri peri seasoning.','Potato|Peri Peri Spice|Oil',180,null,null),
  ('light_bites','Garlic Potato Bites','Crispy potato bites tossed in garlic butter.','Potato|Garlic|Butter|Herbs',180,null,null),

  ('burgers_and_sandwiches','Tandoori Aloo Tikki Burger','Spiced aloo tikki with tandoori flavors.','Aloo Patty|Tandoori Masala|Burger Bun|Sauce',140,null,null),
  ('burgers_and_sandwiches','Spicy Paneer Burger','Grilled paneer patty with spicy house sauce.','Paneer|Burger Bun|Spicy Sauce|Veggies',250,null,null),
  ('burgers_and_sandwiches','Pesto Falafel Burger','Crispy falafel layered with basil pesto.','Falafel|Pesto Sauce|Burger Bun|Lettuce',250,null,null),

  ('pizza_neapolitan_base_11_inch','Classic Margherita Pizza','Traditional Neapolitan pizza with rich cheese and tangy sauce.','Neapolitan Dough|Mozzarella|Tomato Sauce',460,null,null),
  ('pizza_neapolitan_base_11_inch','Tandoori Paneer Pizza','Smoky paneer tossed in tandoori sauce on a thin crust.','Paneer|Tandoori Sauce|Onion|Capsicum',550,null,null),

  ('hot_coffee','Espresso','Strong and bold single-shot espresso.','',898,null,null),
  ('hot_coffee','Cappuccino','Balanced espresso with steamed milk and foam.','Espresso|Steamed Milk|Milk Foam',180,null,null),

  ('iced_coffee','Vietnamese Iced Coffee','Strong brewed coffee with condensed milk over ice.','Coffee|Condensed Milk|Ice',230,null,null),
  ('iced_coffee','Espresso Tonic','Refreshing espresso poured over chilled tonic water.','Espresso|Tonic Water|Ice',249,null,null)
) i(section_key, name, description, ingredients, price, jar_price, slice_price)
on s.key = i.section_key;

select
  mi.name,
  mi.section_id,
  ms.key as section_key,
  mc.key as category_key
from menu_items mi
join menu_sections ms on ms.id = mi.section_id
join menu_categories mc on mc.id = ms.category_id;

create policy "public read menu"
on menu_items for select
using (true);
