"use client";

import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex max-w-4xl flex-col items-center justify-center gap-6 px-4 text-center"
      >
        <div className="rounded-full border border-slate-300 bg-white/85 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 shadow-sm">
          AI Interview Platform
        </div>

        <div className="bg-gradient-to-b from-slate-950 to-slate-700 bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-7xl">
          Practice Smarter.
          <br />
          Get Interview Ready.
        </div>

        <div className="max-w-2xl text-base font-medium text-slate-600 md:text-2xl">
          Solve coding problems, run mock interview rounds, and track your score progression in one clean workflow.
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link to="/interview" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(15,23,42,0.25)] transition hover:-translate-y-0.5 hover:bg-slate-800">
            Start Interview
          </Link>
          <Link to="/problems" className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-500">
            Solve Problems
          </Link>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
