"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminLoginProps {
  passwordInput: string;
  setPasswordInput: (password: string) => void;
  handleLogin: (e: React.FormEvent) => void;
}

export function AdminLogin({ passwordInput, setPasswordInput, handleLogin }: AdminLoginProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-lg border p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}