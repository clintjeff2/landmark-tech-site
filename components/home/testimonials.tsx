"use client";

import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "DevOps Engineer at Amazon",
      image: "/professional-woman-smiling.png",
      content:
        "Landmark Technologies transformed my career. The hands-on approach and real-world projects gave me the confidence to land my dream job at Amazon. The instructors are incredibly knowledgeable and supportive.",
      rating: 5,
      videoId: "dQw4w9WgXcQ", // Placeholder
    },
    {
      name: "Michael Chen",
      role: "Cloud Engineer at Microsoft",
      image: "/professional-man-smiling.png",
      content:
        "Best investment I've made in my career. The curriculum is comprehensive and up-to-date with industry standards. I went from zero DevOps knowledge to deploying production Kubernetes clusters in 6 months.",
      rating: 5,
      videoId: "dQw4w9WgXcQ", // Placeholder
    },
    {
      name: "Priya Patel",
      role: "Site Reliability Engineer at Google",
      image: "/professional-woman-smiling.png",
      content:
        "The job assistance program is phenomenal. They helped me prepare my resume, practice interviews, and negotiate my offer. I'm now earning 3x my previous salary. Thank you Landmark!",
      rating: 5,
      videoId: "dQw4w9WgXcQ", // Placeholder
    },
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container-responsive">
        <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Join thousands of students who transformed their careers with
            Landmark Technologies. Many are now employed at top companies, while
            others launched successful consulting practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg space-y-6"
            >
              {/* Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative">
                <Quote
                  size={32}
                  className="text-primary/20 absolute -top-2 -left-2"
                />
                <p className="text-muted-foreground leading-relaxed relative z-10 pl-6">
                  {testimonial.content}
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4 pt-4 border-t border-border">
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials Section */}
        <div className="mt-16 text-center">
          <a
            href="/success"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            <span>Watch Video Testimonials</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
