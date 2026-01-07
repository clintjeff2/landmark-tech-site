"use client";

import type React from "react";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useState, useEffect } from "react";
import {
  Check,
  GraduationCap,
  MapPin,
  User,
  Mail,
  Phone,
  Globe,
} from "lucide-react";
import { db } from "@/app/mgt/lib/firebase";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  cohort: string;
  skillLevel: string;
  hearAboutUs: string;
  additionalComments: string;
  agreeToTerms: boolean;
};

type ClassData = {
  id: string;
  number: number;
  name: string;
  status: string;
  startDate: any;
  endDate: any;
  startTime: string;
  endTime: string;
  timezone: string;
  daysOfWeek: string[];
  capacity: number;
  enrolled: number;
  description?: string;
  isCurrentClass: boolean;
};

type PricingData = {
  id: string;
  classId: string;
  basePrice: number;
  currency: string;
  installmentAmount?: number;
  installmentPeriodMonths?: number;
};

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentClass, setCurrentClass] = useState<ClassData | null>(null);
  const [pricing, setPricing] = useState<PricingData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    cohort: "",
    skillLevel: "",
    hearAboutUs: "",
    additionalComments: "",
    agreeToTerms: false,
  });

  useEffect(() => {
    const fetchClassAndPricing = async () => {
      try {
        // Fetch current class
        const classesRef = collection(db, "classes");
        const currentClassQuery = query(
          classesRef,
          where("isCurrentClass", "==", true)
        );
        const classSnapshot = await getDocs(currentClassQuery);

        if (!classSnapshot.empty) {
          const classDoc = classSnapshot.docs[0];
          const classData = {
            id: classDoc.id,
            ...classDoc.data(),
          } as ClassData;
          setCurrentClass(classData);

          // Set default cohort in form
          const cohortName = `${classData.name} - ${formatDate(
            classData.startDate
          )}`;
          setFormData((prev) => ({ ...prev, cohort: cohortName }));

          // Fetch pricing for this class
          const pricingRef = collection(db, "pricing");
          const pricingQuery = query(
            pricingRef,
            where("classId", "==", classDoc.id)
          );
          const pricingSnapshot = await getDocs(pricingQuery);

          if (!pricingSnapshot.empty) {
            const pricingDoc = pricingSnapshot.docs[0];
            const pricingData = {
              id: pricingDoc.id,
              ...pricingDoc.data(),
            } as PricingData;
            setPricing(pricingData);
          }
        }
      } catch (error) {
        console.error("Error fetching class and pricing data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClassAndPricing();
  }, []);

  const formatDate = (timestamp: any): string => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatDaysOfWeek = (days: string[]): string => {
    if (!days || days.length === 0) return "";
    return days.join(", ");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Save to Firestore
      const studentsRef = collection(db, "students");
      await addDoc(studentsRef, {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        city: formData.city,
        cohort: formData.cohort,
        skillLevel: formData.skillLevel,
        hearAboutUs: formData.hearAboutUs,
        additionalComments: formData.additionalComments,
        enrollmentStatus: "pending",
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Error submitting registration:", error);
      setIsSubmitting(false);
      alert("Error submitting registration. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <section className="pt-32 pb-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Check size={40} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Registration <span className="gradient-text">Submitted!</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Thank you for your interest in Landmark Technologies DevOps E.
              Degree program. Our admissions team will contact you within 24-48
              hours to complete your enrollment and discuss payment options.
            </p>
            <div className="p-6 rounded-xl bg-card border border-border space-y-4">
              <h3 className="font-bold text-foreground text-lg">Next Steps:</h3>
              <ul className="space-y-2 text-left text-muted-foreground">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">1.</span>
                  <span>Check your email for a confirmation message</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">2.</span>
                  <span>Our team will reach out via phone or WhatsApp</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">3.</span>
                  <span>We'll discuss payment options and schedule</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-1">4.</span>
                  <span>You'll receive access to the student portal</span>
                </li>
              </ul>
            </div>
            <div className="pt-6">
              <a
                href="/"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Return to Home
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full gradient-signature opacity-10 blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Enroll in{" "}
            <span className="gradient-text">
              {loading ? "..." : currentClass?.name || "Class 41"}
            </span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Start your DevOps career journey. Complete the form below and our
            team will contact you.
          </p>
          {!loading && currentClass && (
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <GraduationCap size={16} />
              <span>Class starts: {formatDate(currentClass.startDate)}</span>
            </div>
          )}
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl bg-card border border-border space-y-8"
              >
                {/* Personal Information */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-border">
                    <User className="text-primary" size={24} />
                    <h2 className="text-2xl font-bold text-foreground">
                      Personal Information
                    </h2>
                  </div>

                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          size={18}
                        />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Phone Number (with country code) *
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          size={18}
                        />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        Country *
                      </label>
                      <div className="relative">
                        <Globe
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          size={18}
                        />
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground appearance-none"
                        >
                          <option value="">Select country</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="India">India</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Cameroon">Cameroon</option>
                          <option value="Ghana">Ghana</option>
                          <option value="Kenya">Kenya</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Australia">Australia</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-semibold text-foreground mb-2"
                      >
                        City *
                      </label>
                      <div className="relative">
                        <MapPin
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                          size={18}
                        />
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                          placeholder="New York"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Program Preferences */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-border">
                    <GraduationCap className="text-primary" size={24} />
                    <h2 className="text-2xl font-bold text-foreground">
                      Program Preferences
                    </h2>
                  </div>

                  <div>
                    <label
                      htmlFor="cohort"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Cohort *
                    </label>
                    <select
                      id="cohort"
                      name="cohort"
                      value={formData.cohort}
                      onChange={handleChange}
                      required
                      disabled={loading}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground disabled:opacity-50"
                    >
                      {loading ? (
                        <option value="">Loading...</option>
                      ) : currentClass ? (
                        <option value={formData.cohort}>
                          {currentClass.name} -{" "}
                          {formatDate(currentClass.startDate)}
                        </option>
                      ) : (
                        <option value="">No active class available</option>
                      )}
                    </select>
                    {!loading && currentClass && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {formatDate(currentClass.startDate)} -{" "}
                        {formatDate(currentClass.endDate)} |{" "}
                        {formatDaysOfWeek(currentClass.daysOfWeek)}:{" "}
                        {currentClass.startTime} - {currentClass.endTime}{" "}
                        {currentClass.timezone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="skillLevel"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Current Skill Level *
                    </label>
                    <select
                      id="skillLevel"
                      name="skillLevel"
                      value={formData.skillLevel}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                    >
                      <option value="">Select skill level</option>
                      <option value="No IT Background">
                        No IT Background (Complete Beginner)
                      </option>
                      <option value="Some IT Knowledge">
                        Some IT Knowledge
                      </option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">
                        Advanced (Want to Upgrade)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="hearAboutUs"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      How did you hear about us? *
                    </label>
                    <select
                      id="hearAboutUs"
                      name="hearAboutUs"
                      value={formData.hearAboutUs}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                    >
                      <option value="">Select option</option>
                      <option value="YouTube">YouTube</option>
                      <option value="Google Search">Google Search</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Friend/Colleague Referral">
                        Friend/Colleague Referral
                      </option>
                      <option value="Alumni Referral">Alumni Referral</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Telegram">Telegram</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="additionalComments"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Additional Comments or Questions (Optional)
                    </label>
                    <textarea
                      id="additionalComments"
                      name="additionalComments"
                      value={formData.additionalComments}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground resize-none"
                      placeholder="Tell us about your goals or any questions you have..."
                    />
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="space-y-4 pt-4 border-t border-border">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      required
                      className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      I agree to the terms and conditions and understand that
                      the admissions team will contact me to discuss payment
                      options. I understand the program fee is{" "}
                      {pricing
                        ? `$${pricing.basePrice.toLocaleString()} ${
                            pricing.currency
                          }`
                        : "$3,000 USD"}{" "}
                      {pricing?.installmentAmount &&
                        pricing?.installmentPeriodMonths &&
                        `which can be paid in installments of $${pricing.installmentAmount}/month over ${pricing.installmentPeriodMonths} months`}
                      . *
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.agreeToTerms}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Program Summary */}
              <div className="p-6 rounded-xl bg-card border border-border space-y-4 sticky top-24">
                <h3 className="text-xl font-bold text-foreground">
                  Program Summary
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Program</span>
                    <span className="font-semibold text-foreground">
                      DevOps E. Degree
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-semibold text-foreground">
                      4.5 Months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Hours</span>
                    <span className="font-semibold text-foreground">
                      206 Hours
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Modules</span>
                    <span className="font-semibold text-foreground">
                      15 Modules
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Projects</span>
                    <span className="font-semibold text-foreground">
                      6 Real-World
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-muted-foreground">Program Fee</span>
                    <div className="text-right">
                      {loading ? (
                        <div className="text-2xl font-bold gradient-text">
                          Loading...
                        </div>
                      ) : pricing ? (
                        <>
                          <div className="text-2xl font-bold gradient-text">
                            ${pricing.basePrice.toLocaleString()}{" "}
                            {pricing.currency}
                          </div>
                          {pricing.installmentAmount && (
                            <div className="text-xs text-muted-foreground">
                              ${pricing.installmentAmount}/month installments
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-2xl font-bold gradient-text">
                          $3,000
                        </div>
                      )}
                      {!loading && (
                        <div className="text-xs text-muted-foreground">
                          Installments available
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex items-start space-x-2">
                    <Check
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <span className="text-xs text-muted-foreground">
                      Lifetime access to materials
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <span className="text-xs text-muted-foreground">
                      Job assistance & resume prep
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <span className="text-xs text-muted-foreground">
                      Certificate of completion
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check
                      size={16}
                      className="text-primary mt-0.5 flex-shrink-0"
                    />
                    <span className="text-xs text-muted-foreground">
                      Alumni community access
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
                <h3 className="font-bold text-foreground">Need Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Contact our admissions team:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone size={14} className="text-primary" />
                    <a
                      href="tel:+14372152483"
                      className="text-foreground hover:text-primary"
                    >
                      +1 437 215 2483
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={14} className="text-primary" />
                    <a
                      href="mailto:mylandmarktech@gmail.com"
                      className="text-foreground hover:text-primary"
                    >
                      mylandmarktech@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
