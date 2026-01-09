'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isHeaderActive, setIsHeaderActive] = useState(false);
  const [lastScrollPos, setLastScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      if (currentScrollPos >= 50) {
        setIsHeaderActive(true);
      } else {
        setIsHeaderActive(false);
      }

      if (currentScrollPos < lastScrollPos) {
        // Scrolling up
      } else {
        // Scrolling down
      }
      
      setLastScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollPos]);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    document.body.classList.toggle('nav-active');
  };

  const closeNav = () => {
    setIsNavOpen(false);
    document.body.classList.remove('nav-active');
  };

  return (
    <header className={`header ${isHeaderActive ? 'active' : ''}`} data-header>
      <div className="container">
        <Link href="/" className="logo">
          <Image src="/assets/images/logo.svg" width={160} height={50} alt="Grilli - Home" />
        </Link>

        <nav className={`navbar ${isNavOpen ? 'active' : ''}`} data-navbar>
          <button className="close-btn" aria-label="close menu" onClick={closeNav}>
            <ion-icon name="close-outline" aria-hidden="true"></ion-icon>
          </button>

          <Link href="/" className="logo" onClick={closeNav}>
            <Image src="/assets/images/logo.svg" width={160} height={50} alt="Grilli - Home" />
          </Link>

          <ul className="navbar-list">
            <li className="navbar-item">
              <Link href="/#home" className="navbar-link hover-underline active" onClick={closeNav}>
                <div className="separator"></div>
                <span className="span">Home</span>
              </Link>
            </li>

            <li className="navbar-item">
              <Link href="/menu" className="navbar-link hover-underline" onClick={closeNav}>
                <div className="separator"></div>
                <span className="span">Menus</span>
              </Link>
            </li>

            <li className="navbar-item">
              <Link href="/#about" className="navbar-link hover-underline" onClick={closeNav}>
                <div className="separator"></div>
                <span className="span">About Us</span>
              </Link>
            </li>

            <li className="navbar-item">
              <Link href="/#chefs" className="navbar-link hover-underline" onClick={closeNav}>
                <div className="separator"></div>
                <span className="span">Our Chefs</span>
              </Link>
            </li>

            <li className="navbar-item">
              <Link href="/#contact" className="navbar-link hover-underline" onClick={closeNav}>
                <div className="separator"></div>
                <span className="span">Contact</span>
              </Link>
            </li>
          </ul>

          <div className="text-center">
            <p className="headline-1 navbar-title">Visit Us</p>
            <address className="body-4">
              Restaurant St, Delicious City, <br />
              London 9578, UK
            </address>
            <p className="body-4 navbar-text">Open: 9.30 am - 2.30pm</p>
            <a href="mailto:booking@grilli.com" className="body-4 sidebar-link">booking@grilli.com</a>
            <div className="separator"></div>
            <p className="contact-label">Booking Request</p>
            <a href="tel:+88123123456" className="body-1 contact-number hover-underline">
              +88-123-123456
            </a>
          </div>
        </nav>

        <Link href="/book-table" className="btn btn-secondary">
          <span className="text text-1">Find A Table</span>
          <span className="text text-2" aria-hidden="true">Find A Table</span>
        </Link>

        <button className="nav-open-btn" aria-label="open menu" onClick={toggleNav}>
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
        </button>

        <div className={`overlay ${isNavOpen ? 'active' : ''}`} onClick={closeNav} data-overlay></div>
      </div>
    </header>
  );
}

