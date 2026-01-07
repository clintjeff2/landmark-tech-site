"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  Briefcase,
  Code,
  Cloud,
  Container,
  GitBranch,
  Shield,
  CheckCircle,
  ArrowRight,
  Terminal,
  Server,
  Settings,
  Database,
  Layers,
  Package,
  FileCode,
  Activity,
  Lock,
  Gauge,
  Workflow,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: GraduationCap,
      title: "DevOps Training Programs",
      description:
        "Comprehensive hands-on training from basic to expert level covering all major DevOps tools and practices.",
      features: [
        "206 hours of live instruction",
        "Real-world projects and labs",
        "Industry-recognized certification",
        "Lifetime access to materials",
      ],
      cta: "View Curriculum",
      link: "/courses",
    },
    {
      icon: Users,
      title: "Corporate Training",
      description:
        "Customized DevOps training programs for organizations looking to upskill their engineering teams.",
      features: [
        "Tailored curriculum for your stack",
        "On-site or remote delivery",
        "Team assessments and reporting",
        "Ongoing support and mentorship",
      ],
      cta: "Contact Sales",
      link: "/contact",
    },
    {
      icon: Briefcase,
      title: "Career Services",
      description:
        "Comprehensive job assistance to help you land your dream DevOps role with competitive compensation.",
      features: [
        "Resume and LinkedIn optimization",
        "Mock interviews and feedback",
        "Salary negotiation coaching",
        "Job referrals and networking",
      ],
      cta: "Learn More",
      link: "/about",
    },
    {
      icon: Code,
      title: "Enterprise DevOps Consulting",
      description:
        "Strategic DevOps consulting and infrastructure transformation for enterprise organizations. We partner with Fortune 500 companies to design, implement, and optimize production-grade DevOps systems.",
      features: [
        "CI/CD pipeline design & implementation",
        "Kubernetes & container orchestration strategy",
        "Cloud migration & infrastructure automation",
        "DevSecOps & compliance frameworks",
        "Performance optimization & cost reduction",
        "24/7 consulting support & SLAs",
      ],
      cta: "Request Consultation",
      link: "/contact",
    },
  ];

  const technologies = [
    { icon: Terminal, name: "Linux Administration", color: "text-yellow-500" },
    { icon: FileCode, name: "Shell Scripting", color: "text-green-500" },
    { icon: GitBranch, name: "Git & GitHub", color: "text-orange-500" },
    { icon: Package, name: "Maven Build Tool", color: "text-red-500" },
    { icon: Server, name: "Tomcat Server", color: "text-purple-500" },
    { icon: Server, name: "Apache HTTP Server", color: "text-blue-500" },
    { icon: Gauge, name: "SonarQube", color: "text-cyan-500" },
    { icon: Database, name: "Nexus Repository", color: "text-indigo-500" },
    { icon: Workflow, name: "Jenkins CI/CD", color: "text-red-500" },
    { icon: Container, name: "Docker", color: "text-blue-500" },
    { icon: Container, name: "Kubernetes", color: "text-blue-600" },
    { icon: Settings, name: "Ansible", color: "text-red-600" },
    { icon: Cloud, name: "AWS Cloud", color: "text-orange-600" },
    { icon: Cloud, name: "EC2 & AMI", color: "text-purple-600" },
    { icon: Shield, name: "Security Groups", color: "text-green-600" },
    { icon: Database, name: "EBS & EFS", color: "text-yellow-600" },
    { icon: Database, name: "S3 Storage", color: "text-orange-400" },
    { icon: Lock, name: "IAM", color: "text-red-400" },
    { icon: Layers, name: "VPC Networking", color: "text-blue-400" },
    { icon: Activity, name: "Load Balancers", color: "text-green-400" },
    { icon: Gauge, name: "Auto Scaling", color: "text-purple-400" },
    { icon: Activity, name: "CloudWatch", color: "text-cyan-400" },
    { icon: Code, name: "Terraform IaC", color: "text-purple-500" },
    { icon: Shield, name: "DevSecOps", color: "text-indigo-500" },
  ];

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full gradient-signature opacity-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              World-class DevOps training + active enterprise consulting. We
              train professionals AND transform enterprise infrastructure.
              Whether you're launching a career or solving enterprise
              challenges, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg space-y-6"
              >
                <div className="w-14 h-14 rounded-lg gradient-signature flex items-center justify-center">
                  <service.icon size={28} className="text-white" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle
                        size={18}
                        className="text-primary flex-shrink-0 mt-0.5"
                      />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.link}
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-semibold transition-colors group"
                >
                  <span>{service.cta}</span>
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-card border-y border-border overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Technologies <span className="gradient-text">We Teach</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the most in-demand DevOps tools and platforms
            </p>
          </div>

          {/* Animated scrolling container */}
          <div className="relative">
            <div className="flex animate-scroll-left space-x-6 pb-4">
              {[...technologies, ...technologies].map((tech, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-48 p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 text-center space-y-3 hover:scale-105"
                >
                  <tech.icon size={32} className={`mx-auto ${tech.color}`} />
                  <div className="text-sm font-semibold text-foreground whitespace-nowrap">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Static grid for smaller screens */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mt-12">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 text-center space-y-3 hover:scale-105"
              >
                <tech.icon size={32} className={`mx-auto ${tech.color}`} />
                <div className="text-sm font-semibold text-foreground">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add keyframes for animation in global CSS */}
        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }
          .animate-scroll-left:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border-2 border-primary/20 rounded-3xl p-12 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to Get <span className="gradient-text">Started?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you're launching your DevOps career or transforming your
              enterprise infrastructure, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Enroll in Training
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Consulting Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
