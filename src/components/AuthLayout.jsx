// components/AuthLayout.jsx
"use client";

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background bg-gradient-to-br from-secondary/20 via-primary/10 to-accent/10 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-card/70 p-8 backdrop-blur-md shadow-2xl ring-1 ring-border/20 animate-fade-in">
        {children}
      </div>
    </div>
  );
}
