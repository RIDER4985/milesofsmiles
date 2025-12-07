import { useEffect } from 'react';

interface StructuredDataProps {
  destination?: {
    name: string;
    description: string;
    image: string;
    rating: number;
    duration: string;
  } | null;
}

export default function StructuredData({ destination }: StructuredDataProps) {
  useEffect(() => {
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Organization/Company structured data
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'TravelAgency',
      name: 'Miles of Smiles Travel',
      description: 'Premium travel agency offering curated destinations, exclusive deals, and personalized service. Experience world-class travel with 50+ destinations worldwide.',
      url: 'https://milesofsmiles.netlify.app/',
      logo: 'https://milesofsmiles.netlify.app/logo.png',
      image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      telephone: '+91-63535-68077',
      email: 'milesofsmiles.tours@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ahmedabad',
        addressLocality: 'Ahmedabad',
        addressRegion: 'Gujarat',
        postalCode: '380001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '23.0225',
        longitude: '72.5714',
      },
      sameAs: [
        'https://www.facebook.com/milesofsmiles',
        'https://www.twitter.com/milesofsmiles',
        'https://www.instagram.com/milesofsmiles',
        'https://www.youtube.com/milesofsmiles',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '2400',
        bestRating: '5',
        worstRating: '1',
      },
      priceRange: '$$',
      areaServed: {
        '@type': 'Country',
        name: 'Worldwide',
      },
    };

    // Website structured data
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Miles of Smiles Travel',
      url: 'https://milesofsmiles.netlify.app/',
      description: 'Premium travel agency offering curated destinations and personalized travel experiences',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://milesofsmiles.netlify.app/?search={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    };

    // Service structured data
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Travel Agency Services',
      provider: {
        '@type': 'TravelAgency',
        name: 'Miles of Smiles Travel',
      },
      areaServed: {
        '@type': 'Country',
        name: 'Worldwide',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Travel Packages',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'TouristTrip',
              name: 'Magical Kerala Tour',
              description: 'Experience the enchanting beauty of Kerala - from serene backwaters to lush tea plantations',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'TouristTrip',
              name: 'Magical Himachal Tour',
              description: 'Discover the majestic beauty of Himachal Pradesh - from snow-capped mountains to spiritual temples',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'TouristTrip',
              name: 'International Destinations',
              description: 'Explore amazing destinations like Santorini, Bali, Paris, Dubai, Maldives, and Tokyo',
            },
          },
        ],
      },
    };

    // Destination-specific structured data (if viewing a destination)
    let destinationSchema = null;
    if (destination) {
      destinationSchema = {
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: destination.name,
        description: destination.description,
        image: destination.image,
        duration: destination.duration,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: destination.rating.toString(),
          bestRating: '5',
          worstRating: '1',
        },
        provider: {
          '@type': 'TravelAgency',
          name: 'Miles of Smiles Travel',
        },
      };
    }

    // Add all schemas to the page
    const schemas = [organizationSchema, websiteSchema, serviceSchema];
    if (destinationSchema) {
      schemas.push(destinationSchema);
    }

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `structured-data-${index}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => script.remove());
    };
  }, [destination]);

  return null;
}

