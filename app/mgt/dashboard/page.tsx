"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  BookOpen,
  Star,
  Activity,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/app/mgt/components/shared";
import { useAuth } from "@/app/mgt/hooks/useAuth";
import { db } from "@/app/mgt/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

interface DashboardStats {
  totalClasses: number;
  activeClasses: number;
  totalEnrolled: number;
  totalTestimonials: number;
}

interface QuickAction {
  label: string;
  href: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalClasses: 0,
    activeClasses: 0,
    totalEnrolled: 0,
    totalTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch total classes
        const classesRef = collection(db, "classes");
        const classesDocs = await getDocs(classesRef);
        const totalClasses = classesDocs.size;

        // Fetch active classes (status = "active" OR isCurrentClass = true)
        let activeClasses = 0;
        classesDocs.forEach((doc) => {
          const data = doc.data();
          if (data.status === "active" || data.isCurrentClass === true) {
            activeClasses++;
          }
        });

        // Fetch total enrolled students from students collection
        const studentsRef = collection(db, "students");
        const studentsDocs = await getDocs(studentsRef);
        const totalEnrolled = studentsDocs.size;

        // Fetch total testimonials
        const testimonialsRef = collection(db, "testimonials");
        const testimonialsDocs = await getDocs(testimonialsRef);
        const totalTestimonials = testimonialsDocs.size;

        setStats({
          totalClasses,
          activeClasses,
          totalEnrolled,
          totalTestimonials,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        // Keep default values on error
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions: QuickAction[] = [
    {
      label: "Manage Classes",
      href: "/mgt/classes",
      icon: <BookOpen size={24} />,
      description: "Add, edit, or view all classes",
      color: "bg-blue-500/10",
    },
    {
      label: "Update Pricing",
      href: "/mgt/pricing",
      icon: <TrendingUp size={24} />,
      description: "Manage pricing and payment plans",
      color: "bg-green-500/10",
    },
    {
      label: "Testimonials",
      href: "/mgt/testimonials",
      icon: <Star size={24} />,
      description: "View and manage student testimonials",
      color: "bg-yellow-500/10",
    },
    {
      label: "Curriculum",
      href: "/mgt/curriculum",
      icon: <BookOpen size={24} />,
      description: "Manage modules and projects",
      color: "bg-purple-500/10",
    },
  ];

  const StatCard = ({
    icon,
    label,
    value,
    change,
    bgColor,
  }: {
    icon: React.ReactNode;
    label: string;
    value: number;
    change?: string;
    bgColor: string;
  }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">
            {label}
          </p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            {loading ? "—" : value}
          </p>
          {change && (
            <p className="text-green-600 dark:text-green-400 text-sm mt-2">
              {change}
            </p>
          )}
        </div>
        <div
          className={`${bgColor} p-3 rounded-lg text-slate-700 dark:text-slate-300`}
        >
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${user?.email || "Admin"}!`}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<BookOpen className="text-blue-600" size={24} />}
          label="Total Classes"
          value={stats.totalClasses}
          change="+2 this month"
          bgColor="bg-blue-500/10"
        />
        <StatCard
          icon={<Activity className="text-green-600" size={24} />}
          label="Active Classes"
          value={stats.activeClasses}
          change="Running now"
          bgColor="bg-green-500/10"
        />
        <StatCard
          icon={<Users className="text-purple-600" size={24} />}
          label="Students Enrolled"
          value={stats.totalEnrolled}
          change="+12 this week"
          bgColor="bg-purple-500/10"
        />
        <StatCard
          icon={<Star className="text-yellow-600" size={24} />}
          label="Testimonials"
          value={stats.totalTestimonials}
          change="+3 new"
          bgColor="bg-yellow-500/10"
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-5 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600 transition-all group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {action.label}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {action.description}
                  </p>
                </div>
                <div
                  className={`${action.color} p-3 rounded-lg text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors`}
                >
                  {action.icon}
                </div>
              </div>
              <div className="mt-3 flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:gap-2 transition-all">
                Visit <ArrowRight size={16} className="ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
