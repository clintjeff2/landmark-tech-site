import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Hero from "@/components/home/hero"
import Stats from "@/components/home/stats"
import Features from "@/components/home/features"
import CourseOverview from "@/components/home/course-overview"
import Testimonials from "@/components/home/testimonials"
import CTA from "@/components/home/cta"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Stats />
      <Features />
      <CourseOverview />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
