import { content } from "../content";

export default function Testimonials() {
  const { testimonials } = content;

  return (
    <section className="py-32 px-8 bg-[#111111]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 tracking-[0.4em] text-xs mb-4">
            WHAT THEY SAY
          </p>
          <h2 className="text-5xl font-serif leading-tight">
            Guest <span className="italic">Reviews</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="border border-gray-800 p-8 hover:border-amber-400 transition-all duration-300 group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i} className="text-amber-400 text-sm">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-8 italic">
                "{t.text}"
              </p>
              <div>
                <p className="font-serif text-lg group-hover:text-amber-400 transition-colors">
                  {t.name}
                </p>
                <p className="text-gray-600 text-xs tracking-widest mt-1">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
