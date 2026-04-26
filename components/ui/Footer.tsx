import { FaThreads, FaFacebook, FaTiktok, FaInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white text-slate-600 border-t border-slate-100 py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand */}
        <div className="text-center md:text-left">
          <p className="text-lg font-bold text-slate-900 mb-1">TastiePastry</p>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Right: Social Icons */}
        <div className="flex space-x-6">
          <a
            href="https://www.instagram.com/tastiepastry/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-[#312821] hover:text-white transition-all duration-300 shadow-sm"
            aria-label="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.facebook.com/TastiePastry/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-[#312821] hover:text-white transition-all duration-300 shadow-sm"
            aria-label="Facebook"
          >
            <FaFacebook size={20} />
          </a>
          <a
            href="https://www.tiktok.com/@tastiepastry"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-[#312821] hover:text-white transition-all duration-300 shadow-sm"
            aria-label="TikTok"
          >
            <FaTiktok size={20} />
          </a>
          <a
            href="https://www.threads.com/@tastiepastry"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-slate-50 text-slate-600 hover:bg-[#312821] hover:text-white transition-all duration-300 shadow-sm"
            aria-label="Threads"
          >
            <FaThreads size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
