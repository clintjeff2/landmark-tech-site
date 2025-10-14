import Link from "next/link"
import { ArrowRight, Calendar, Users, Zap } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-signature opacity-5" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-card border-2 border-primary/20 rounded-3xl p-12 md:p-16 text-center space-y-8 shadow-2xl">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to <span className="gradient-text">Transform Your Career?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join Class 41 and start your journey to becoming a highly-paid DevOps engineer. Limited seats available.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <div className="font-bold text-foreground">Starts Soon</div>
                <div className="text-sm text-muted-foreground">Class 41 Enrollment</div>
              </div>
            </div>

            <div className="hidden sm:block h-12 w-px bg-border" />

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Users size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <div className="font-bold text-foreground">Limited Seats</div>
                <div className="text-sm text-muted-foreground">Only 30 spots left</div>
              </div>
            </div>

            <div className="hidden sm:block h-12 w-px bg-border" />

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Zap size={20} className="text-primary" />
              </div>
              <div className="text-left">
                <div className="font-bold text-foreground">Fast Track</div>
                <div className="text-sm text-muted-foreground">6-month program</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-5 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 group"
            >
              Enroll Now - $3,000
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-5 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Schedule a Call
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              🔒 Secure payment • 💯 Money-back guarantee • 🎓 Certificate included
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
