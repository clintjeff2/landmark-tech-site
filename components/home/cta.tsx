"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Users, Zap } from "lucide-react";
import { useCurrentClass } from "@/hooks/useCurrentClass";

export default function CTA() {
  const { currentClass, loading, formatPrice, formatDate } = useCurrentClass();
  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-signature opacity-5" />

      <div className="container-responsive relative z-10 max-w-5xl">
        <div className="bg-card border-2 border-primary/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-16 text-center space-y-6 sm:space-y-8 shadow-2xl">
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Ready to{" "}
              <span className="gradient-text">Transform Your Career?</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Join {loading ? "Class 41" : currentClass?.name || "Class 41"} and
              start your journey to becoming a highly-paid DevOps engineer—or
              launch your consulting practice. Limited seats available.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 py-4 sm:py-6">
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm sm:text-base text-foreground">
                  {loading
                    ? "Starts Soon"
                    : currentClass?.startDate
                    ? formatDate(currentClass.startDate)
                    : "Starts Soon"}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {loading
                    ? "Class 41 Enrollment"
                    : `${currentClass?.name || "Class 41"} Enrollment`}
                </div>
              </div>
            </div>

            <div className="hidden sm:block h-12 w-px bg-border" />

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm sm:text-base text-foreground">
                  Limited Seats
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Only 30 spots left
                </div>
              </div>
            </div>

            <div className="hidden sm:block h-12 w-px bg-border" />

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-bold text-sm sm:text-base text-foreground">
                  Fast Track
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  6-month program
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 group"
            >
              <span className="truncate">
                Enroll in Training - {loading ? "$3,000" : formatPrice()}
              </span>
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0"
                size={18}
              />
            </Link>
            <Link
              href="/contact?subject=consulting"
              className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300"
            >
              Consulting Inquiry
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="pt-6 sm:pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              🔒 Secure payment • 💯 Money-back guarantee • 🎓 Certificate
              included
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
