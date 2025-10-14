import Link from "next/link"
import { Mail, Phone, MapPin, Linkedin, Youtube, Facebook } from "lucide-react"

export default function Footer() {
  return (
    <footer className="relative bg-card border-t border-border overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple via-teal to-orange" />
      <div className="absolute top-0 left-1/4 w-96 h-96 blob gradient-purple-pink opacity-5 blur-3xl" />
      <div className="absolute top-0 right-1/4 w-96 h-96 blob gradient-teal-cyan opacity-5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-lg gradient-purple-pink flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">LT</span>
              </div>
              <div className="flex flex-col">
                <span className="text-foreground font-bold text-lg leading-tight">Landmark</span>
                <span className="text-muted-foreground text-xs">Since 2005</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Transforming careers through hands-on DevOps training from basic to expert level.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/courses#devops"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  DevOps E. Degree
                </Link>
              </li>
              <li>
                <Link
                  href="/courses#linux"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Linux Administration
                </Link>
              </li>
              <li>
                <Link
                  href="/courses#aws"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  AWS Cloud
                </Link>
              </li>
              <li>
                <Link
                  href="/courses#kubernetes"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Kubernetes
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Register Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Phone size={16} className="text-teal mt-1 flex-shrink-0" />
                <a href="tel:+14372152483" className="text-muted-foreground hover:text-teal transition-colors text-sm">
                  +1 437 215 2483
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <Mail size={16} className="text-purple mt-1 flex-shrink-0" />
                <a
                  href="mailto:mylandmarktech@gmail.com"
                  className="text-muted-foreground hover:text-purple transition-colors text-sm break-all"
                >
                  mylandmarktech@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin size={16} className="text-orange mt-1 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">Online & Remote Training</span>
              </li>
            </ul>

            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-cyan transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-pink transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-purple transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Landmark Technologies. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
