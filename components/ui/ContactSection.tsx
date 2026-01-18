"use client"
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    
    <section id="contact" className="bg-slate-900 text-slate-100 py-20 px-8">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg"
        >
            {/* Left: Text Info */}
            <div>
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-slate-300 mb-8">
                Have a question, custom order, or collaboration idea?  
                Drop us a message and we will get back to you soon!
            </p>
            
            <div className="space-y-4">
                <p>
                📍 <span className="font-medium">TastiePastry HQ</span><br/>
                    LOT PT 8216-A, TINGKAT BAWAH JALAN KUALA BERANG, MUKIM BUKIT PAYONG, 21400 Marang, Terengganu
                </p>
                <p>📞 <a href="tel:+6012XXXXXXX" className="hover:underline">+60 12-XXX XXXX</a></p>
                <p>📧 <a href="mailto:hello@tastiepastry.com" className="hover:underline">hello.tastiepastry@gmail.com</a></p>
                <p>
                💬 <a href="https://wa.me/601XXXXXXX" className="hover:underline" target="_blank" rel="noopener noreferrer">
                    Chat on WhatsApp
                </a>
                </p>
            </div>
            </div>
        </motion.div>

        {/* Right side text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-slate-700"
        >
            {/* Right: Contact Form */}
            <form className="bg-slate-800 p-8 rounded-2xl shadow-lg space-y-6">
            <div>
                <label className="block text-sm font-medium mb-2 text-white">Name</label>
                <input
                type="text"
                className="w-full rounded-lg p-3 bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Your name"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2 text-white">Email</label>
                <input
                type="email"
                className="w-full rounded-lg p-3 bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="your@email.com"
                required
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2 text-white">Message</label>
                <textarea
                className="w-full rounded-lg p-3 bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Type your message..."
                required
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 rounded-lg transition"
            >
                Send Message
            </button>
            </form>
        </motion.div>
    </div>
    </section>
  );
}