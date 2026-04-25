"use client"

import { motion } from "framer-motion";
import { XCircle, RefreshCcw, MessageCircle } from "lucide-react";
import Link from "next/link";
import Header from "@/components/ui/Header";

export default function PaymentFailPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <Header variant="dark" />
      
      <main className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 100 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-rose-100 rounded-full"
            />
            <XCircle className="w-24 h-24 text-rose-500 relative z-10" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-black text-[#312821] mb-4"
        >
          Payment Failed
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-500 mb-12 max-w-md leading-relaxed"
        >
          Something went wrong during the transaction. Don't worry, no money was deducted from your account.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md"
        >
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#312821] text-white rounded-2xl font-bold hover:bg-black transition shadow-lg shadow-stone-200"
          >
            <RefreshCcw className="w-5 h-5" />
            Try Again
          </Link>
          
          <a
            href="https://wa.me/60136305766"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-100 text-[#312821] rounded-2xl font-bold hover:bg-slate-50 transition shadow-sm"
          >
            <MessageCircle className="w-5 h-5" />
            Chat with Us
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 max-w-sm"
        >
          <p className="text-sm text-slate-400 font-medium italic">
            "Your sweet cravings deserve another try! Most payment failures are due to network issues or session timeouts."
          </p>
        </motion.div>
      </main>
    </div>
  );
}
