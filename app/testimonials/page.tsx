"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Star, Play, Quote } from "lucide-react";
import { useState } from "react";
import { useCurrentClass } from "@/hooks/useCurrentClass";

export default function TestimonialsPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const { loading, formatPrice } = useCurrentClass();

  const videoTestimonials = [
    {
      id: "dQw4w9WgXcQ",
      name: "Sarah Johnson",
      role: "DevOps Engineer at Amazon",
      thumbnail: "/professional-woman-smiling.png",
      company: "Amazon",
    },
    {
      id: "dQw4w9WgXcQ",
      name: "Michael Chen",
      role: "Cloud Engineer at Microsoft",
      thumbnail: "/professional-man-smiling.png",
      company: "Microsoft",
    },
    {
      id: "dQw4w9WgXcQ",
      name: "Priya Patel",
      role: "SRE at Google",
      thumbnail: "/professional-woman-smiling.png",
      company: "Google",
    },
    {
      id: "dQw4w9WgXcQ",
      name: "James Williams",
      role: "DevOps Lead at Netflix",
      thumbnail: "/professional-man-smiling.png",
      company: "Netflix",
    },
    {
      id: "dQw4w9WgXcQ",
      name: "Aisha Mohammed",
      role: "Platform Engineer at Uber",
      thumbnail: "/professional-woman-smiling.png",
      company: "Uber",
    },
    {
      id: "dQw4w9WgXcQ",
      name: "David Kim",
      role: "Infrastructure Engineer at Airbnb",
      thumbnail: "/professional-man-smiling.png",
      company: "Airbnb",
    },
  ];

  const writtenTestimonials = [
    {
      name: "Sarah Johnson",
      role: "DevOps Engineer at Amazon",
      image: "/professional-woman-smiling.png",
      content:
        "Landmark Technologies transformed my career completely. I went from having zero DevOps knowledge to landing a role at Amazon in just 8 months. The hands-on projects and real-world scenarios prepared me perfectly for the interview process. The instructors are incredibly knowledgeable and always available to help.",
      rating: 5,
      salary: "$135,000/year",
    },
    {
      name: "Michael Chen",
      role: "Cloud Engineer at Microsoft",
      image: "/professional-man-smiling.png",
      content:
        "Best investment I've made in my career. The curriculum is comprehensive and constantly updated with the latest industry practices. I particularly loved the Kubernetes and AWS modules. The job assistance program helped me negotiate a 40% salary increase from my previous role.",
      rating: 5,
      salary: "$142,000/year",
    },
    {
      name: "Priya Patel",
      role: "Site Reliability Engineer at Google",
      image: "/professional-woman-smiling.png",
      content:
        "The quality of instruction at Landmark is unmatched. Every concept is explained clearly with practical examples. The resume preparation and mock interviews were invaluable. I received multiple offers and chose Google. I'm now earning 3x my previous salary!",
      rating: 5,
      salary: "$165,000/year",
    },
    {
      name: "James Williams",
      role: "DevOps Lead at Netflix",
      image: "/professional-man-smiling.png",
      content:
        "I was skeptical about online training, but Landmark exceeded all expectations. The live sessions, hands-on labs, and real-world projects gave me the confidence to apply for senior roles. The community support is amazing - I'm still in touch with my cohort.",
      rating: 5,
      salary: "$158,000/year",
    },
    {
      name: "Aisha Mohammed",
      role: "Platform Engineer at Uber",
      image: "/professional-woman-smiling.png",
      content:
        "Coming from a non-technical background, I was nervous about learning DevOps. The instructors at Landmark made everything accessible and easy to understand. The step-by-step approach and continuous support helped me build strong foundations. Now I'm thriving at Uber!",
      rating: 5,
      salary: "$128,000/year",
    },
    {
      name: "David Kim",
      role: "Infrastructure Engineer at Airbnb",
      image: "/professional-man-smiling.png",
      content:
        "The 6 real-world projects were game-changers. I could showcase actual CI/CD pipelines and Kubernetes deployments in my interviews. Employers were impressed with my hands-on experience. Landmark doesn't just teach theory - they prepare you for real production environments.",
      rating: 5,
      salary: "$145,000/year",
    },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full gradient-signature opacity-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
            Student <span className="gradient-text">Success Stories</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Hear from our graduates who transformed their careers and landed
            roles at top tech companies
          </p>

          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">5,000+</div>
              <div className="text-muted-foreground">Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">95%</div>
              <div className="text-muted-foreground">Job Placement</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold gradient-text">$120K+</div>
              <div className="text-muted-foreground">Avg. Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Video <span className="gradient-text">Testimonials</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Watch our students share their success stories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTestimonials.map((video, index) => (
              <div
                key={index}
                className="group cursor-pointer"
                onClick={() => setSelectedVideo(video.id)}
              >
                <div className="relative rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 bg-background">
                  <div className="aspect-video relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play size={28} className="text-white ml-1" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground">{video.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {video.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Written Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from real graduates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {writtenTestimonials.map((testimonial, index) => (
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
                <div className="pt-4 border-t border-border space-y-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {testimonial.salary}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Ready to Write Your{" "}
            <span className="gradient-text">Success Story?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who transformed their careers with
            Landmark Technologies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="/register"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-5 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Enroll Now - {loading ? "$3,000" : formatPrice()}
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-5 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
