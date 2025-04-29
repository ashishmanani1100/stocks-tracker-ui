// components/SignupForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/dashboard"); // after successful signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary">Create Account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Join us today!</p>
      </div>
      <form onSubmit={handleSignup} className="mt-8 space-y-6">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-foreground">Email address</label>
          <input
            type="email"
            className="mt-1 w-full rounded-lg border border-input bg-background p-3 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-lg border border-input bg-background p-3 text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-primary p-3 text-primary-foreground hover:bg-primary/80 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="font-semibold text-primary hover:underline">
          Login
        </a>
      </p>
    </>
  );
}
