"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createSubscription } from "../lib/subscriptions";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) return;

    setStatus("loading");

    try {
      const result = await createSubscription(email);

      if (result.success) {
        setStatus("success");
        setMessage("Subscribed successfully.");
        setEmail("");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 3000);
      } else {
        setStatus("error");
        setMessage(result.message || "This email is already subscribed.");
        setTimeout(() => {
          setStatus("idle");
          setMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      setStatus("error");
      setMessage("An error occurred. Please try again.");
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    }
  };

  return (
    <footer
      className="footer section has-bg-image text-center"
      style={{
        backgroundImage: "url('/assets/images/footer-bg.jpg')",
        paddingTop: "60px",
        paddingBottom: "40px",
      }}
    >
      <div className="container">
        <div className="footer-top grid-list">
          {/* Left Column - Navigation Links */}
          <ul className="footer-list" style={{ textAlign: "left" }}>
            <li>
              <Link href="/" className="label-2 footer-link hover-underline">
                HOME
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                className="label-2 footer-link hover-underline"
              >
                MENUS
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="label-2 footer-link hover-underline"
              >
                ABOUT US
              </Link>
            </li>
            <li>
              <Link
                href="/book-table"
                className="label-2 footer-link hover-underline"
              >
                Book Table
              </Link>
            </li>
            <li>
              <Link
                href="/book-table/#contact"
                className="label-2 footer-link hover-underline"
              >
                CONTACT
              </Link>
            </li>
          </ul>

          {/* Center Column - Brand & Subscription */}
          <div className="footer-brand has-before has-after">
            <Link href="/" className="logo">
              <Image
                src="/assets/images/logo.png"
                width={160}
                height={60}
                loading="lazy"
                alt="le crumb home"
              />
            </Link>

            <address className="body-4">
              Restaurant St, Delicious City, London 9578, UK
            </address>

            <a
              href="mailto:booking@lecrumb.com"
              className="body-4 contact-link"
            >
              booking@lecrumb.com
            </a>

            <a href="tel:+917874766500" className="body-4 contact-link">
              Booking Request : +91-7874766500
            </a>

            <p className="body-4">Open : 09:00 am - 01:00 pm</p>

            <div className="wrapper">
              <div className="separator"></div>
              <div className="separator"></div>
              <div className="separator"></div>
            </div>

            <p className="title-1">Get News & Offers</p>

            <p className="label-1">
              Subscribe us & Get <span className="span">25% Off.</span>
            </p>

            <form action="" className="input-wrapper" onSubmit={handleSubmit}>
              <div className="icon-wrapper">
                <ion-icon name="mail-outline" aria-hidden="true"></ion-icon>

                <input
                  type="email"
                  name="email_address"
                  placeholder="Your email"
                  autocomplete="off"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-secondary">
                <span className="text text-1">Subscribe</span>
                <span className="text text-2" aria-hidden="true">
                  Subscribe
                </span>
              </button>
            </form>

            {status === "success" && (
              <p
                style={{
                  marginTop: "10px",
                  color: "#44ff44",
                  fontSize: "var(--fontSize-label-2)",
                }}
              >
                {message}
              </p>
            )}

            {status === "error" && (
              <p
                style={{
                  marginTop: "10px",
                  color: "#ff4444",
                  fontSize: "var(--fontSize-label-2)",
                }}
              >
                {message}
              </p>
            )}
          </div>

          {/* Right Column - Social Media Links */}
          <ul
            className="footer-list"
            style={{
              textAlign: "center",
              backgroundImage: "url('/assets/images/footer-bg.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <li>
              <a href="#" className="label-2 footer-link hover-underline">
                FACEBOOK
              </a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">
                INSTAGRAM
              </a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">
                TWITTER
              </a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">
                YOUTUBE
              </a>
            </li>
            <li>
              <a href="#" className="label-2 footer-link hover-underline">
                GOOGLE MAP
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; 2026 Le Crumbs. All Rights Reserved | Crafted by{" "}
            <a href="https://dhruvdave.in" target="_blank" className="link">
              DhruvDave
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
