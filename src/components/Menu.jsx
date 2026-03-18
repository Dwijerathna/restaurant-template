import { useState } from "react";
import { content } from "../content";

export default function Menu() {
  const [active, setActive] = useState(0);
  const menuCategories = content.menu;

  return (
    <section id="menu" className="py-32 px-8 bg-[#111111]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 tracking-[0.4em] text-xs mb-4">
            CULINARY CREATIONS
          </p>
          <h2 className="text-5xl font-serif leading-tight">
            Our <span className="italic">Menu</span>
          </h2>
        </div>

        <div className="flex justify-center gap-8 mb-16">
          {menuCategories.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActive(i)}
              className={`text-xs tracking-widest pb-3 border-b-2 transition-all duration-300 ${
                active === i
                  ? "border-amber-400 text-amber-400"
                  : "border-transparent text-gray-500 hover:text-white"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {menuCategories.map((section) => (
              <div
                key={section.category}
                className="min-w-full flex flex-col gap-8"
              >
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col sm:flex-row justify-between items-start group border-b border-gray-800 pb-8 gap-2"
                  >
                    <div>
                      <h3 className="font-serif text-2xl mb-2 group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                    <p className="text-amber-400 font-mono text-sm ml-8 whitespace-nowrap">
                      {item.price}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {menuCategories.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${active === i ? "bg-amber-400 w-8" : "bg-gray-600"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
