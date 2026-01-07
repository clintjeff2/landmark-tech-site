"use client";

import { AdminLayout } from "@/app/mgt/components/AdminLayout";
import { auth } from "@/app/mgt/lib/firebase";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

export default function MgtLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    // Check if we're on the login page
    const onLoginPage = pathname === "/mgt/login";
    setIsLoginPage(onLoginPage);

    // Set up Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (!currentUser && !onLoginPage) {
        // User is not logged in and not on login page - redirect to login
        router.push("/mgt/login");
      }

      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [pathname, router]);

  // Still checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // For login page, render without AdminLayout
  if (isLoginPage) {
    return children;
  }

  // Not authenticated - redirect in progress
  if (!user) {
    return null;
  }

  // For other pages, render with AdminLayout
  return <AdminLayout>{children}</AdminLayout>;
}
