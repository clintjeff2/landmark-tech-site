import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
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
} from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: GraduationCap,
      title: "DevOps Training Programs",
      description:
        "Comprehensive hands-on training from basic to expert level covering all major DevOps tools and practices.",
      features: [
        "185+ hours of live instruction",
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
      description: "Customized DevOps training programs for organizations looking to upskill their engineering teams.",
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
      title: "Consulting Services",
      description:
        "Expert DevOps consulting to help your organization implement best practices and optimize workflows.",
      features: [
        "CI/CD pipeline design",
        "Infrastructure automation",
        "Cloud migration strategy",
        "Security and compliance",
      ],
      cta: "Get Started",
      link: "/contact",
    },
  ]

  const technologies = [
    { icon: Code, name: "Linux & Shell Scripting", color: "text-yellow-500" },
    { icon: GitBranch, name: "Git & GitHub", color: "text-orange-500" },
    { icon: Container, name: "Docker & Kubernetes", color: "text-blue-500" },
    { icon: Cloud, name: "AWS Cloud", color: "text-purple-500" },
    { icon: Shield, name: "Terraform & Ansible", color: "text-green-500" },
    { icon: Code, name: "Jenkins CI/CD", color: "text-red-500" },
  ]

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
              Comprehensive DevOps training and consulting services designed to accelerate your career or transform your
              organization.
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
                  <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </div>

                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={service.link}
                  className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-semibold transition-colors group"
                >
                  <span>{service.cta}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Technologies <span className="gradient-text">We Teach</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the most in-demand DevOps tools and platforms
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 text-center space-y-3"
              >
                <tech.icon size={32} className={`mx-auto ${tech.color}`} />
                <div className="text-sm font-semibold text-foreground">{tech.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border-2 border-primary/20 rounded-3xl p-12 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to Get <span className="gradient-text">Started?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers with Landmark Technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Enroll Now
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
