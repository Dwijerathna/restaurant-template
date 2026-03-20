import { useState } from "react";
import { content } from "../content";

export default function Contact() {
  const { contact } = content;
  const [form, setForm] = useState({
    name: "",
    email: "",
    guests: "",
    date: "",
    time: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("Sending:", form);
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-32 px-8 bg-[#111111]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-amber-400 tracking-[0.4em] text-xs mb-4">
            GET IN TOUCH
          </p>
          <h2 className="text-5xl font-serif mb-8 leading-tight">
            Reserve Your <span className="italic">Table</span>
          </h2>
          <div className="flex flex-col gap-6 text-gray-400">
            <div>
              <p className="text-xs tracking-widest text-gray-600 mb-1">
                ADDRESS
              </p>
              <p>{contact.address}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-gray-600 mb-1">
                PHONE
              </p>
              <p>{contact.phone}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-gray-600 mb-1">
                EMAIL
              </p>
              <p>{contact.email}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest text-gray-600 mb-1">
                HOURS
              </p>
              <p>{contact.hours.weekday}</p>
              <p>{contact.hours.weekend}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="bg-transparent border border-gray-800 px-6 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="bg-transparent border border-gray-800 px-6 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <input
            type="text"
            placeholder="Number of Guests"
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="bg-transparent border border-gray-800 px-6 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
          />
          <div className="grid grid-cols-3 gap-2">
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-transparent border border-gray-800 px-4 py-4 text-sm text-gray-600 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <select
              value={form.time.split(":")[0] || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  time: `${e.target.value}:${form.time.split(":")[1] || "00"}`,
                })
              }
              className="bg-[#111111] border border-gray-800 px-4 py-4 text-sm text-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
            >
              <option value="">Hour</option>
              {Array.from({ length: 11 }, (_, i) => i + 12).map((h) => (
                <option key={h} value={String(h).padStart(2, "0")}>
                  {h > 12 ? `${h - 12} PM` : `12 PM`}
                </option>
              ))}
            </select>
            <select
              value={form.time.split(":")[1] || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  time: `${form.time.split(":")[0] || "12"}:${e.target.value}`,
                })
              }
              className="bg-[#111111] border border-gray-800 px-4 py-4 text-sm text-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
            >
              <option value="">Min</option>
              <option value="00">:00</option>
              <option value="15">:15</option>
              <option value="30">:30</option>
              <option value="45">:45</option>
            </select>
          </div>

          <textarea
            placeholder="Special Requests"
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="bg-transparent border border-gray-800 px-6 py-4 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 transition-colors resize-none"
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-amber-400 text-black py-4 text-xs tracking-widest hover:bg-amber-300 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "SENDING..." : "RESERVE TABLE"}
          </button>
          {status === "success" && (
            <div className="text-center py-8 px-4 border border-gray-800 rounded-xl">
              <div className="text-amber-400 text-4xl mb-4">✓</div>
              <h3 className="font-serif text-2xl mb-2">
                Reservation Received!
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Thank you! We'll confirm your reservation shortly via email.
              </p>
              <button
                onClick={() => setStatus(null)}
                className="text-xs tracking-widest border border-gray-700 px-6 py-3 hover:border-amber-400 hover:text-amber-400 transition-colors"
              >
                MAKE ANOTHER RESERVATION
              </button>
            </div>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm text-center">
              Something went wrong. Please try again.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
