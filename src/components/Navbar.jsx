import { useEffect, useState } from "react";
import { content } from "../content";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center transition-all duration-300 border-b border-gray-800 ${scrolled ? "bg-black" : "bg-transparent"}`}
    >
      <div className="text-2xl font-serif tracking-widest text-amber-400">
        {content.restaurant.name}
      </div>
      <div className="hidden md:flex gap-10 text-sm tracking-widest text-gray-300">
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
      <button className="hidden md:block border border-amber-400 text-amber-400 px-6 py-2 text-xs tracking-widest hover:bg-amber-400 hover:text-black transition-all duration-300">
        RESERVE
      </button>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white text-2xl"
      >
        ☰
      </button>
      {open && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col items-center gap-6 py-8 text-sm tracking-widest">
          <a
            href="#about"
            onClick={() => setOpen(false)}
            className="hover:text-amber-400"
          >
            ABOUT
          </a>
          <a
            href="#menu"
            onClick={() => setOpen(false)}
            className="hover:text-amber-400"
          >
            MENU
          </a>
          <a
            href="#gallery"
            onClick={() => setOpen(false)}
            className="hover:text-amber-400"
          >
            GALLERY
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="hover:text-amber-400"
          >
            CONTACT
          </a>
        </div>
      )}
    </nav>
  );
}
