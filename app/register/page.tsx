"use client"

import type React from "react"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useState } from "react"
import { Check, ChevronRight, ChevronLeft, CreditCard, Lock } from "lucide-react"

type FormData = {
  // Step 1: Personal Information
  fullName: string
  email: string
  phone: string
  country: string
  city: string

  // Step 2: Program Details
  cohort: string
  schedule: string
  skillLevel: string
  hearAboutUs: string

  // Step 3: Payment
  paymentMethod: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  billingAddress: string

  // Terms
  agreeToTerms: boolean
  agreeToRefundPolicy: boolean
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    cohort: "",
    schedule: "",
    skillLevel: "",
    hearAboutUs: "",
    paymentMethod: "card",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    billingAddress: "",
    agreeToTerms: false,
    agreeToRefundPolicy: false,
  })

  const totalSteps = 3

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Registration successful! You will receive a confirmation email shortly.")
      // In production, redirect to success page
    }, 2000)
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.fullName && formData.email && formData.phone && formData.country && formData.city
      case 2:
        return formData.cohort && formData.schedule && formData.skillLevel
      case 3:
        return (
          formData.cardNumber &&
          formData.cardExpiry &&
          formData.cardCvc &&
          formData.billingAddress &&
          formData.agreeToTerms &&
          formData.agreeToRefundPolicy
        )
      default:
        return false
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full gradient-signature opacity-10 blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">
            Enroll in <span className="gradient-text">Class 41</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Complete your registration to secure your spot in our DevOps E. Degree program
          </p>
        </div>
      </section>

      {/* Progress Steps */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      step < currentStep
                        ? "bg-primary text-white"
                        : step === currentStep
                          ? "bg-primary text-white ring-4 ring-primary/20"
                          : "bg-card border-2 border-border text-muted-foreground"
                    }`}
                  >
                    {step < currentStep ? <Check size={20} /> : step}
                  </div>
                  <div className="mt-2 text-sm font-medium text-center">
                    <div className={step <= currentStep ? "text-foreground" : "text-muted-foreground"}>
                      {step === 1 && "Personal Info"}
                      {step === 2 && "Program Details"}
                      {step === 3 && "Payment"}
                    </div>
                  </div>
                </div>
                {step < 3 && (
                  <div className={`h-1 flex-1 mx-4 rounded ${step < currentStep ? "bg-primary" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Content */}
      <section className="py-12 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border space-y-6">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">Personal Information</h2>
                      <p className="text-muted-foreground">Tell us about yourself</p>
                    </div>

                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-foreground mb-2">
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
                        <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                          placeholder="john@example.com"
                        />
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="country" className="block text-sm font-semibold text-foreground mb-2">
                          Country *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                        >
                          <option value="">Select country</option>
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="IN">India</option>
                          <option value="NG">Nigeria</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold text-foreground mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                          placeholder="New York"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Program Details */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">Program Details</h2>
                      <p className="text-muted-foreground">Choose your preferred schedule and cohort</p>
                    </div>

                    <div>
                      <label htmlFor="cohort" className="block text-sm font-semibold text-foreground mb-2">
                        Preferred Cohort *
                      </label>
                      <select
                        id="cohort"
                        name="cohort"
                        value={formData.cohort}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                      >
                        <option value="">Select cohort</option>
                        <option value="class41-jan">Class 41 - January 2025</option>
                        <option value="class41-feb">Class 41 - February 2025</option>
                        <option value="class41-mar">Class 41 - March 2025</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="schedule" className="block text-sm font-semibold text-foreground mb-2">
                        Preferred Schedule *
                      </label>
                      <select
                        id="schedule"
                        name="schedule"
                        value={formData.schedule}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                      >
                        <option value="">Select schedule</option>
                        <option value="weekday-morning">Weekday Morning (9AM - 12PM EST)</option>
                        <option value="weekday-evening">Weekday Evening (6PM - 9PM EST)</option>
                        <option value="weekend">Weekend (10AM - 4PM EST)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="skillLevel" className="block text-sm font-semibold text-foreground mb-2">
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
                        <option value="beginner">Beginner (No IT experience)</option>
                        <option value="intermediate">Intermediate (Some IT experience)</option>
                        <option value="advanced">Advanced (Experienced IT professional)</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="hearAboutUs" className="block text-sm font-semibold text-foreground mb-2">
                        How did you hear about us?
                      </label>
                      <select
                        id="hearAboutUs"
                        name="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                      >
                        <option value="">Select option</option>
                        <option value="google">Google Search</option>
                        <option value="social">Social Media</option>
                        <option value="referral">Friend/Colleague Referral</option>
                        <option value="youtube">YouTube</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground mb-2">Payment Information</h2>
                      <p className="text-muted-foreground">Secure payment processing</p>
                    </div>

                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-foreground font-semibold">Program Fee</span>
                        <span className="text-3xl font-bold gradient-text">$3,000</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Non-refundable discounted fee for Class 41</p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">Payment Method *</label>
                      <div className="grid grid-cols-2 gap-4">
                        <label className="relative cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="card"
                            checked={formData.paymentMethod === "card"}
                            onChange={handleChange}
                            className="peer sr-only"
                          />
                          <div className="p-4 rounded-lg border-2 border-border peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                            <CreditCard size={24} className="mx-auto mb-2 text-foreground" />
                            <div className="text-center text-sm font-semibold text-foreground">Credit Card</div>
                          </div>
                        </label>

                        <label className="relative cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === "paypal"}
                            onChange={handleChange}
                            className="peer sr-only"
                          />
                          <div className="p-4 rounded-lg border-2 border-border peer-checked:border-primary peer-checked:bg-primary/5 transition-all">
                            <CreditCard size={24} className="mx-auto mb-2 text-foreground" />
                            <div className="text-center text-sm font-semibold text-foreground">PayPal</div>
                          </div>
                        </label>
                      </div>
                    </div>

                    {formData.paymentMethod === "card" && (
                      <>
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-semibold text-foreground mb-2">
                            Card Number *
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            required
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="cardExpiry" className="block text-sm font-semibold text-foreground mb-2">
                              Expiry Date *
                            </label>
                            <input
                              type="text"
                              id="cardExpiry"
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              required
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                            />
                          </div>

                          <div>
                            <label htmlFor="cardCvc" className="block text-sm font-semibold text-foreground mb-2">
                              CVC *
                            </label>
                            <input
                              type="text"
                              id="cardCvc"
                              name="cardCvc"
                              value={formData.cardCvc}
                              onChange={handleChange}
                              required
                              placeholder="123"
                              className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="billingAddress" className="block text-sm font-semibold text-foreground mb-2">
                            Billing Address *
                          </label>
                          <textarea
                            id="billingAddress"
                            name="billingAddress"
                            value={formData.billingAddress}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground resize-none"
                            placeholder="123 Main St, City, State, ZIP"
                          />
                        </div>
                      </>
                    )}

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
                        <span className="text-sm text-muted-foreground">
                          I agree to the{" "}
                          <a href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </a>
                        </span>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToRefundPolicy"
                          checked={formData.agreeToRefundPolicy}
                          onChange={handleChange}
                          required
                          className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground">
                          I understand that the $3,000 fee for Class 41 is{" "}
                          <strong className="text-foreground">non-refundable</strong> as stated in the syllabus
                        </span>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 rounded-lg bg-secondary/50 text-sm text-muted-foreground">
                      <Lock size={16} className="text-primary flex-shrink-0" />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg border-2 border-border text-foreground hover:border-primary transition-all"
                    >
                      <ChevronLeft size={20} />
                      <span>Previous</span>
                    </button>
                  )}

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className="inline-flex items-center space-x-2 ml-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Next Step</span>
                      <ChevronRight size={20} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid() || isSubmitting}
                      className="inline-flex items-center space-x-2 ml-auto bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Lock size={18} />
                      <span>{isSubmitting ? "Processing..." : "Complete Registration"}</span>
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="p-6 rounded-xl bg-card border border-border space-y-4 sticky top-24">
                <h3 className="text-lg font-bold text-foreground">Order Summary</h3>

                <div className="space-y-3 py-4 border-y border-border">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">DevOps E. Degree</span>
                    <span className="font-semibold text-foreground">$20,000</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600">Class 41 Discount</span>
                    <span className="font-semibold text-green-600">-$17,000</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-3xl font-bold gradient-text">$3,000</span>
                </div>

                <div className="pt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-start space-x-2">
                    <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>185+ hours of training</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>6 real-world projects</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Job assistance included</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Lifetime access to materials</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </div>

              {/* Help */}
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
                <h3 className="font-bold text-foreground">Need Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Have questions about registration? Our team is here to help.
                </p>
                <a
                  href="/contact"
                  className="block w-full text-center bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
