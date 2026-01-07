import { Users, Award, Briefcase, Globe } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: "5,000+",
      label: "Students Trained",
      description: "Active professionals worldwide",
      gradient: "gradient-purple-pink",
      color: "text-purple",
    },
    {
      icon: Award,
      value: "50+",
      label: "Enterprise Clients",
      description: "DevOps consulting partnerships",
      gradient: "gradient-teal-cyan",
      color: "text-teal",
    },
    {
      icon: Briefcase,
      value: "95%",
      label: "Job Placement",
      description: "Training program success",
      gradient: "gradient-orange-red",
      color: "text-orange",
    },
    {
      icon: Globe,
      value: "$500K+",
      label: "Client Project Value",
      description: "Infrastructure transformations",
      gradient: "gradient-signature",
      color: "text-pink",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 blob gradient-teal-cyan opacity-10 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 blob gradient-purple-pink opacity-10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group text-center space-y-4 p-8 rounded-2xl glass hover:scale-105 transition-all duration-300 border border-border hover:border-transparent"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl ${stat.gradient} shadow-lg group-hover:shadow-xl transition-shadow`}
              >
                <stat.icon size={32} className="text-white" />
              </div>
              <div>
                <div className={`text-5xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
