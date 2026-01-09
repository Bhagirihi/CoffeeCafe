'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TopBar from '../../components/TopBar';
import Preloader from '../../components/Preloader';
import MenuItem from '../../components/MenuItem';
import { useMenu } from '../../hooks/useMenu';
import { formatPriceRange } from '../../lib/menu-data';

export default function MenuPage() {
  const { menuData, loading } = useMenu();

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <Preloader />
      <TopBar />
      <Header />

      <main>
        <article>
          <section
            className="section menu"
            aria-label="menu-label"
            id="menu"
            style={{ paddingTop: '160px' }}
          >
            <div className="container">
              <p className="section-subtitle text-center label-2">Special Selection</p>

              <div id="menu-container">
                {menuData.sections?.map((section) => (
                  <div key={section.id} className="menu-section" style={{ marginBottom: '80px' }}>
                    <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
                      <h3 className="headline-2 section-name" style={{ color: 'var(--gold-crayola)' }}>
                        {section.name}
                      </h3>
                    </div>

                    {section.note && (
                      <p className="body-4 text-center" style={{
                        color: 'var(--quick-silver)',
                        marginBottom: '30px',
                        fontStyle: 'italic'
                      }}>
                        Note: {section.note}
                      </p>
                    )}

                    {section.offer && (
                      <div className="text-center" style={{
                        marginBottom: '30px',
                        padding: '15px',
                        background: 'var(--gold-crayola)',
                        color: 'var(--black)',
                        borderRadius: '8px',
                        fontWeight: 'bold'
                      }}>
                        {section.offer}
                      </div>
                    )}

                    {section.categories?.map((category, catIndex) => (
                      <div key={catIndex}>
                        <h4 className="title-3" style={{
                          color: 'var(--white)',
                          marginTop: '40px',
                          marginBottom: '25px',
                          textAlign: 'center',
                          borderBottom: '2px solid var(--gold-crayola)',
                          paddingBottom: '10px'
                        }}>
                          {category.name}
                        </h4>
                        <ul className="grid-list">
                          {category.items?.map((item) => (
                            <MenuItem key={item.id} item={item} />
                          ))}
                        </ul>
                      </div>
                    ))}

                    {section.items && section.items.length > 0 && (
                      <ul className="grid-list">
                        {section.items.map((item) => (
                          <MenuItem key={item.id} item={item} />
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <p className="menu-text text-center" style={{
                color: 'var(--quick-silver)',
                marginTop: '40px',
                marginBottom: '30px'
              }}>
                During winter daily from <span className="span" style={{ color: 'var(--gold-crayola)' }}>7:00 pm</span> to <span className="span" style={{ color: 'var(--gold-crayola)' }}>9:00 pm</span>
              </p>

              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <Link href="/" className="btn btn-primary">
                  <span className="text text-1">Back to Home</span>
                  <span className="text text-2" aria-hidden="true">Back to Home</span>
                </Link>
              </div>

              <Image
                src="/assets/images/shape-5.png"
                width={921}
                height={1036}
                loading="lazy"
                alt="shape"
                className="shape shape-2 move-anim"
                unoptimized
              />
              <Image
                src="/assets/images/shape-6.png"
                width={343}
                height={345}
                loading="lazy"
                alt="shape"
                className="shape shape-3 move-anim"
                unoptimized
              />
            </div>
          </section>
        </article>
      </main>

      <Footer />

      <a href="#top" className="back-top-btn" data-back-top-btn aria-label="back to top">
        <ion-icon name="chevron-up"></ion-icon>
      </a>
    </>
  );
}
