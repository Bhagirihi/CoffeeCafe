'use client';

import Image from 'next/image';

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      icon: '/assets/images/features-icon-1.png',
      title: 'Hygienic Food',
      description: 'Lorem Ipsum is simply dummy printing and typesetting.',
    },
    {
      id: 2,
      icon: '/assets/images/features-icon-2.png',
      title: 'Fresh Environment',
      description: 'Lorem Ipsum is simply dummy printing and typesetting.',
    },
    {
      id: 3,
      icon: '/assets/images/features-icon-3.png',
      title: 'Skilled Chefs',
      description: 'Lorem Ipsum is simply dummy printing and typesetting.',
    },
    {
      id: 4,
      icon: '/assets/images/features-icon-4.png',
      title: 'Event & Party',
      description: 'Lorem Ipsum is simply dummy printing and typesetting.',
    },
  ];

  return (
    <section className="section features text-center" aria-label="features">
      <div className="container">
        <p className="section-subtitle label-2">Why Choose Us</p>

        <h2 className="headline-1 section-title">Our Strength</h2>

        <ul className="grid-list">
          {features.map((feature) => (
            <li key={feature.id} className="feature-item">
              <div className="feature-card">
                <div className="card-icon">
                  <Image
                    src={feature.icon}
                    width={100}
                    height={80}
                    loading="lazy"
                    alt="icon"
                    unoptimized
                  />
                </div>

                <h3 className="title-2 card-title">{feature.title}</h3>

                <p className="label-1 card-text">{feature.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <Image
          src="/assets/images/shape-7.png"
          width={208}
          height={178}
          loading="lazy"
          alt="shape"
          className="shape shape-1 move-anim"
          unoptimized
        />

        <Image
          src="/assets/images/shape-8.png"
          width={120}
          height={115}
          loading="lazy"
          alt="shape"
          className="shape shape-2 move-anim"
          unoptimized
        />
      </div>
    </section>
  );
}
