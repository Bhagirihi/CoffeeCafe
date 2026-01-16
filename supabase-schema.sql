-- Supabase Database Schema for Le Crumbs App
-- Run this SQL in your Supabase SQL Editor to create the necessary tables

-- Menu Sections Table
CREATE TABLE IF NOT EXISTS menu_sections (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  note TEXT,
  offer TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Categories Table
CREATE TABLE IF NOT EXISTS menu_categories (
  id SERIAL PRIMARY KEY,
  section_id TEXT NOT NULL REFERENCES menu_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  category_id INTEGER REFERENCES menu_categories(id) ON DELETE CASCADE,
  section_id TEXT NOT NULL REFERENCES menu_sections(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price NUMERIC,
  jar_price NUMERIC,
  slice_price NUMERIC,
  description TEXT,
  ingredients JSONB,
  image TEXT,
  badge TEXT,
  is_special_dish BOOLEAN DEFAULT FALSE,
  image_data TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  guests INTEGER NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_menu_items_section_id ON menu_items(section_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category_id ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_categories_section_id ON menu_categories(section_id);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);

-- Enable Row Level Security (RLS)
ALTER TABLE menu_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to menu data
CREATE POLICY "Menu sections are viewable by everyone" ON menu_sections
  FOR SELECT USING (true);

CREATE POLICY "Menu categories are viewable by everyone" ON menu_categories
  FOR SELECT USING (true);

CREATE POLICY "Menu items are viewable by everyone" ON menu_items
  FOR SELECT USING (true);

-- Create policies for authenticated users to manage menu (admin access)
-- Note: You'll need to set up authentication and admin role checking
CREATE POLICY "Authenticated users can insert menu sections" ON menu_sections
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update menu sections" ON menu_sections
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete menu sections" ON menu_sections
  FOR DELETE USING (true);

CREATE POLICY "Authenticated users can insert menu categories" ON menu_categories
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update menu categories" ON menu_categories
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete menu categories" ON menu_categories
  FOR DELETE USING (true);

CREATE POLICY "Authenticated users can insert menu items" ON menu_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can update menu items" ON menu_items
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete menu items" ON menu_items
  FOR DELETE USING (true);

-- Create policies for bookings (public insert, admin read/update/delete)
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view bookings" ON bookings
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can update bookings" ON bookings
  FOR UPDATE USING (true);

CREATE POLICY "Authenticated users can delete bookings" ON bookings
  FOR DELETE USING (true);

-- Create policies for subscriptions (public insert, admin read/delete)
CREATE POLICY "Anyone can create subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Authenticated users can view subscriptions" ON subscriptions
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can delete subscriptions" ON subscriptions
  FOR DELETE USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_menu_sections_updated_at BEFORE UPDATE ON menu_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_categories_updated_at BEFORE UPDATE ON menu_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
