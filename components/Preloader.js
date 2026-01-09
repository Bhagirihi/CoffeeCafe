"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setLoaded(true);
      document.body.classList.add("loaded");
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (loaded) return null;

  return (
    <div className="preload" data-preaload>
      <div className="circle"></div>
      <p className="text">Le Crumbs</p>
    </div>
  );
}
