import { Instagram, Facebook, Music2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-slate-300 border-t border-slate-700 py-10 px-6 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand */}
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} <span className="text-pink-400 font-semibold">TastiePastry</span>. All rights reserved.
        </p>

        {/* Right: Social Icons */}
        <div className="flex space-x-5">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-700 hover:bg-pink-500 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-700 hover:bg-pink-500 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://www.tiktok.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-slate-700 hover:bg-pink-500 hover:text-white transition-colors"
            aria-label="TikTok"
          >
            <Music2 size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
