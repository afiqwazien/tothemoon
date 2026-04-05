"use client"
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    
    <section id="contact" className="bg-white py-24 px-8 border-t border-slate-100/50">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative px-6"
        >
            {/* Left: Text Info */}
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Get in Touch</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                  Have a question, custom order, or collaboration idea?  
                  Drop us a message and we will get back to you soon!
              </p>
              
              <div className="space-y-6 pt-4">
                  <div className="flex items-start gap-4 text-slate-700">
                    <span className="text-2xl">📍</span>
                    <p>
                        <span className="font-bold text-slate-900">TastiePastry HQ</span><br/>
                        LOT PT 8216-A, TINGKAT BAWAH JALAN KUALA BERANG, BUKIT PAYONG, 21400 Marang, Terengganu
                    </p>
                  </div>
                  <p className="flex items-center gap-4 text-slate-700">
                    <span className="text-2xl">📞</span>
                    <a href="tel:+6012XXXXXXX" className="hover:text-[#312821] transition">+60 12-XXX XXXX</a>
                  </p>
                  <p className="flex items-center gap-4 text-slate-700">
                    <span className="text-2xl">📧</span>
                    <a href="mailto:hello@tastiepastry.com" className="hover:text-[#312821] transition">hello.tastiepastry@gmail.com</a>
                  </p>
                  <p className="flex items-center gap-4 text-slate-700">
                    <span className="text-2xl">💬</span>
                    <a href="https://wa.me/601XXXXXXX" className="hover:text-[#312821] font-semibold transition" target="_blank" rel="noopener noreferrer">
                        Chat on WhatsApp
                    </a>
                  </p>
              </div>
            </div>
        </motion.div>

        {/* Right side contact form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
            <form className="bg-slate-50 p-10 rounded-3xl shadow-xl border border-slate-100/50 space-y-6">
            <div>
                <label className="block text-sm font-bold mb-2 text-slate-900">Name</label>
                <input
                type="text"
                className="w-full rounded-xl p-4 bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#312821]/20 shadow-sm"
                placeholder="Your name"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-bold mb-2 text-slate-900">Email</label>
                <input
                type="email"
                className="w-full rounded-xl p-4 bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#312821]/20 shadow-sm"
                placeholder="your@email.com"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-bold mb-2 text-slate-900">Message</label>
                <textarea
                className="w-full rounded-xl p-4 bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#312821]/20 shadow-sm min-h-[120px]"
                placeholder="Type your message..."
                required
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full bg-[#312821] hover:bg-[#1A1512] text-white font-bold py-4 rounded-xl transition shadow-lg transform hover:scale-[1.02]"
            >
                Send Message
            </button>
            </form>
        </motion.div>
    </div>
    </section>
  );
}