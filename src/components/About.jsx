import { content } from "../content";

export default function About() {
  const { about } = content;

  return (
    <section id="about" className="py-32 px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-amber-400 tracking-[0.4em] text-xs mb-4">
            OUR STORY
          </p>
          <h2 className="text-5xl font-serif mb-8 leading-tight">
            {about.title}
            <br />
            <span className="italic">{about.highlight}</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">{about.desc1}</p>
          <p className="text-gray-400 leading-relaxed mb-10">{about.desc2}</p>
          <div className="grid grid-cols-3 gap-8">
            {about.stats.map(({ num, label }) => (
              <div key={label}>
                <p className="text-4xl font-serif text-amber-400 mb-1">{num}</p>
                <p className="text-gray-500 text-xs tracking-widest">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <img
            src={about.image}
            alt="Chef"
            className="w-full h-[600px] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 bg-amber-400 text-black p-6 w-40">
            <p className="text-3xl font-serif font-bold">18</p>
            <p className="text-xs tracking-widest">YEARS OF EXCELLENCE</p>
          </div>
        </div>
      </div>
    </section>
  );
}
