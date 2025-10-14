// Mock data structures for the application
// In production, this would be replaced with Firebase/Firestore

export type Student = {
  id: string
  fullName: string
  email: string
  phone: string
  country: string
  city: string
  cohort: string
  schedule: string
  skillLevel: string
  status: "active" | "pending" | "completed" | "dropped"
  paymentStatus: "paid" | "pending" | "refunded"
  paymentAmount: number
  enrolledDate: string
  completionDate?: string
}

export type Cohort = {
  id: string
  name: string
  startDate: string
  endDate: string
  schedule: string
  capacity: number
  enrolled: number
  status: "upcoming" | "active" | "completed"
}

export type Payment = {
  id: string
  studentId: string
  amount: number
  currency: string
  status: "completed" | "pending" | "failed" | "refunded"
  paymentMethod: string
  transactionId: string
  date: string
}

export type Activity = {
  id: string
  type: "enrollment" | "payment" | "content" | "email" | "system"
  message: string
  timestamp: string
  userId?: string
}

// Mock students data
export const mockStudents: Student[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 555-0101",
    country: "United States",
    city: "New York",
    cohort: "Class 41 - January 2025",
    schedule: "Weekday Evening",
    skillLevel: "Beginner",
    status: "active",
    paymentStatus: "paid",
    paymentAmount: 3000,
    enrolledDate: "2024-12-15",
  },
  {
    id: "2",
    fullName: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 555-0102",
    country: "Canada",
    city: "Toronto",
    cohort: "Class 41 - January 2025",
    schedule: "Weekend",
    skillLevel: "Intermediate",
    status: "active",
    paymentStatus: "paid",
    paymentAmount: 3000,
    enrolledDate: "2024-12-14",
  },
]

// Mock cohorts data
export const mockCohorts: Cohort[] = [
  {
    id: "1",
    name: "Class 41 - January 2025",
    startDate: "2025-01-15",
    endDate: "2025-07-15",
    schedule: "Weekday Evening",
    capacity: 40,
    enrolled: 32,
    status: "upcoming",
  },
  {
    id: "2",
    name: "Class 42 - February 2025",
    startDate: "2025-02-01",
    endDate: "2025-08-01",
    schedule: "Weekend",
    capacity: 40,
    enrolled: 18,
    status: "upcoming",
  },
]

// Mock payments data
export const mockPayments: Payment[] = [
  {
    id: "1",
    studentId: "1",
    amount: 3000,
    currency: "USD",
    status: "completed",
    paymentMethod: "Credit Card",
    transactionId: "txn_1234567890",
    date: "2024-12-15",
  },
]

// Mock activities data
export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "enrollment",
    message: "New student enrolled: John Doe",
    timestamp: "2024-12-15T10:30:00Z",
    userId: "1",
  },
  {
    id: "2",
    type: "payment",
    message: "Payment received: $3,000 from Jane Smith",
    timestamp: "2024-12-14T15:45:00Z",
    userId: "2",
  },
]
