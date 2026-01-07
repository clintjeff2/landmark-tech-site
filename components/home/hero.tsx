"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import KubernetesDemoPlayer from "@/components/KubernetesDemoPlayer";
import { useCurrentClass } from "@/hooks/useCurrentClass";
import { useStatCounter } from "@/hooks/useCountUp";

function HeroStat({ value, label }: { value: string; label: string }) {
  const counter = useStatCounter(value, 2000);

  return (
    <div className="group">
      <div
        ref={counter.ref}
        className="text-2xl sm:text-3xl font-bold gradient-text-purple"
      >
        {counter.value}
      </div>
      <div className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

export default function Hero() {
  const { currentClass, loading, formatPrice } = useCurrentClass();
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-20" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] blob gradient-purple-pink opacity-20 blur-3xl animate-float" />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] blob gradient-teal-cyan opacity-20 blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] blob gradient-orange-red opacity-10 blur-3xl animate-float"
        style={{ animationDelay: "4s" }}
      />

      <div className="container-responsive py-12 sm:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="px-3 sm:px-4 py-2 rounded-full glass border border-purple/30 text-foreground text-xs sm:text-sm font-semibold flex items-center gap-2 w-fit">
                <Sparkles size={14} className="text-purple sm:w-4 sm:h-4" />
                {loading ? "Loading..." : currentClass?.name || "Class 41"} Now
                Enrolling
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance">
              Transform Your Career &{" "}
              <span className="gradient-text-purple">
                Enterprise Infrastructure
              </span>{" "}
              with <span className="gradient-text-teal">DevOps Excellence</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty">
              We're not just a training academy—we're a{" "}
              <span className="text-primary font-semibold">
                full-service DevOps consulting partner
              </span>
              . Train your team with industry-proven expertise while we help
              your organization implement real-world DevOps transformations.
              Master <span className="text-teal font-semibold">Linux</span>,{" "}
              <span className="text-orange font-semibold">AWS</span>,{" "}
              <span className="text-cyan font-semibold">Docker</span>,{" "}
              <span className="text-purple font-semibold">Kubernetes</span>,{" "}
              <span className="text-pink font-semibold">Jenkins</span>, and more
              through hands-on training + real enterprise consulting experience.{" "}
              <span className="text-foreground font-bold">
                {" "}
                {loading ? "$3,000" : formatPrice()} comprehensive program
              </span>{" "}
              with job assistance, consulting exposure, and real-world projects
              from our client work.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-gradient-orange-red text-white hover:opacity-90 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 group shadow-xl animate-glow"
              >
                <span className="truncate">
                  Enroll Now - {loading ? "$3,000" : formatPrice()}
                </span>
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0"
                  size={18}
                />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center glass border-2 border-teal text-foreground hover:bg-teal/10 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300"
              >
                View Syllabus
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center glass border-2 border-primary text-foreground hover:bg-primary/10 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300"
              >
                Consulting Inquiry
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 pt-4">
              <HeroStat value="18+" label="Years Experience" />
              <div className="h-12 w-px bg-gradient-to-b from-purple via-teal to-orange hidden sm:block" />
              <HeroStat value="5,000+" label="Students Trained" />
              <div className="h-12 w-px bg-gradient-to-b from-teal via-cyan to-purple hidden sm:block" />
              <HeroStat value="95%" label="Job Placement" />
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Kubernetes Demo Player */}
            <KubernetesDemoPlayer height="600px" speed={35} />

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 glass border border-purple/30 rounded-lg p-4 shadow-lg animate-float">
              <div className="text-2xl font-bold gradient-text-purple">
                100%
              </div>
              <div className="text-xs text-muted-foreground">Hands-on</div>
            </div>

            <div
              className="absolute -bottom-4 -left-4 glass border border-teal/30 rounded-lg p-4 shadow-lg animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="text-2xl font-bold text-teal">27hrs</div>
              <div className="text-xs text-muted-foreground">Kubernetes</div>
            </div>

            <div
              className="absolute top-1/2 -left-6 glass border border-orange/30 rounded-lg p-3 shadow-lg animate-float"
              style={{ animationDelay: "2s" }}
            >
              <div className="text-lg font-bold text-orange">15</div>
              <div className="text-xs text-muted-foreground">Modules</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
