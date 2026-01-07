"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useCurrentClass } from "@/hooks/useCurrentClass";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { loading, formatPrice, pricing } = useCurrentClass();
  const [searchQuery, setSearchQuery] = useState("");

  const faqs = [
    {
      category: "Eligibility & Enrollment",
      questions: [
        {
          question: "Who can study Landmark DevOps E. Degree Master Program?",
          answer:
            "Anyone who graduated from High School and is at least 18 years old can enroll. The program is perfect for: individuals with a passion for technology and DevOps practices, those looking to make a career change into technology, and anyone who prefers remote learning opportunities. We've trained professionals from diverse backgrounds including University Professors, Pharmacists, CPAs, Lawyers, Accountants, Nurses, Drivers, Factory workers, and students.",
        },
        {
          question: "When is the next class starting?",
          answer:
            "Class 41 starts on September 27, 2025 and runs until February 28, 2026. Classes are held on Mondays, Tuesdays, and Saturdays from 7:00 PM - 10:00 PM EST (Eastern Standard Time: New York/Toronto timezone). Please use https://www.timeanddate.com/worldclock/converter.html to convert between time zones as needed.",
        },
        {
          question:
            "I don't have an IT Background. Can I still do this course and succeed?",
          answer:
            "Absolutely! The course has a step-by-step learning path, starting from the basics and gradually progressing to more advanced topics. This approach enables a smooth transition for beginners. We've successfully trained people from non-IT backgrounds including pharmacists, nurses, accountants, and factory workers.",
        },
      ],
    },
    {
      category: "Career & Salary",
      questions: [
        {
          question:
            "What is the average salary of a Landmark Trained DevOps Engineer?",
          answer:
            "The average salary is about $150,000/year for a single job. Note: You can start making millions of dollars via our coaching programs that help Engineers start their own IT companies.",
        },
        {
          question:
            "Which kind of job(s) can I do after completing Landmark DevOps Master Program?",
          answer:
            "You can pursue various roles including: DevOps Engineer, DevSecOps Engineer, Cloud Engineer, AWS Cloud Engineer, Platform Engineer, Infrastructure Engineer, Kubernetes Engineer, Sr. IT Recruiter, Technical Project Manager, Production Lead, Build and Release Engineer, Site Reliability Engineer (SRE), Cloud Architect, Containerization Specialist, Automation Engineer, Security DevOps Engineer, Cloud Migration Specialist, Cloud Data Engineer, Cloud Solution Architect, AWS Solution Architect, AWS Certified Developer, DevOps Trainer/Instructor, CI/CD Specialist, Cloud Security Engineer, DevOps Consultant, Cloud Operations Specialist, Serverless Engineer, Multi-Cloud Specialist, AWS Data Analytics Specialist, AWS IoT Developer, Cloud Cost Optimization Analyst, and even President/Vice President for Application Support.",
        },
        {
          question: "Do you provide job guarantees?",
          answer:
            "While we cannot guarantee employment, we provide extensive job assistance and have a 95% placement rate. Your success depends on your dedication, skill development, and active participation in the job search process.",
        },
      ],
    },
    {
      category: "Fees & Payment",
      questions: [
        {
          question: "How much is the fee, and can I pay in installments?",
          answer: loading
            ? "The fee is $3,000 USD and can be paid in minimum installments of $750/month..."
            : `The fee is ${formatPrice()} and can be paid in ${
                pricing?.installmentAmount
                  ? `installments of $${pricing.installmentAmount}/month over ${pricing.installmentPeriodMonths} months`
                  : "installments"
              }. You can also pay the complete fee upfront (recommended). Please type your name and class as payment reference/message and send screenshots to Prof Legah at +1 437 215 2483 and +1 647 267 6399 through WhatsApp/Telegram after each payment. IMPORTANT: Refrain from making Zelle or Cash App payments using phone numbers. Please use email only for transactions, sending payments to fees@mylandmarktech.com`,
        },
        {
          question: "How can I pay my fees?",
          answer:
            "Pay using: Interact, ZELLE, or CashApp. Payment Email: fees@mylandmarktech.com. For payment through Paypal, request an invoice from +1 437 215 2483 or +1 647 267 6399 through WhatsApp.",
        },
        {
          question: "Fee payment for Cameroonian students in Cameroon?",
          answer:
            "MTN momo numbers: +237 675306766 (SIMON LEGAH) or +237 672649710 (CUCCAS 3). Amount: 1,700,000frs total or 500,000frs/month.",
        },
        {
          question: "Fee payment for Nigerian students in Nigeria?",
          answer:
            "Access Bank - Account No: 1933419572, Account name: Simon Legah OR Zenith Bank - Account No: 2432218860, Account name: Simon Legah",
        },
      ],
    },
    {
      category: "Program Details",
      questions: [
        {
          question: "What is the duration of the course?",
          answer:
            "The program is 4.5 months plus free Bootcamp. Class 41 runs from September 27, 2025 to February 28, 2026 with classes on Mondays, Tuesdays, and Saturdays from 7:00 PM - 10:00 PM EST.",
        },
        {
          question: "What is included in the DevOps E. Degree program?",
          answer:
            "The program includes 206 hours of live instruction covering 15 modules: DevOps Introduction, Linux Administration (27 hrs), Shell Scripting (12 hrs), Git & GitHub (12 hrs), Maven (4 hrs), Tomcat (6 hrs), Apache HTTP Server (4 hrs), SonarQube (4 hrs), Nexus (4 hrs), Jenkins CI/CD (24 hrs), Docker (18 hrs), Kubernetes (27 hrs), Ansible (16 hrs), AWS Cloud (32 hrs), and Terraform (12 hrs). You'll also receive soft copy materials, interview questions, resume preparation, job assistance, and access to 6 real-world projects.",
        },
        {
          question: "Is the training live or pre-recorded?",
          answer:
            "All training is conducted live via Zoom with expert instructors. This allows for real-time interaction, questions, and hands-on guidance. Recordings are provided for review.",
        },
        {
          question: "Can I access course materials after completion?",
          answer:
            "Yes, you'll have lifetime access to all course materials, recordings, and updates. You'll also remain part of our alumni community for ongoing support.",
        },
      ],
    },
    {
      category: "Technical Requirements",
      questions: [
        {
          question: "Which kind of computer will I need for the course?",
          answer:
            "A laptop with at least 8GB RAM, 256GB or 500GB storage, and a 14-inch screen is required.",
        },
        {
          question: "Will I get access to cloud resources for practice?",
          answer:
            "Yes, we provide guidance on setting up free-tier AWS accounts for practice. You'll also receive credits for certain cloud services as part of the program.",
        },
      ],
    },
    {
      category: "Course Bonuses",
      questions: [
        {
          question: "What bonuses are included with the course?",
          answer:
            "Course bonuses include: Bootcamp (Resume preparation, LinkedIn profiling, and interview reviews), Daily interview sessions, 100% job-oriented training, Hands-On Projects, Continuous Learning Resources, Collaborative Learning Environment, Industry-Standard Tools, Career Development, Access to Course Material with lifetime access, Latest Industry Trends updates, and the Grace of God at work in Landmark Technologies. You'll be part of a community that has trained Engineers from diverse backgrounds including University Professors, Pharmacists, CPAs, ACCAs, CFAs, Lawyers, Accountants, Bankers, Entrepreneurs, Nurses, RN, CNAs, Drivers, Scrum Masters, Factory workers, PSW, DSW, and students.",
        },
        {
          question: "Where can I see more about your training?",
          answer:
            "For a more visual experience, subscribe to our YouTube channel at: https://www.youtube.com/channel/UCa98yMG9Sxtcyk61li3jPwQ",
        },
      ],
    },
    {
      category: "Support & Community",
      questions: [
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
        {
          question: "What kind of job assistance do you provide?",
          answer:
            "We provide comprehensive career support including resume preparation, LinkedIn optimization, mock interviews, salary negotiation coaching, and job referrals. Our team works with you until you land your desired role.",
        },
      ],
    },
    {
      category: "Consulting & Enterprise",
      questions: [
        {
          question: "Does Landmark offer enterprise consulting services?",
          answer:
            "Yes! In addition to training, Landmark Technologies is an active consulting firm serving 50+ enterprise clients. We provide DevOps consulting, infrastructure transformation, CI/CD pipeline design, Kubernetes orchestration, cloud migration, and DevSecOps services. Our consulting team works on production systems for Fortune 500 companies.",
        },
        {
          question: "Can I start a consulting practice after the course?",
          answer:
            "Absolutely! One of our dual career paths is 'DevOps Consultant.' After completing the program, you can leverage our mentorship to build your own consulting practice. We've coached graduates who now run 6-figure consulting businesses. You'll learn how our instructors—who are active consultants—build and scale their consulting ventures.",
        },
        {
          question:
            "How does Landmark's consulting experience improve the training?",
          answer:
            "Every module is informed by real challenges we solve for enterprise clients. Our instructors are active consultants, not just trainers. This means you learn battle-tested, production-proven techniques currently deployed in mission-critical environments at Fortune 500 companies. The curriculum directly reflects what works in the real world.",
        },
        {
          question:
            "Can enterprises hire Landmark for their DevOps consulting?",
          answer:
            "Yes! Organizations can engage Landmark Technologies for strategic DevOps consulting including: CI/CD pipeline design and implementation, Kubernetes and container orchestration, cloud migration strategies, DevSecOps and compliance frameworks, performance optimization and cost reduction, and 24/7 consulting support with SLAs. Contact us at contact@mylandmarktech.com for enterprise consulting inquiries.",
        },
        {
          question: "Do students interact with Landmark's consulting team?",
          answer:
            "Yes! Since our instructors are active consultants, you'll learn directly from professionals who are solving real enterprise challenges. You'll hear case studies from live client projects, understand production architecture decisions, and learn the consulting mindset—all while developing your technical skills.",
        },
      ],
    },
  ];

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

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
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
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
              <p className="text-muted-foreground">
                No questions found matching your search.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredFaqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground">
                    {category.category}
                  </h2>

                  <div className="space-y-4">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      const isOpen = openIndex === globalIndex;

                      return (
                        <div
                          key={faqIndex}
                          className="rounded-lg bg-card border border-border hover:border-primary/50 transition-colors overflow-hidden"
                        >
                          <button
                            onClick={() =>
                              setOpenIndex(isOpen ? null : globalIndex)
                            }
                            className="w-full px-6 py-5 flex items-center justify-between text-left"
                          >
                            <span className="font-semibold text-foreground pr-8">
                              {faq.question}
                            </span>
                            <ChevronDown
                              size={20}
                              className={`text-primary flex-shrink-0 transition-transform ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-6 pb-5">
                              <p className="text-muted-foreground leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      );
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
            Our admissions team is here to help. Schedule a call or send us a
            message.
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
  );
}
