"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, LogOut, Home } from "lucide-react";
import { signOut, User } from "firebase/auth";
import { auth } from "@/app/mgt/lib/firebase";
import { logAuthEvent } from "@/app/mgt/lib/logger";
import { Button } from "@/components/ui/button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
    setIsLoading(false);

    // Log successful login
    if (currentUser) {
      logAuthEvent(
        currentUser.uid,
        currentUser.email || "unknown",
        "login",
        true
      ).catch(console.error);
    }
  }, []);

  const handleLogout = async () => {
    try {
      if (user) {
        // Log logout
        await logAuthEvent(user.uid, user.email || "unknown", "logout", true);
      }
      await signOut(auth);
      router.push("/mgt/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Log failed logout
      if (user) {
        await logAuthEvent(
          user.uid,
          user.email || "unknown",
          "logout",
          false,
          error instanceof Error ? error.message : "Unknown error"
        );
      }
    }
  };

  const navigationItems = [
    { href: "/mgt/dashboard", label: "Dashboard", icon: "📊" },
    { href: "/mgt/classes", label: "Classes", icon: "📚" },
    { href: "/mgt/pricing", label: "Pricing", icon: "💰" },
    { href: "/mgt/testimonials", label: "Testimonials", icon: "⭐" },
    { href: "/mgt/curriculum", label: "Curriculum", icon: "📖" },
    { href: "/mgt/metrics", label: "Metrics", icon: "📈" },
    { href: "/mgt/contact", label: "Contact", icon: "📞" },
    { href: "/mgt/faq", label: "FAQ", icon: "❓" },
    { href: "/mgt/configuration", label: "Configuration", icon: "⚙️" },
    { href: "/mgt/logs", label: "Logs", icon: "📋" },
  ];

  return (
    <div className="flex h-screen bg-background">
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 text-white transition-all duration-300 flex flex-col border-r border-slate-700`}
      >
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && (
            <Link href="/mgt/dashboard" className="font-bold text-lg">
              Landmark
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-slate-800 rounded transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm"
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <span className="text-lg">{item.icon}</span>
                  {sidebarOpen && <span>{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-3">
          {sidebarOpen && !isLoading && user && (
            <div className="text-xs truncate">
              <p className="text-slate-400">Logged in as:</p>
              <p className="font-semibold text-slate-100 truncate">
                {user.email}
              </p>
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
          >
            <LogOut size={18} />
            {sidebarOpen && <span className="ml-2">Logout</span>}
          </Button>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-slate-800 rounded-lg transition-colors"
          >
            <Home size={18} />
            {sidebarOpen && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
