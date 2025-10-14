import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { Download, Clock, CheckCircle, BookOpen, Award } from "lucide-react"

export default function CoursesPage() {
  const courseModules = [
    {
      id: "devops-intro",
      title: "DevOps Introduction",
      duration: "4 hours",
      topics: [
        "Software Development Life Cycles (SDLC)",
        "Waterfall Model & Agile Methodology",
        "What is DevOps and Why DevOps?",
        "DevOps Life cycle and Tools",
        "Market Trend and Career Scope",
      ],
    },
    {
      id: "linux",
      title: "Linux Administration",
      duration: "27 hours",
      topics: [
        "Linux Command Line & File Structure",
        "40+ Essential Linux Commands",
        "User & Group Management",
        "File Permissions & Ownership",
        "Process Management & Monitoring",
        "SSH & Remote Access",
      ],
    },
    {
      id: "shell-scripting",
      title: "Shell Scripting",
      duration: "12 hours",
      topics: [
        "Shell Types & Scripting Basics",
        "Variables & Command Line Arguments",
        "Control Structures (if, for, while)",
        "Functions & String Operations",
        "Input/Output Redirection",
        "Automation Scripts",
      ],
    },
    {
      id: "git",
      title: "Git & GitHub",
      duration: "12 hours",
      topics: [
        "Version Control Systems (VCS)",
        "Git Installation & Configuration",
        "Branching & Merging Strategies",
        "SSH Key Generation & PAT",
        "Cloning & Forking Repositories",
        "Best Practices for Code Commits",
      ],
    },
    {
      id: "maven",
      title: "Maven Build Tool",
      duration: "4 hours",
      topics: [
        "Maven Features & Benefits",
        "Installation & Directory Structure",
        "POM.xml Configuration",
        "Maven Repositories & Life Cycles",
        "Multi-Module Projects",
        "Maven Profiles",
      ],
    },
    {
      id: "tomcat",
      title: "Tomcat & Application Servers",
      duration: "4 hours",
      topics: [
        "Web Servers vs App Servers",
        "Tomcat Installation & Configuration",
        "User & Role Management",
        "Application Deployment Methods",
        "Port Configuration & Tuning",
        "Data Source Creation",
      ],
    },
    {
      id: "sonarqube",
      title: "SonarQube Code Quality",
      duration: "4 hours",
      topics: [
        "Code Quality Analysis",
        "SonarQube Architecture & Installation",
        "User & Project Management",
        "Quality Profiles & Gates",
        "Token Generation",
        "Email Configuration",
      ],
    },
    {
      id: "nexus",
      title: "Nexus Repository Manager",
      duration: "4 hours",
      topics: [
        "Artifact Repository Management",
        "Nexus Installation & Configuration",
        "Repository Creation",
        "Maven-Nexus Integration",
        "User Management",
        "Port & Context Configuration",
      ],
    },
    {
      id: "jenkins",
      title: "Jenkins CI/CD",
      duration: "24 hours",
      topics: [
        "Continuous Integration/Delivery/Deployment",
        "Jenkins Installation & Configuration",
        "Freestyle & Maven Projects",
        "Pipeline as Code (Jenkinsfile)",
        "Multi-branch Pipelines",
        "Master-Slave Architecture",
        "Plugin Management",
        "Integration with Git, Maven, SonarQube, Nexus",
        "Deployment Automation",
        "Jenkins Security & Backup",
      ],
    },
    {
      id: "docker",
      title: "Docker Containerization",
      duration: "18 hours",
      topics: [
        "Containerization vs Virtualization",
        "Docker Architecture & Installation",
        "Dockerfile Creation",
        "Docker Images & Containers",
        "Docker Networks & Volumes",
        "Docker Compose",
        "Docker Swarm",
        "Private Docker Registry",
      ],
    },
    {
      id: "kubernetes",
      title: "Kubernetes Orchestration",
      duration: "27 hours",
      topics: [
        "Kubernetes Architecture",
        "Cluster Setup with Kubeadm",
        "Pods, ReplicaSets, Deployments",
        "Services (ClusterIP, NodePort, LoadBalancer)",
        "ConfigMaps & Secrets",
        "Persistent Volumes & Claims",
        "StatefulSets & DaemonSets",
        "HPA & Metrics Server",
        "KOPS & EKS Setup",
        "Ingress Controllers",
        "RBAC & Security",
        "Helm Package Manager",
        "Monitoring with Prometheus & Grafana",
      ],
    },
    {
      id: "ansible",
      title: "Ansible Automation",
      duration: "16 hours",
      topics: [
        "Configuration Management",
        "Ansible Architecture",
        "SSH Key Setup",
        "Ad-hoc Commands",
        "Playbooks & Modules",
        "Variables & Loops",
        "Roles & Galaxy",
        "Ansible Vault",
        "Dynamic Inventory",
      ],
    },
    {
      id: "aws",
      title: "AWS Cloud Computing",
      duration: "32 hours",
      topics: [
        "Cloud Computing Fundamentals (IaaS, PaaS, SaaS)",
        "EC2 Instances & AMIs",
        "Security Groups & Elastic IPs",
        "EBS Volumes & Snapshots",
        "EFS File Systems",
        "S3 Storage & Lifecycle Management",
        "IAM Users, Groups & Policies",
        "VPC & Networking",
        "Load Balancers",
        "Auto Scaling",
        "CloudWatch Monitoring",
      ],
    },
    {
      id: "terraform",
      title: "Terraform Infrastructure as Code",
      duration: "12 hours",
      topics: [
        "Infrastructure as Code Concepts",
        "Terraform Installation & Setup",
        "Terraform Configuration Language",
        "Providers & Resources",
        "State Management",
        "Modules & Workspaces",
        "Terraform with AWS",
        "Integration with Ansible",
      ],
    },
  ]

  const projects = [
    {
      title: "Jenkins + GitHub + Maven + SonarQube + Nexus + Tomcat",
      description:
        "Complete CI/CD pipeline for e-commerce application with code quality checks and artifact management",
    },
    {
      title: "Jenkins + GitHub + Maven + SonarQube + Nexus + Docker",
      description: "Containerized deployment pipeline with automated Docker image builds and registry management",
    },
    {
      title: "Jenkins + Maven + SonarQube + Ansible + Docker",
      description: "Configuration management and container orchestration with automated deployments",
    },
    {
      title: "Jenkins + Maven + SonarQube + Docker + Docker Swarm",
      description: "Multi-container orchestration with Docker Swarm for high availability",
    },
    {
      title: "Jenkins + Maven + SonarQube + Docker + Kubernetes",
      description: "Production-grade Kubernetes deployment with automated scaling and monitoring",
    },
    {
      title: "Infrastructure Automation with Terraform + Ansible",
      description: "Complete infrastructure provisioning and configuration management on AWS",
    },
  ]

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full gradient-signature opacity-10 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
                DevOps E. Degree <span className="gradient-text">Curriculum</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                Comprehensive hands-on training covering all essential DevOps tools and practices. From Linux
                fundamentals to advanced Kubernetes orchestration.
              </p>

              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-3">
                  <Clock size={24} className="text-primary" />
                  <div>
                    <div className="font-bold text-foreground">185+ Hours</div>
                    <div className="text-sm text-muted-foreground">Total Training</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <BookOpen size={24} className="text-primary" />
                  <div>
                    <div className="font-bold text-foreground">14 Modules</div>
                    <div className="text-sm text-muted-foreground">Comprehensive</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award size={24} className="text-primary" />
                  <div>
                    <div className="font-bold text-foreground">6 Projects</div>
                    <div className="text-sm text-muted-foreground">Real-world</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
                >
                  Enroll Now - $3,000
                </Link>
                <a
                  href="/devops-syllabus-2025.pdf"
                  download
                  className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 group"
                >
                  <Download size={20} className="mr-2 group-hover:translate-y-0.5 transition-transform" />
                  Download Syllabus
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="p-8 rounded-2xl bg-card border-2 border-primary/20 shadow-2xl space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Program Highlights</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">Hands-on training from basic to expert level</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">Real-time use case scenarios</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">Soft copy materials & interview questions</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">Resume preparation & job assistance</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">6 comprehensive real-world projects</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle size={20} className="text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">Certificate of completion</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Program Fee</span>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-foreground">$3,000</div>
                      <div className="text-xs text-muted-foreground">Non-refundable (Class 41)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Course <span className="gradient-text">Modules</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              14 comprehensive modules covering all essential DevOps tools and practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseModules.map((module, index) => (
              <div
                key={module.id}
                className="p-6 rounded-xl bg-background border border-border hover:border-primary/50 transition-all duration-300 space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg gradient-signature flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{module.title}</h3>
                      <div className="flex items-center space-x-2 text-muted-foreground text-sm">
                        <Clock size={14} />
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2 pl-16">
                  {module.topics.map((topic, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start space-x-2">
                      <span className="text-primary mt-1">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Real-World <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Apply your skills to 6 comprehensive projects that mirror production environments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-foreground leading-tight">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fee & Refund Policy */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
                Fee & <span className="gradient-text">Refund Policy</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-background border-2 border-border space-y-4">
                <h3 className="text-xl font-bold text-foreground">Standard Fee</h3>
                <div className="text-4xl font-bold text-muted-foreground line-through">$20,000</div>
                <p className="text-muted-foreground">Refundable standard program fee</p>
              </div>

              <div className="p-6 rounded-xl bg-background border-2 border-primary/50 space-y-4 relative overflow-hidden">
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                  CLASS 41
                </div>
                <h3 className="text-xl font-bold text-foreground">Discounted Fee</h3>
                <div className="text-4xl font-bold gradient-text">$3,000</div>
                <p className="text-muted-foreground">
                  <strong>Non-refundable</strong> discounted fee for Class 41
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 space-y-4">
              <h3 className="text-lg font-bold text-foreground">Important Notes</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start space-x-3">
                  <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>
                    The $3,000 fee for Class 41 is <strong className="text-foreground">non-refundable</strong>
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>Money-back guarantee available if not satisfied after first week</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>Payment plans available - contact admissions for details</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle size={18} className="text-primary flex-shrink-0 mt-0.5" />
                  <span>All course materials and lifetime access included</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border-2 border-primary/20 rounded-3xl p-12 text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
              Ready to <span className="gradient-text">Start Learning?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join Class 41 and transform your career with comprehensive DevOps training
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/register"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-5 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                Enroll Now - $3,000
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-5 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Schedule a Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
