"use client";

import { useState, useEffect } from "react";
import { auth } from "@/app/mgt/lib/firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthState({
        user,
        loading: false,
        error: null,
      });
    });

    return () => unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true, error: null }));
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAuthState({
        user: result.user,
        loading: false,
        error: null,
      });
      return result.user;
    } catch (error: any) {
      const errorMessage =
        error?.code === "auth/invalid-credential"
          ? "Invalid email or password"
          : error?.message || "Authentication failed";
      setAuthState({
        user: null,
        loading: false,
        error: errorMessage,
      });
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, loading: true }));
      await signOut(auth);
      setAuthState({
        user: null,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: error?.message || "Logout failed",
      }));
      throw error;
    }
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    signIn,
    logout,
    isAuthenticated: !!authState.user,
  };
}
