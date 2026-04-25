"use client"

import { motion } from "framer-motion";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/ui/Header";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Billplz returns billplz[paid]=true/false in the URL
  const paid = searchParams.get('billplz[paid]') === 'true';
  const hasStatus = searchParams.has('billplz[paid]');

  useEffect(() => {
    // If we have a status and it's NOT paid, go to fail page
    if (hasStatus && !paid) {
      router.replace('/payment/fail');
    }
  }, [hasStatus, paid, router]);

  // Don't show success content if we know it failed
  if (hasStatus && !paid) return null;
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
              className="absolute inset-0 bg-green-100 rounded-full"
            />
            <CheckCircle2 className="w-24 h-24 text-green-500 relative z-10" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-5xl font-black text-[#312821] mb-4"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-500 mb-12 max-w-md leading-relaxed"
        >
          Your sweet treats are now confirmed. We've sent a receipt to your email, and our team is starting to prep your order.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md"
        >
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#312821] text-white rounded-2xl font-bold hover:bg-black transition shadow-lg shadow-stone-200"
          >
            <ShoppingBag className="w-5 h-5" />
            Back to Home
          </Link>

          <Link
            href="/details/flavours"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-100 text-[#312821] rounded-2xl font-bold hover:bg-slate-50 transition shadow-sm"
          >
            Explore More
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 opacity-20 hidden lg:block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-dashed border-[#312821] rounded-full"
          />
        </div>
        <div className="absolute bottom-1/4 right-10 opacity-20 hidden lg:block">
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="w-16 h-16 bg-[#312821] rounded-2xl rotate-12"
          />
        </div>
      </main>
    </div>
  );
}
