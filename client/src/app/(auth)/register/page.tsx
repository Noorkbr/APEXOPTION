"use client";

import React from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Activity } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4 py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-accent-dark/10 rounded-full blur-[100px]" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 relative"
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg shadow-accent/30">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">
            <span className="gradient-text">APEX</span>
            <span className="text-text-primary"> OPTIONS</span>
          </span>
        </Link>
      </motion.div>

      {/* Form */}
      <div className="relative z-10">
        <RegisterForm />
      </div>
    </div>
  );
}
