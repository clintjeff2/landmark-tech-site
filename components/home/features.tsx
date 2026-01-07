import {
  Code,
  Cloud,
  Container,
  GitBranch,
  Shield,
  Zap,
  Briefcase,
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Code,
      title: "Hands-On Training Labs",
      description:
        "Real-world projects and scenarios. Build production-ready CI/CD pipelines from day one using live enterprise examples.",
      gradient: "gradient-purple-pink",
      iconColor: "text-purple",
      borderColor: "border-purple/30",
    },
    {
      icon: Briefcase,
      title: "Enterprise Consulting",
      description:
        "Benefit from our active DevOps consulting practice. Learn techniques we use to transform Fortune 500 infrastructure daily.",
      gradient: "gradient-orange-red",
      iconColor: "text-orange",
      borderColor: "border-orange/30",
    },
    {
      icon: Cloud,
      title: "AWS Cloud Mastery",
      description:
        "Complete AWS training including EC2, S3, EBS, IAM, and architecture best practices from enterprise deployments.",
      gradient: "gradient-orange-red",
      iconColor: "text-orange",
      borderColor: "border-orange/30",
    },
    {
      icon: Container,
      title: "Docker & Kubernetes",
      description:
        "45+ hours of containerization training. Master Docker, Kubernetes, and orchestration at enterprise scale.",
      gradient: "gradient-teal-cyan",
      iconColor: "text-cyan",
      borderColor: "border-cyan/30",
    },
    {
      icon: GitBranch,
      title: "CI/CD Automation",
      description:
        "Jenkins, Git, Maven, SonarQube integration. Automate everything from code to deployment like our consulting clients.",
      gradient: "gradient-signature",
      iconColor: "text-pink",
      borderColor: "border-pink/30",
    },
    {
      icon: Shield,
      title: "Infrastructure as Code",
      description:
        "Terraform and Ansible automation. Build scalable, repeatable infrastructure - proven in 50+ client environments.",
      gradient: "gradient-teal-cyan",
      iconColor: "text-teal",
      borderColor: "border-teal/30",
    },
    {
      icon: Zap,
      title: "Career + Consulting Path",
      description:
        "Get hired as a DevOps Engineer OR start your own consulting practice. We show you both paths to $150K+.",
      gradient: "gradient-orange-red",
      iconColor: "text-yellow",
      borderColor: "border-yellow/30",
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] blob gradient-purple-pink opacity-5 blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] blob gradient-teal-cyan opacity-5 blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />

      <div className="container-responsive relative z-10">
        <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Why Choose <span className="gradient-text-purple">Landmark</span>{" "}
            <span className="gradient-text-teal">Technologies</span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Training + Consulting hybrid approach: Learn from professionals who
            actively transform enterprise infrastructure while delivering
            real-world solutions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 sm:p-8 rounded-2xl glass border-2 ${feature.borderColor} hover:border-opacity-100 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl ${feature.gradient} flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3
                className={`text-lg sm:text-xl font-bold ${feature.iconColor} mb-2 sm:mb-3`}
              >
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
