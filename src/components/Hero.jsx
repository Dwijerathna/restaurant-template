import { content } from "../content";

export default function Hero() {
  const { restaurant } = content;

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0a0a0a] z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')",
        }}
      />
      <div className="relative z-20 text-center px-6">
        <p className="text-amber-400 tracking-[0.5em] text-xs mb-6">
          {restaurant.tagline}
        </p>
        <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight">
          {restaurant.hero.title}
          <br />
          <span className="italic text-amber-400">
            {restaurant.hero.highlight}
          </span>
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-md mx-auto">
          {restaurant.hero.desc}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="bg-amber-400 text-black px-8 py-4 text-xs tracking-widest hover:bg-amber-300 transition-all duration-300"
          >
            EXPLORE MENU
          </a>
          <a
            href="#contact"
            className="border border-white text-white px-8 py-4 text-xs tracking-widest hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
          >
            RESERVE TABLE
          </a>
        </div>
      </div>
      <div className="absolute bottom-10 z-20 flex flex-col items-center gap-2">
        <p className="text-gray-500 text-xs tracking-widest">SCROLL</p>
        <div className="w-px h-16 bg-gradient-to-b from-amber-400 to-transparent" />
      </div>
    </section>
  );
}
