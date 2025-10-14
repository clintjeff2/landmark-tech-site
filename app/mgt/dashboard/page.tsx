"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Users,
  FileText,
  DollarSign,
  Activity,
  Search,
  Download,
  MoreVertical,
  LogOut,
  Settings,
  Bell,
  TrendingUp,
  Calendar,
  Mail,
} from "lucide-react"

// Mock data
const mockStudents = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 555-0101",
    country: "United States",
    cohort: "Class 41 - January 2025",
    status: "Active",
    paymentStatus: "Paid",
    enrolledDate: "2024-12-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 555-0102",
    country: "Canada",
    cohort: "Class 41 - January 2025",
    status: "Active",
    paymentStatus: "Paid",
    enrolledDate: "2024-12-14",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    phone: "+1 555-0103",
    country: "United States",
    cohort: "Class 41 - February 2025",
    status: "Pending",
    paymentStatus: "Pending",
    enrolledDate: "2024-12-16",
  },
]

const mockActivities = [
  { id: 1, type: "enrollment", message: "New student enrolled: John Doe", time: "2 hours ago" },
  { id: 2, type: "payment", message: "Payment received: $3,000 from Jane Smith", time: "5 hours ago" },
  { id: 3, type: "content", message: "Syllabus updated for Class 41", time: "1 day ago" },
  { id: 4, type: "email", message: "Welcome email sent to 5 new students", time: "2 days ago" },
]

export default function AdminDashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
    } else {
      router.push("/mgt/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/mgt/login")
  }

  const exportToCSV = () => {
    // Mock CSV export
    alert("Exporting students to CSV...")
  }

  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || student.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  if (!isAuthenticated) {
    return null
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-lg gradient-signature flex items-center justify-center">
                <span className="text-white font-bold text-lg">LT</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-xs text-muted-foreground">Landmark Technologies</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell size={20} className="text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </button>
              <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <Settings size={20} className="text-muted-foreground" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <LogOut size={18} className="text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-6 max-w-[1600px] mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users size={24} className="text-primary" />
              </div>
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">248</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
            <div className="text-xs text-green-600">+12% from last month</div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <DollarSign size={24} className="text-primary" />
              </div>
              <TrendingUp size={20} className="text-green-500" />
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">$744K</div>
              <div className="text-sm text-muted-foreground">Total Revenue</div>
            </div>
            <div className="text-xs text-green-600">+8% from last month</div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar size={24} className="text-primary" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Active Cohorts</div>
            </div>
            <div className="text-xs text-muted-foreground">Class 41, 42, 43</div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-border space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity size={24} className="text-primary" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
            <div className="text-xs text-green-600">Above target</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Management */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Student Management</h2>
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-semibold"
                >
                  <Download size={16} />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground text-sm"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:outline-none text-foreground text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Students Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Cohort</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Payment</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-semibold text-foreground text-sm">{student.name}</div>
                            <div className="text-xs text-muted-foreground">{student.email}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">{student.cohort}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              student.status === "Active"
                                ? "bg-green-500/10 text-green-600"
                                : "bg-yellow-500/10 text-yellow-600"
                            }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              student.paymentStatus === "Paid"
                                ? "bg-green-500/10 text-green-600"
                                : "bg-red-500/10 text-red-600"
                            }`}
                          >
                            {student.paymentStatus}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                            <MoreVertical size={16} className="text-muted-foreground" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity Log & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="p-6 rounded-xl bg-card border border-border space-y-4">
              <h3 className="font-bold text-foreground">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-background hover:bg-secondary transition-colors text-left">
                  <FileText size={18} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Update Syllabus</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-background hover:bg-secondary transition-colors text-left">
                  <Mail size={18} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Send Email</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-background hover:bg-secondary transition-colors text-left">
                  <Users size={18} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Manage Cohorts</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 rounded-lg bg-background hover:bg-secondary transition-colors text-left">
                  <DollarSign size={18} className="text-primary" />
                  <span className="text-sm font-medium text-foreground">Payment Reports</span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="p-6 rounded-xl bg-card border border-border space-y-4">
              <h3 className="font-bold text-foreground">Recent Activity</h3>
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
