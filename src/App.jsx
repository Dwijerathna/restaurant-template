import { useEffect, useRef, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Hero from "./components/Hero";
import Map from "./components/Map";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Testimonials from "./components/Testimonials";

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 bg-amber-400 text-black w-12 h-12 flex items-center justify-center hover:bg-amber-300 transition-all duration-300 text-xl"
    >
      ↑
    </button>
  ) : null;
}

function FadeIn({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="fade-section">
      {children}
    </div>
  );
}

export default function App() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      <BackToTop />
      <Navbar />
      <Hero />
      <FadeIn>
        <About />
      </FadeIn>
      <FadeIn>
        <Menu />
      </FadeIn>
      <FadeIn>
        <Gallery />
      </FadeIn>
      <FadeIn>
        <Testimonials />
      </FadeIn>
      <FadeIn>
        <Contact />
      </FadeIn>
      <FadeIn>
        <Map />
      </FadeIn>
      <FadeIn>
        <Footer />
      </FadeIn>
    </main>
  );
}
