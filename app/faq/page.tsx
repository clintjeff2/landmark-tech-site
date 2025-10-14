"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import Link from "next/link"

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [searchQuery, setSearchQuery] = useState("")

  const faqs = [
    {
      category: "Program Details",
      questions: [
        {
          question: "What is included in the DevOps E. Degree program?",
          answer:
            "The program includes 185+ hours of live instruction covering Linux, Git, Maven, Jenkins, Docker, Kubernetes, Ansible, AWS, and Terraform. You'll also receive soft copy materials, interview questions, resume preparation, job assistance, and access to 6 real-world projects.",
        },
        {
          question: "Do I need prior IT experience to enroll?",
          answer:
            "No prior IT knowledge is required. Our program is designed to take you from basic to expert level. We start with fundamentals and progressively build your skills through hands-on training.",
        },
        {
          question: "How long is the program?",
          answer:
            "The program typically runs for 6 months with flexible scheduling options. You can choose from weekday or weekend batches based on your availability.",
        },
        {
          question: "Is the training live or pre-recorded?",
          answer:
            "All training is conducted live via Zoom with expert instructors. This allows for real-time interaction, questions, and hands-on guidance. Recordings are provided for review.",
        },
      ],
    },
    {
      category: "Pricing & Payment",
      questions: [
        {
          question: "What is the program fee?",
          answer:
            "The non-refundable discounted fee for Class 41 is $3,000 USD. This is a significant discount from the standard fee of $20,000 USD.",
        },
        {
          question: "Are there payment plans available?",
          answer:
            "Yes, we offer flexible payment plans. Contact our admissions team to discuss options that work for your budget.",
        },
        {
          question: "Is the fee refundable?",
          answer:
            "The $3,000 discounted fee for Class 41 is non-refundable. However, we offer a money-back guarantee if you're not satisfied after the first week of training.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, debit cards, bank transfers, and PayPal. Payment is processed securely through Stripe.",
        },
      ],
    },
    {
      category: "Career Support",
      questions: [
        {
          question: "What kind of job assistance do you provide?",
          answer:
            "We provide comprehensive career support including resume preparation, LinkedIn optimization, mock interviews, salary negotiation coaching, and job referrals. Our team works with you until you land your desired role.",
        },
        {
          question: "What is your job placement rate?",
          answer:
            "We maintain a 95% job placement rate. Most of our graduates secure DevOps, Cloud Engineer, or Site Reliability Engineer roles within 3-6 months of completing the program.",
        },
        {
          question: "What salary can I expect after completing the program?",
          answer:
            "Entry-level DevOps engineers typically earn $80,000-$120,000 annually in the US. With experience, salaries can exceed $150,000. International salaries vary by location but are generally competitive.",
        },
        {
          question: "Do you provide job guarantees?",
          answer:
            "While we cannot guarantee employment, we provide extensive job assistance and have a 95% placement rate. Your success depends on your dedication, skill development, and active participation in the job search process.",
        },
      ],
    },
    {
      category: "Technical Requirements",
      questions: [
        {
          question: "What equipment do I need?",
          answer:
            "You'll need a computer (Windows, Mac, or Linux) with at least 8GB RAM, stable internet connection, and a webcam for live sessions. We'll guide you through installing all necessary software.",
        },
        {
          question: "Will I get access to cloud resources for practice?",
          answer:
            "Yes, we provide guidance on setting up free-tier AWS accounts for practice. You'll also receive credits for certain cloud services as part of the program.",
        },
        {
          question: "Can I access course materials after completion?",
          answer:
            "Yes, you'll have lifetime access to all course materials, recordings, and updates. You'll also remain part of our alumni community for ongoing support.",
        },
      ],
    },
    {
      category: "Enrollment",
      questions: [
        {
          question: "When does Class 41 start?",
          answer:
            "Class 41 is starting soon with limited seats available. Contact us or complete the registration form to secure your spot and receive the exact start date.",
        },
        {
          question: "How many students are in each cohort?",
          answer:
            "We maintain small cohort sizes (typically 30-40 students) to ensure personalized attention and effective learning.",
        },
        {
          question: "Can I switch cohorts if I miss classes?",
          answer:
            "Yes, if you need to miss classes due to emergencies, you can catch up with recordings or join the next cohort for those specific sessions.",
        },
      ],
    },
  ]

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0)

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full gradient-signature opacity-10 blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Find answers to common questions about our DevOps training program
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto pt-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-card border border-border focus:border-primary focus:outline-none text-foreground"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No questions found matching your search.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">{category.category}</h2>

                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex
                      const isOpen = openIndex === globalIndex

                      return (
                        <div
                          key={faqIndex}
                          className="rounded-lg bg-card border border-border hover:border-primary/50 transition-colors overflow-hidden"
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left"
                          >
                            <span className="font-semibold text-foreground pr-8">{faq.question}</span>
                            <ChevronDown
                              size={20}
                              className={`text-primary flex-shrink-0 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-6 pb-5">
                              <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground text-balance">
            Still Have <span className="gradient-text">Questions?</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Our admissions team is here to help. Schedule a call or send us a message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
