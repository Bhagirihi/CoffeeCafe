"use client";

import { useState, useEffect } from "react";
import {
  getMenuData,
  saveMenuData,
  initializeMenuData,
} from "../lib/menu-utils";

export function useMenu() {
  const [menuData, setMenuData] = useState({ sections: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMenuData() {
      try {
        setLoading(true);
        await initializeMenuData();
        const data = await getMenuData();
        setMenuData(data);
        setError(null);
      } catch (err) {
        console.error("Error loading menu data:", err);
        setError(err.message);
        // Fallback to empty sections on error
        setMenuData({ sections: [] });
      } finally {
        setLoading(false);
      }
    }

    loadMenuData();
  }, []);

  const updateMenuData = async (newData) => {
    console.log("Updating menu data in hook:", newData);
    try {
      setMenuData(newData);
      await saveMenuData(newData);
      setError(null);
    } catch (err) {
      console.error("Error saving menu data:", err);
      setError(err.message);
      throw err;
    }
  };

  return { menuData, updateMenuData, loading, error };
}
