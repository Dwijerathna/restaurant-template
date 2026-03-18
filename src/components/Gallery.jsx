import { content } from "../content";

export default function Gallery() {
  const { gallery } = content;

  return (
    <section id="gallery" className="py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 tracking-[0.4em] text-xs mb-4">
            VISUAL FEAST
          </p>
          <h2 className="text-5xl font-serif leading-tight">
            Our <span className="italic">Gallery</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((src, i) => (
            <div key={i} className="overflow-hidden group">
              <img
                src={src}
                alt={`dish ${i + 1}`}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
