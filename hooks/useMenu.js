'use client';

import { useState, useEffect } from 'react';
import { getMenuData, saveMenuData, initializeMenuData } from '../lib/menu-utils';

export function useMenu() {
  const [menuData, setMenuData] = useState({ sections: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeMenuData();
    const data = getMenuData();
    setMenuData(data);
    setLoading(false);
  }, []);

  const updateMenuData = (newData) => {
    setMenuData(newData);
    saveMenuData(newData);
  };

  return { menuData, updateMenuData, loading };
}

