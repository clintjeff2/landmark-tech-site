"use client";

import Link from "next/link";
import { CheckCircle, Clock, BookOpen, Award } from "lucide-react";
import { useCurrentClass } from "@/hooks/useCurrentClass";

export default function CourseOverview() {
  const { currentClass, loading, formatPrice } = useCurrentClass();
  const modules = [
    { name: "DevOps Introduction", hours: "4", icon: "🚀", color: "text-cyan" },
    {
      name: "Linux Administration",
      hours: "27",
      icon: "🐧",
      color: "text-teal",
    },
    { name: "Shell Scripting", hours: "12", icon: "�", color: "text-orange" },
    { name: "Git & GitHub", hours: "12", icon: "🔀", color: "text-purple" },
    { name: "Maven Build Tool", hours: "4", icon: "🔨", color: "text-pink" },
    {
      name: "Tomcat Application Server",
      hours: "6",
      icon: "🐱",
      color: "text-cyan",
    },
    { name: "Apache HTTP Server", hours: "4", icon: "🪶", color: "text-teal" },
    {
      name: "SonarQube Code Quality",
      hours: "4",
      icon: "📊",
      color: "text-orange",
    },
    {
      name: "Nexus Repository Manager",
      hours: "4",
      icon: "�",
      color: "text-purple",
    },
    { name: "Jenkins CI/CD", hours: "24", icon: "🚀", color: "text-pink" },
    {
      name: "Docker Containerization",
      hours: "18",
      icon: "🐳",
      color: "text-cyan",
    },
    {
      name: "Kubernetes Orchestration",
      hours: "27",
      icon: "☸️",
      color: "text-teal",
    },
    {
      name: "Ansible Automation",
      hours: "16",
      icon: "⚙️",
      color: "text-orange",
    },
    {
      name: "AWS Cloud Computing",
      hours: "32",
      icon: "☁️",
      color: "text-purple",
    },
    { name: "Terraform IaC", hours: "12", icon: "🏗️", color: "text-pink" },
  ];

  const benefits = [
    "Hands-on training from basic to expert level",
    "Soft copy materials and interview questions",
    "Real-time use case scenarios",
    "Resume preparation and job assistance",
    "6 comprehensive real-world projects",
    "24/7 support and mentorship",
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple/5 via-background to-teal/5" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] blob gradient-purple-pink opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Course Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                DevOps E. Degree{" "}
                <span className="gradient-text-purple">Curriculum</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Comprehensive training covering all essential DevOps tools and
                practices. From Linux fundamentals to advanced Kubernetes
                orchestration.{" "}
                <span className="font-semibold text-cyan-500">
                  Shaped by our consulting work with 50+ enterprise
                  clients—learn real-world techniques proven in production
                  environments.
                </span>
              </p>
            </div>

            <div className="space-y-3">
              {modules.map((module, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-4 rounded-xl glass border border-border hover:border-purple/30 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {module.icon}
                    </span>
                    <span
                      className={`font-semibold ${module.color} group-hover:text-foreground transition-colors`}
                    >
                      {module.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Clock size={16} className={module.color} />
                    <span className="text-sm font-medium">
                      {module.hours}hrs
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center space-x-2">
                <BookOpen size={20} className="text-purple" />
                <span className="font-semibold gradient-text-purple">
                  206 Hours Total
                </span>
              </div>
              <div className="h-6 w-px bg-gradient-to-b from-purple via-teal to-orange" />
              <div className="flex items-center space-x-2">
                <Award size={20} className="text-teal" />
                <span className="font-semibold gradient-text-teal">
                  Certificate Included
                </span>
              </div>
            </div>
          </div>

          {/* Right: Benefits & Pricing */}
          <div className="space-y-8">
            <div className="relative p-8 rounded-2xl glass border-2 border-purple/30 shadow-2xl">
              {/* Gradient glow effect */}
              <div className="absolute -inset-0.5 gradient-purple-pink opacity-20 blur-xl rounded-2xl" />

              <div className="relative space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold gradient-text-purple">
                    What You Get
                  </h3>
                  <p className="text-muted-foreground">
                    Everything you need to become a DevOps engineer
                  </p>
                </div>

                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle
                        size={20}
                        className="text-teal flex-shrink-0 mt-0.5"
                      />
                      <span className="text-foreground leading-relaxed">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-border space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted-foreground">Program Fee</span>
                    <div className="text-right">
                      <div className="text-5xl font-bold gradient-text-orange-red">
                        {loading ? "$3,000" : formatPrice().replace(" USD", "")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Non-refundable (
                        {loading
                          ? "Class 41"
                          : currentClass?.name || "Class 41"}
                        )
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/register"
                    className="block w-full text-center bg-gradient-orange-red text-white hover:opacity-90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                  >
                    Enroll in{" "}
                    {loading ? "Class 41" : currentClass?.name || "Class 41"}
                  </Link>

                  <Link
                    href="/courses"
                    className="block w-full text-center text-teal hover:text-teal/80 font-medium transition-colors"
                  >
                    Download Full Syllabus →
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative p-6 rounded-xl glass border border-teal/30 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 gradient-teal-cyan opacity-20 blur-2xl" />
              <div className="flex items-start space-x-4 relative z-10">
                <div className="w-12 h-12 rounded-full gradient-teal-cyan flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Award size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">
                    Money-Back Guarantee
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Not satisfied after the first week? Get a full refund, no
                    questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
