"use client";

import Script from "next/script";

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Landmark Technologies",
    alternateName: "Landmark Tech",
    url: "https://www.mylandmarktech.com",
    logo: "https://www.mylandmarktech.com/landmark-tech-logo.png",
    description:
      "Transform your career with hands-on DevOps training from basic to expert level. $3,000 comprehensive program with job assistance and real-world projects.",
    foundingDate: "2005",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-437-215-2483",
      contactType: "Admissions",
      email: "mylandmarktech@gmail.com",
      areaServed: "Worldwide",
      availableLanguage: "English",
    },
    sameAs: [
      "https://www.linkedin.com/company/landmarktechnologies",
      "https://www.youtube.com/landmarktechnologies",
      "https://www.facebook.com/landmarktechnologies",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
      addressLocality: "Online & Remote Training",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "DevOps Training Programs",
      itemListElement: [
        {
          "@type": "Course",
          name: "DevOps E. Degree",
          description:
            "Comprehensive DevOps training covering Linux, AWS, Docker, Kubernetes, Jenkins, and more",
          provider: {
            "@type": "EducationalOrganization",
            name: "Landmark Technologies",
          },
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "USD",
          },
          courseCode: "DEVOPS-2025",
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            duration: "PT206H",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "5000",
      bestRating: "5",
    },
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
