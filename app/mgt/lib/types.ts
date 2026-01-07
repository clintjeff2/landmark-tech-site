// TypeScript interfaces for all Firestore collections

// CLASSES
export interface Class {
  id: string;
  number: number;
  name: string;
  status: "upcoming" | "active" | "completed" | "archived";
  startDate: string | Date;
  endDate: string | Date;
  startTime: string;
  endTime: string;
  timezone: string;
  daysOfWeek: string[];
  capacity: number;
  enrolled: number;
  description?: string;
  isCurrentClass: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// PRICING
export interface PaymentMethod {
  id: string;
  name: string;
  type: "digital" | "bank" | "mobile";
  email?: string;
  accountNumber?: string;
  accountName?: string;
  bankName?: string;
  routingNumber?: string;
  swiftCode?: string;
  country?: string;
  phoneNumber?: string;
  instructions?: string;
  isActive: boolean;
  order: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Pricing {
  id: string;
  classId: string;
  basePrice: number;
  currency: string;
  installmentAmount?: number;
  installmentPeriodMonths?: number;
  isRefundable: boolean;
  refundDeadlineDays?: number;
  moneyBackGuarantee: boolean;
  guaranteeDeadlineDays?: number;
  discountPercentage?: number;
  discountValidUntil?: string | Date;
  paymentMethods?: PaymentMethod[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

// TESTIMONIALS
export interface VideoTestimonial {
  id: string;
  youtubeId: string;
  title: string;
  description: string;
  thumbnail?: string;
  graduateName?: string;
  position?: string;
  company?: string;
  yearlySalary?: string;
  order: number;
  isActive: boolean;
  featuredOnHomepage: boolean;
  category?: string;
  tags: string[];
  views?: number;
  publishedAt?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface WrittenTestimonial {
  id: string;
  graduateName: string;
  jobRole: string;
  company: string;
  profileImage?: string;
  testimonialText: string;
  yearlySalary: string;
  rating: number;
  order: number;
  isActive: boolean;
  featuredOnHomepage: boolean;
  category?: string;
  tags: string[];
  jobTitle?: string;
  yearsExperienceBefore?: number;
  yearsExperienceAfter?: number;
  timeToGetJob?: string;
  videoLink?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// METRICS
export interface CompanyMetrics {
  id: string;
  totalGraduates: number;
  jobPlacementRate: number;
  averageSalary: number;
  averageSalaryCurrency: string;
  enterpriseClients: number;
  clientProjectValue: number;
  yearsInBusiness: number;
  countriesReached: number;
  courseModules: number;
  courseDurationHours: number;
  realWorldProjects: number;
  graduatesConsultingSuccessRate?: number;
  averageConsultingSalary?: number;
  timeToFirstJobDays?: number;
  studentSatisfactionRate?: number;
  updatedAt: string | Date;
}

// CURRICULUM
export interface CourseModule {
  id: string;
  number: number;
  title: string;
  duration: string;
  durationHours: number;
  description?: string;
  topics: string[];
  order: number;
  isActive: boolean;
  prerequisites?: string[];
  skills: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface RealWorldProject {
  id: string;
  number: number;
  title: string;
  description: string;
  technologies: string[];
  duration?: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  order: number;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// CONTACT
export interface ContactPhone {
  id: string;
  number: string;
  type: "main" | "whatsapp" | "telegram" | "support";
  country?: string;
  isActive: boolean;
  order: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ContactEmail {
  id: string;
  email: string;
  type: "general" | "support" | "billing" | "partnerships";
  isActive: boolean;
  order: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon?: string;
  order: number;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface RegionalPaymentInfo {
  id: string;
  country: string;
  methodName: string;
  accountName?: string;
  accountNumber?: string;
  phoneNumber?: string;
  bankName?: string;
  amount?: number;
  amountCurrency?: string;
  instructions: string;
  isActive: boolean;
  order: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

// PAGES
export interface PageContent {
  id: string;
  pageSlug: string;
  sectionId: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  order: number;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// FAQ
export interface FAQCategory {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface FAQItem {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
  order: number;
  isActive: boolean;
  helpful?: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// CONFIGURATION
export interface AnnouncementBanner {
  text: string;
  backgroundColor: string;
  textColor: string;
  isActive: boolean;
}

export interface SiteFeatures {
  enableRegistration: boolean;
  enableTestimonials: boolean;
  enableConsultingCTA: boolean;
  enableJobBoard?: boolean;
}

export interface SiteConfiguration {
  id: string;
  maintenanceMode: boolean;
  announcementBanner?: AnnouncementBanner;
  googleAnalyticsId?: string;
  features: SiteFeatures;
  updatedAt: string | Date;
}

// LOGS
export interface AdminLog {
  id: string;
  adminId: string;
  adminEmail: string;
  action: string;
  collection: string;
  documentId?: string;
  documentTitle?: string;
  changesBefore?: Record<string, any>;
  changesAfter?: Record<string, any>;
  status: "success" | "error";
  errorMessage?: string;
  timestamp: string | Date;
}

// AUTH
export interface AdminUser {
  uid: string;
  email: string;
  displayName?: string;
  role: "admin" | "editor";
}
