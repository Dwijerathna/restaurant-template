import { useEffect, useRef, useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Menu from "./components/Menu"
import Gallery from "./components/Gallery"
import Testimonials from "./components/Testimonials"
import Contact from "./components/Contact"
import Map from "./components/Map"
import Footer from "./components/Footer"

const themes = {
  gold: "#f59e0b",
  emerald: "#10b981",
  rose: "#f43f5e",
  sky: "#0ea5e9",
  violet: "#8b5cf6",
}

function ThemeSwitcher({ theme, setTheme }) {
  return (
    <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-2">
      {Object.entries(themes).map(([name, color]) => (
        <button
          key={name}
          onClick={() => setTheme(color)}
          style={{ background: color }}
          className="w-6 h-6 rounded-full hover:scale-125 transition-transform duration-200"
          title={name}
        />
      ))}
    </div>
  )
}

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 bg-amber-400 text-black w-12 h-12 flex items-center justify-center hover:bg-amber-300 transition-all duration-300 text-xl"
    >
      ↑
    </button>
  ) : null
}

function FadeIn({ children }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible")
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="fade-section">
      {children}
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState("#f59e0b")

  return (
    <main className="bg-[#0a0a0a] text-white" style={{ "--theme": theme }}>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <BackToTop />
      <Navbar />
      <Hero />
      <FadeIn><About /></FadeIn>
      <FadeIn><Menu /></FadeIn>
      <FadeIn><Gallery /></FadeIn>
      <FadeIn><Testimonials /></FadeIn>
      <FadeIn><Contact /></FadeIn>
      <FadeIn><Map /></FadeIn>
      <FadeIn><Footer /></FadeIn>
    </main>
  )
}