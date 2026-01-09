"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TopBar from "../../components/TopBar";
import Preloader from "../../components/Preloader";
import Image from "next/image";

export default function BookTablePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    // Set minimum date to today
    const todayDate = new Date().toISOString().split("T")[0];
    setToday(todayDate);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing bookings
    const existingBookings = JSON.parse(
      localStorage.getItem("bookings") || "[]"
    );

    // Add new booking
    const newBooking = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      guests: formData.guests,
      date: formData.date,
      time: formData.time,
      message: formData.message,
      timestamp: new Date().toISOString(),
    };

    existingBookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));

    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      message: "",
    });

    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <>
      <Preloader />
      <TopBar />
      <Header />

      <main>
        <article>
          {/* Booking Hero Section */}
          <section
            className="hero text-center"
            aria-label="booking"
            id="booking"
            style={{
              paddingTop: "120px",
              minHeight: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="container">
              <p className="label-2 section-subtitle">Reserve Your Table</p>

              <h1 className="display-1 hero-title">
                Book A Table <br />
                At Le Crumbs
              </h1>

              <p className="body-2 hero-text">
                Experience fine dining with us. Reserve your table now and enjoy
                an unforgettable culinary journey.
              </p>
            </div>
          </section>

          {/* Reservation Section */}
          <section className="reservation booking-reservation">
            <div className="container">
              <div className="form reservation-form bg-black-10">
                <form
                  action=""
                  className="form-left"
                  id="booking-form"
                  onSubmit={handleSubmit}
                >
                  <h2 className="headline-1 text-center">Online Reservation</h2>

                  <p className="form-text text-center">
                    Booking request{" "}
                    <a href="tel:+88123123456" className="link">
                      +88-123-123456
                    </a>
                    or fill out the order form
                  </p>

                  {submitted && (
                    <div
                      style={{
                        padding: "15px",
                        background: "var(--gold-crayola)",
                        color: "var(--black)",
                        borderRadius: "8px",
                        marginBottom: "20px",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Thank you! Your reservation has been submitted. We will
                      contact you shortly.
                    </div>
                  )}

                  <div className="input-wrapper">
                    <input
                      type="text"
                      name="name"
                      id="booking-name"
                      placeholder="Your Name"
                      autocomplete="off"
                      className="input-field"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                    <input
                      type="tel"
                      name="phone"
                      id="booking-phone"
                      placeholder="Phone Number"
                      autocomplete="off"
                      className="input-field"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-wrapper">
                    <input
                      type="email"
                      name="email"
                      id="booking-email"
                      placeholder="Email Address"
                      autocomplete="off"
                      className="input-field"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="input-wrapper">
                    <div className="icon-wrapper">
                      <ion-icon
                        name="person-outline"
                        aria-hidden="true"
                      ></ion-icon>

                      <select
                        name="guests"
                        id="booking-person"
                        className="input-field"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                      >
                        <option value="">Select Guests</option>
                        <option value="1-person">1 Person</option>
                        <option value="2-person">2 Person</option>
                        <option value="3-person">3 Person</option>
                        <option value="4-person">4 Person</option>
                        <option value="5-person">5 Person</option>
                        <option value="6-person">6 Person</option>
                        <option value="7-person">7 Person</option>
                        <option value="8-person">8+ Person</option>
                      </select>

                      <ion-icon
                        name="chevron-down"
                        aria-hidden="true"
                      ></ion-icon>
                    </div>

                    <div className="icon-wrapper">
                      <ion-icon
                        name="calendar-clear-outline"
                        aria-hidden="true"
                      ></ion-icon>

                      <input
                        type="date"
                        name="date"
                        id="booking-date"
                        className="input-field"
                        required
                        min={today}
                        value={formData.date}
                        onChange={handleChange}
                      />

                      <ion-icon
                        name="chevron-down"
                        aria-hidden="true"
                      ></ion-icon>
                    </div>

                    <div className="icon-wrapper">
                      <ion-icon
                        name="time-outline"
                        aria-hidden="true"
                      ></ion-icon>

                      <select
                        name="time"
                        id="booking-time"
                        className="input-field"
                        required
                        value={formData.time}
                        onChange={handleChange}
                      >
                        <option value="">Select Time</option>
                        <option value="08:00am">08 : 00 am</option>
                        <option value="09:00am">09 : 00 am</option>
                        <option value="10:00am">10 : 00 am</option>
                        <option value="11:00am">11 : 00 am</option>
                        <option value="12:00pm">12 : 00 pm</option>
                        <option value="01:00pm">01 : 00 pm</option>
                        <option value="02:00pm">02 : 00 pm</option>
                        <option value="03:00pm">03 : 00 pm</option>
                        <option value="04:00pm">04 : 00 pm</option>
                        <option value="05:00pm">05 : 00 pm</option>
                        <option value="06:00pm">06 : 00 pm</option>
                        <option value="07:00pm">07 : 00 pm</option>
                        <option value="08:00pm">08 : 00 pm</option>
                        <option value="09:00pm">09 : 00 pm</option>
                        <option value="10:00pm">10 : 00 pm</option>
                      </select>

                      <ion-icon
                        name="chevron-down"
                        aria-hidden="true"
                      ></ion-icon>
                    </div>
                  </div>

                  <textarea
                    name="message"
                    id="booking-message-text"
                    placeholder="Special Requests or Message (Optional)"
                    autocomplete="off"
                    className="input-field"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>

                  <button type="submit" className="btn btn-secondary">
                    <span className="text text-1">Book A Table</span>
                    <span className="text text-2" aria-hidden="true">
                      Book A Table
                    </span>
                  </button>

                  <div
                    id="booking-status-message"
                    style={{
                      marginTop: "20px",
                      textAlign: "center",
                      display: "none",
                    }}
                  ></div>
                </form>

                <div
                  className="form-right text-center"
                  style={{
                    backgroundImage: "url('/assets/images/form-pattern.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <h2 className="headline-1 text-center">Contact Us</h2>

                  <p className="contact-label">Booking Request</p>

                  <a
                    href="tel:+88123123456"
                    className="body-1 contact-number hover-underline"
                  >
                    +88-123-123456
                  </a>

                  <div className="separator"></div>

                  <p className="contact-label">Location</p>

                  <address className="body-4">
                    Restaurant St, Delicious City, <br />
                    London 9578, UK
                  </address>

                  <p className="contact-label">Lunch Time</p>

                  <p className="body-4">
                    Monday to Sunday <br />
                    11.00 am - 2.30pm
                  </p>

                  <p className="contact-label">Dinner Time</p>

                  <p className="body-4">
                    Monday to Sunday <br />
                    05.00 pm - 10.00pm
                  </p>

                  <div className="separator"></div>

                  <p className="contact-label">Email</p>

                  <a
                    href="mailto:booking@lecrumb.com"
                    className="body-4 contact-link"
                  >
                    booking@lecrumb.com
                  </a>
                </div>
              </div>
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
