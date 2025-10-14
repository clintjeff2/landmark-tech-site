import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Globe, Target, Heart, Lightbulb } from "lucide-react"

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We maintain the highest standards in DevOps education and training delivery.",
    },
    {
      icon: Heart,
      title: "Student Success",
      description: "Your career transformation is our primary mission and measure of success.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously update our curriculum with the latest industry practices.",
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Quality DevOps education should be accessible to everyone, everywhere.",
    },
  ]

  const milestones = [
    { year: "2005", title: "Founded", description: "Landmark Technologies established" },
    { year: "2010", title: "1,000 Students", description: "Reached first major milestone" },
    { year: "2015", title: "Global Expansion", description: "Training students in 50+ countries" },
    { year: "2020", title: "5,000+ Alumni", description: "Growing community of DevOps professionals" },
    { year: "2025", title: "Industry Leader", description: "Recognized as top DevOps training provider" },
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
              Transforming Careers <span className="gradient-text">Since 2005</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              Landmark Technologies has been at the forefront of DevOps education for nearly two decades, helping
              thousands of professionals transition into high-paying tech careers.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold gradient-text">18+</div>
              <div className="text-muted-foreground">Years of Excellence</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold gradient-text">5,000+</div>
              <div className="text-muted-foreground">Students Trained</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold gradient-text">50+</div>
              <div className="text-muted-foreground">Countries Reached</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-5xl font-bold gradient-text">95%</div>
              <div className="text-muted-foreground">Job Placement Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To democratize access to world-class DevOps education and empower individuals from all backgrounds to
                build successful careers in technology.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that with the right training, mentorship, and support, anyone can master DevOps and secure a
                high-paying role in the tech industry. Our comprehensive curriculum and hands-on approach have helped
                thousands of students achieve their career goals.
              </p>
            </div>

            <div className="relative h-[400px] rounded-2xl overflow-hidden border border-border bg-card">
              <img src="/diverse-team-collaborating-on-computers-in-modern-.jpg" alt="Team collaboration" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center space-y-4 p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-signature">
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground">Two decades of innovation and growth</p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start space-x-6 group">
                <div className="flex-shrink-0 w-24 text-right">
                  <div className="text-2xl font-bold gradient-text">{milestone.year}</div>
                </div>
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-primary mt-2 group-hover:scale-150 transition-transform" />
                <div className="flex-1 pb-8 border-l-2 border-border pl-6 -ml-2">
                  <h3 className="text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
