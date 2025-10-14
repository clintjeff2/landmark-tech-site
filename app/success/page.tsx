"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Star, Play, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function SuccessPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const videoTestimonials = [
    {
      id: "Y_vLn0H8igg",
      title:
        "Mrs./Mr. Alex and Amaka are among 400+ DevOps Engineers making up to $700,000/yr",
      description:
        "Discover how Alex and Amaka transformed their careers and joined 400+ successful DevOps engineers",
    },
    {
      id: "HXOLh1jsG8w",
      title:
        "Yan, with 50 Landmark graduates, gets multiple DevOps job offers b4 graduation",
      description:
        "Learn how Yan and 50+ graduates received multiple job offers even before completing the program",
    },
    {
      id: "Ryb0LM0hkmI",
      title:
        "Paul now making $380,000/yr after 6 months DevOps training at Landmark Technologies",
      description:
        "Paul's incredible journey from beginner to earning $380K annually in just 6 months",
    },
    {
      id: "U72V7HZWvaA",
      title:
        "Ola joins Landmark DevOps Engineer Graduates now making up to $700,000/yr in 2023",
      description:
        "Ola shares his success story joining the elite group of Landmark graduates earning top salaries",
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
    {
      name: "Emily Rodriguez",
      role: "Cloud Architect at IBM",
      image: "/professional-woman-smiling.png",
      content:
        "The program structure is excellent - from Linux basics to advanced Kubernetes. I appreciated the real-world focus and practical assignments. The career support team helped me polish my resume and prepare for technical interviews. Now I'm leading cloud initiatives at IBM!",
      rating: 5,
      salary: "$155,000/year",
    },
    {
      name: "Robert Taylor",
      role: "DevOps Engineer at Spotify",
      image: "/professional-man-smiling.png",
      content:
        "I had some IT experience but no DevOps knowledge. Landmark's comprehensive curriculum covered everything I needed. The Jenkins, Docker, and Kubernetes modules were particularly strong. The instructors are patient and create a supportive learning environment.",
      rating: 5,
      salary: "$138,000/year",
    },
    {
      name: "Linda Nguyen",
      role: "SRE at Twitter",
      image: "/professional-woman-smiling.png",
      content:
        "What sets Landmark apart is the hands-on approach. Every tool we learned was applied in real projects. The AWS module prepared me perfectly for cloud engineering roles. I'm now working on high-scale distributed systems at Twitter!",
      rating: 5,
      salary: "$152,000/year",
    },
    {
      name: "Carlos Martinez",
      role: "Platform Engineer at Adobe",
      image: "/professional-man-smiling.png",
      content:
        "The investment paid off within 3 months of graduating. The skills I learned are directly applicable to my daily work. The Terraform and Ansible modules have been especially valuable. I recommend Landmark to anyone serious about DevOps.",
      rating: 5,
      salary: "$148,000/year",
    },
    {
      name: "Jennifer Lee",
      role: "DevOps Lead at Salesforce",
      image: "/professional-woman-smiling.png",
      content:
        "From factory worker to DevOps Lead - this program changed my life. The instructors believed in me even when I doubted myself. The bootcamp sessions on resume building and interviewing were crucial to my success. Forever grateful to Landmark!",
      rating: 5,
      salary: "$168,000/year",
    },
    {
      name: "Ahmed Hassan",
      role: "Cloud Engineer at Oracle",
      image: "/professional-man-smiling.png",
      content:
        "The course exceeded my expectations in every way. The live sessions were engaging, the materials comprehensive, and the support outstanding. I transitioned from accounting to DevOps and couldn't be happier. The community is incredibly supportive.",
      rating: 5,
      salary: "$132,000/year",
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(writtenTestimonials.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTestimonials = writtenTestimonials.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

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
              <div className="text-4xl font-bold gradient-text">$150K</div>
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
              <span className="gradient-text">Testimonies</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Watch real Landmark graduates earning $380K - $700K annually share
              their transformation journeys
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoTestimonials.map((video, index) => (
              <div
                key={index}
                className="group cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                onClick={() => setSelectedVideo(video.id)}
              >
                <div className="relative rounded-2xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-300 bg-background shadow-lg hover:shadow-2xl">
                  {/* Video Thumbnail with YouTube Embed Preview */}
                  <div className="aspect-video relative bg-gradient-to-br from-purple/10 via-background to-teal/10">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to medium quality if max res not available
                        e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/40 transition-all duration-300" />

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse" />
                        <div className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                          <Play
                            size={32}
                            className="text-white ml-1"
                            fill="white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-sm text-white text-xs font-bold flex items-center space-x-1">
                        <Star size={12} fill="white" />
                        <span>Success Story</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-lg text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold text-primary flex items-center space-x-1">
                        <Play size={14} />
                        <span>Watch Full Story</span>
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Click to play
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center space-y-4 p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-teal/5 border border-primary/20">
              <p className="text-lg font-semibold text-foreground">
                Want to be our next success story?
              </p>
              <a
                href="/register"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Enroll in Class 41 - $3,000
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="max-w-6xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-primary transition-colors text-sm font-semibold flex items-center space-x-2"
            >
              <span>Close</span>
              <span className="text-2xl">×</span>
            </button>

            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/30">
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

      {/* Written Testimonials Carousel */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              What Our <span className="gradient-text">Students Say</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from graduates earning $120K+ annually
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentTestimonials.map((testimonial, index) => (
                <div
                  key={startIndex + index}
                  className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 space-y-4 hover:shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-foreground text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="fill-yellow-500 text-yellow-500"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <Quote
                      size={24}
                      className="absolute -top-2 -left-2 text-primary/20"
                    />
                    <p className="text-foreground leading-relaxed pl-4">
                      {testimonial.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        New Salary
                      </span>
                      <span className="font-bold gradient-text">
                        {testimonial.salary}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={prevPage}
                className="p-3 rounded-full bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={24} className="text-foreground" />
              </button>

              <div className="flex items-center space-x-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentPage === index
                        ? "bg-primary w-8"
                        : "bg-border hover:bg-primary/50"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextPage}
                className="p-3 rounded-full bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-110"
                aria-label="Next testimonials"
              >
                <ChevronRight size={24} className="text-foreground" />
              </button>
            </div>

            <div className="text-center mt-6 text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-background border-2 border-primary/20 rounded-3xl p-12 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to Write{" "}
              <span className="gradient-text">Your Success Story?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join Class 41 and start your journey to a high-paying DevOps
              career
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="/register"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-5 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Enroll Now - $3,000
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-5 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
