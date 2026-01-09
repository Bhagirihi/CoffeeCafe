"use client";

import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      className="section about text-center"
      aria-labelledby="about-label"
      id="about"
    >
      <div className="container">
        <figure className="about-banner">
          <Image
            src="/assets/images/about-banner.jpg"
            width={570}
            height={570}
            loading="lazy"
            alt="about banner"
            className="w-100"
            data-parallax-item
            data-parallax-speed="1"
            unoptimized
          />

          <div
            className="abs-img abs-img-1 has-before"
            data-parallax-item
            data-parallax-speed="1.75"
          >
            <Image
              src="/assets/images/about-abs-image.jpg"
              width={285}
              height={285}
              loading="lazy"
              alt=""
              className="w-100"
              unoptimized
            />
          </div>

          <div className="abs-img abs-img-2 has-before">
            <Image
              src="/assets/images/badge-2.png"
              width={133}
              height={134}
              loading="lazy"
              alt=""
              unoptimized
            />
          </div>
        </figure>

        <Image
          src="/assets/images/shape-3.png"
          width={197}
          height={194}
          loading="lazy"
          alt=""
          className="shape move-anim"
          unoptimized
        />

        <div className="about-content">
          <p className="label-2 section-subtitle" id="about-label">
            Our Story
          </p>

          <h2 className="headline-1 section-title">
            Every Flavor Tells a Story
          </h2>

          <p className="section-text">
            Lorem Ipsum is simply dummy text of the printingand typesetting
            industry lorem Ipsum has been the industrys standard dummy text ever
            since the when an unknown printer took a galley of type and
            scrambled it to make a type specimen book It has survived not only
            five centuries, but also the leap into.
          </p>

          <Link href="/book-table" className="hero-btn has-after">
            <Image
              src="/assets/images/hero-icon.png"
              width={48}
              height={48}
              alt="booking icon"
              unoptimized
            />
            <span className="label-2 text-center span">Book A Table</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
