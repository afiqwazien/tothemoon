"use client"
import { motion } from "framer-motion";
import { FaThreads, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa6";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-white py-24 px-4 md:px-8 border-t border-slate-100/50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Left: Get in Touch heading + form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative px-0 md:px-6"
        >
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">Get in Touch</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Have a question, custom order, or collaboration idea?{" "}
              Drop us a message and we will get back to you soon!
            </p>
          </div>

          <form className="mt-10 bg-slate-50 p-10 rounded-3xl shadow-xl border border-slate-100/50 space-y-6">
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

        {/* Right: Contact info cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="space-y-6 px-0 md:px-6 pt-4 md:pt-2"
        >
          {/* Contact */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-900">Contact</h3>
            <div className="flex items-start gap-3 text-[15px] text-slate-700">
              <span className="mt-0.5 text-slate-400">📍</span>
              <p>Lot PT 8216-A, Tingkat Bawah, Jalan Kuala Berang, Mukim Bukit Payong, 21400, Marang, Terengganu</p>
            </div>
            <div className="flex items-center gap-3 text-[15px] text-slate-700">
              <span className="text-slate-400">📞</span>
              <a href="tel:+60136305766" className="hover:text-[#312821] transition font-medium">013 630 5766</a>
            </div>
            <div className="flex items-center gap-3 text-[15px] text-slate-700">
              <span className="text-slate-400">✉️</span>
              <a href="mailto:hello.tastiepastry@gmail.com" className="hover:text-[#312821] transition font-medium">hello.tastiepastry@gmail.com</a>
            </div>
          </div>

          {/* Studio Operation Hours */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-900">Studio Operation <em>Hours</em></h3>
            <div className="grid grid-cols-2 gap-4 text-[15px]">
              <div>
                <p className="font-bold text-slate-900">Friday</p>
                <p className="font-black text-[#312821]">CLOSED</p>
              </div>
              <div>
                <p className="font-bold text-slate-900">Every Other Day</p>
                <p className="text-slate-700">9.30 am to 5 pm</p>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="text-2xl font-extrabold text-slate-900">Social <em>Media</em></h3>
            <div className="grid grid-cols-2 gap-4 text-[15px] text-slate-700 font-medium">
              <a href="https://www.facebook.com/TastiePastry/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#312821] transition">
                <FaFacebook size={18} /> Facebook
              </a>
              <a href="https://www.tiktok.com/@tastiepastry" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#312821] transition">
                <FaTiktok size={18} /> Tik Tok
              </a>
              <a href="https://www.instagram.com/tastiepastry/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#312821] transition">
                <FaInstagram size={18} /> Instagram
              </a>
              <a href="https://www.threads.com/@tastiepastry" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#312821] transition">
                <FaThreads size={18} /> Threads
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}