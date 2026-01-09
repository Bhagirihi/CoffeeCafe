"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TopBar from "../components/TopBar";
import Preloader from "../components/Preloader";
import MenuItem from "../components/MenuItem";
import Image from "next/image";
import Link from "next/link";
import { useMenu } from "../hooks/useMenu";
import { getFirstSpecialDish, formatPrice } from "../lib/menu-utils";

export default function Home() {
  const { menuData } = useMenu();
  const [specialDish, setSpecialDish] = useState(null);
  const [menuPreview, setMenuPreview] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const dish = getFirstSpecialDish();
    setSpecialDish(dish);

    // Get menu preview (first 6 items, prioritizing special dishes)
    const allItems = [];
    menuData.sections?.forEach((section) => {
      if (section.categories && section.categories.length > 0) {
        section.categories.forEach((category) => {
          category.items.forEach((item) => {
            allItems.push(item);
          });
        });
      }
    });

    const specialDishes = allItems.filter((item) => item.isSpecialDish);
    const regularItems = allItems.filter((item) => !item.isSpecialDish);
    setMenuPreview([...specialDishes, ...regularItems].slice(0, 6));
  }, [menuData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      image: "/assets/images/hero-slider-1.jpg",
      subtitle: "Tradational & Hygine",
      title: "For the love of\ndelicious food",
      text: "Come with family & feel the joy of mouthwatering food",
    },
    {
      image: "/assets/images/hero-slider-2.jpg",
      subtitle: "delightful experience",
      title: "Flavors Inspired by\nthe Seasons",
      text: "Come with family & feel the joy of mouthwatering food",
    },
    {
      image: "/assets/images/hero-slider-3.jpg",
      subtitle: "amazing & delicious",
      title: "Where every flavor\ntells a story",
      text: "Come with family & feel the joy of mouthwatering food",
    },
  ];

  return (
    <>
      <Preloader />
      <TopBar />
      <Header />

      <main>
        <article>
          {/* Hero Section */}
          <section className="hero text-center" aria-label="home" id="home">
            <ul className="hero-slider" data-hero-slider>
              {heroSlides.map((slide, index) => (
                <li
                  key={index}
                  className={`slider-item ${
                    index === currentSlide ? "active" : ""
                  }`}
                  data-hero-slider-item
                >
                  <div className="slider-bg">
                    <Image
                      src={slide.image}
                      width={1880}
                      height={950}
                      alt=""
                      className="img-cover"
                      priority={index === 0}
                      unoptimized
                    />
                  </div>
                  <p className="label-2 section-subtitle slider-reveal">
                    {slide.subtitle}
                  </p>
                  <h1 className="display-1 hero-title slider-reveal">
                    {slide.title.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < slide.title.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </h1>
                  <p className="body-2 hero-text slider-reveal">{slide.text}</p>
                  <Link href="/menu" className="btn btn-primary slider-reveal">
                    <span className="text text-1">View Our Menu</span>
                    <span className="text text-2" aria-hidden="true">
                      View Our Menu
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              className="slider-btn prev"
              data-prev-btn
              onClick={() => setCurrentSlide((prev) => (prev - 1 + 3) % 3)}
            >
              <ion-icon name="chevron-back"></ion-icon>
            </button>
            <button
              className="slider-btn next"
              data-next-btn
              onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
            >
              <ion-icon name="chevron-forward"></ion-icon>
            </button>
          </section>

          {/* Special Dish Section */}
          {specialDish && (
            <section className="special-dish" aria-label="special dish">
              <div className="container">
                <div className="special-dish-banner img-holder has-after">
                  <Image
                    src={
                      specialDish.imageData ||
                      specialDish.image ||
                      "/assets/images/special-dish-banner.jpg"
                    }
                    width={940}
                    height={900}
                    alt="special dish"
                    className="img-cover"
                    unoptimized
                  />
                  <div className="abs-content" data-aos="fade-in">
                    <p className="body-1 label-2">₹{specialDish.price}</p>
                  </div>
                </div>
                <div className="special-dish-content bg-black-10">
                  <p className="section-subtitle label-2 text-center">
                    Special Dish
                  </p>
                  <h2
                    className="headline-1 section-title"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {specialDish.name}
                  </h2>
                  <p className="section-text">
                    {specialDish.description ||
                      "A delicious special dish crafted with care and premium ingredients."}
                  </p>
                  <div className="wrapper">
                    <span className="span body-1">
                      {formatPrice(specialDish.price)}
                    </span>
                    <Link href="/menu" className="btn btn-primary">
                      <span className="text text-1">View All Menu</span>
                      <span className="text text-2" aria-hidden="true">
                        View All Menu
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Menu Preview Section */}
          <section className="section menu" aria-label="menu" id="menu">
            <div className="container">
              <p className="section-subtitle text-center label-2">
                Special Selection
              </p>
              <h2 className="headline-1 section-title text-center">
                Delicious Menu
              </h2>
              <ul className="grid-list" id="menu-preview-container">
                {menuPreview.map((item, index) => (
                  <MenuItem key={item.id || index} item={item} />
                ))}
              </ul>
              <Link href="/menu" className="btn btn-primary">
                <span className="text text-1">View All Menu</span>
                <span className="text text-2" aria-hidden="true">
                  View All Menu
                </span>
              </Link>
            </div>
          </section>
        </article>
      </main>

      <Footer />

      <a
        href="#top"
        className="back-top-btn"
        data-back-top-btn
        aria-label="back to top"
      >
        <ion-icon name="chevron-up"></ion-icon>
      </a>
    </>
  );
}
