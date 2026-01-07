"use client";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page doesn't need any special layout - just render children directly
  return <>{children}</>;
}
