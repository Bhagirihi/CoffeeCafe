"use client";

import Image from "next/image";
import Link from "next/link";

export default function ServiceSection() {
  const services = [
    {
      id: 1,
      image: "/assets/images/service-1.jpg",
      title: "Specialty Coffee Experience",
      alt: "Breakfast",
    },
    {
      id: 2,
      image: "/assets/images/service-2.jpg",
      title: "Handcrafted Desserts & Cheesecakes",
      alt: "Appetizers",
    },
    {
      id: 3,
      image: "/assets/images/service-3.jpg",
      title: "Artisan Neapolitan-Style Pizzas",
      alt: "Drinks",
    },
  ];

  return (
    <section
      className="section service bg-black-10 text-center"
      aria-label="service"
    >
      <div className="container">
        <p className="section-subtitle label-2">Flavors For Royalty</p>

        <h2 className="headline-1 section-title">We Offer Top Notch</h2>

        <p className="section-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry lorem Ipsum has been the industrys standard dummy text ever.
        </p>

        <ul className="grid-list">
          {services.map((service) => (
            <li key={service.id}>
              <div className="service-card">
                <a href="#" className="has-before hover:shine">
                  <figure
                    className="card-banner img-holder"
                    style={{ "--width": "285", "--height": "336" }}
                  >
                    <Image
                      src={service.image}
                      width={285}
                      height={336}
                      loading="lazy"
                      alt={service.alt}
                      className="img-cover"
                      unoptimized
                    />
                  </figure>
                </a>

                <div className="card-content">
                  <h3 className="title-4 card-title">
                    <a href="#">{service.title}</a>
                  </h3>
                  <Link href="/menu" className="btn-text">
                    <span className="text text-2 section-subtitle">
                      View Menu
                    </span>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <Image
          src="/assets/images/shape-1.png"
          width={246}
          height={412}
          loading="lazy"
          alt="shape"
          className="shape shape-1 move-anim"
          unoptimized
        />
        <Image
          src="/assets/images/shape-2.png"
          width={343}
          height={345}
          loading="lazy"
          alt="shape"
          className="shape shape-2 move-anim"
          unoptimized
        />
      </div>
    </section>
  );
}
