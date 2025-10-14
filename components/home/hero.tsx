import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import KubernetesDemoPlayer from "@/components/KubernetesDemoPlayer";

export default function Hero() {
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full glass border border-purple/30 text-foreground text-sm font-semibold flex items-center gap-2 w-fit">
                <Sparkles size={16} className="text-purple" />
                Class 41 Now Enrolling
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance">
              Transform Your Career with{" "}
              <span className="gradient-text-purple">DevOps</span>{" "}
              <span className="gradient-text-teal">Mastery</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              Hands-on training from basic to expert level. Master{" "}
              <span className="text-teal font-semibold">Linux</span>,{" "}
              <span className="text-orange font-semibold">AWS</span>,{" "}
              <span className="text-cyan font-semibold">Docker</span>,{" "}
              <span className="text-purple font-semibold">Kubernetes</span>,{" "}
              <span className="text-pink font-semibold">Jenkins</span>, and
              more.
              <span className="text-foreground font-bold">
                {" "}
                $3,000 comprehensive program
              </span>{" "}
              with job assistance and real-world projects.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-gradient-orange-red text-white hover:opacity-90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 group shadow-xl animate-glow"
              >
                Enroll Now - $3,000
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center glass border-2 border-teal text-foreground hover:bg-teal/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                View Syllabus
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="group">
                <div className="text-3xl font-bold gradient-text-purple">
                  18+
                </div>
                <div className="text-sm text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-purple via-teal to-orange" />
              <div className="group">
                <div className="text-3xl font-bold gradient-text-teal">
                  5000+
                </div>
                <div className="text-sm text-muted-foreground">
                  Students Trained
                </div>
              </div>
              <div className="h-12 w-px bg-gradient-to-b from-teal via-cyan to-purple" />
              <div className="group">
                <div className="text-3xl font-bold text-orange">95%</div>
                <div className="text-sm text-muted-foreground">
                  Job Placement
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Visual */}
          <div
            className="relative lg:h-[600px] animate-fade-in-up"
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
