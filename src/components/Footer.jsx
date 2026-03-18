import { content } from "../content";

export default function Footer() {
  return (
    <footer className="py-16 px-8 border-t border-gray-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-3xl font-serif tracking-widest text-amber-400">
          {content.restaurant.name}
        </div>
        <div className="flex gap-10 text-xs tracking-widest text-gray-500">
          <a href="#about" className="hover:text-amber-400 transition-colors">
            ABOUT
          </a>
          <a href="#menu" className="hover:text-amber-400 transition-colors">
            MENU
          </a>
          <a href="#gallery" className="hover:text-amber-400 transition-colors">
            GALLERY
          </a>
          <a href="#contact" className="hover:text-amber-400 transition-colors">
            CONTACT
          </a>
        </div>
        <p className="text-gray-600 text-xs tracking-widest">
          © 2026 {content.restaurant.name}. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
