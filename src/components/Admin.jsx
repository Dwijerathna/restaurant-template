import { useEffect, useState } from "react";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));
  const [reservations, setReservations] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");

  const login = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("username", username);
    form.append("password", password);
    try {
      const res = await fetch("http://127.0.0.1:8000/token", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (data.access_token) {
        localStorage.setItem("admin_token", data.access_token);
        setToken(data.access_token);
        setError("");
      } else {
        setError("Invalid credentials");
      }
    } catch {
      setError("Could not connect to server");
    }
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  const fetchReservations = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/admin/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setReservations(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed to fetch");
    }
  };

  const updateStatus = async (id, status) => {
    await fetch(`http://127.0.0.1:8000/admin/reservations/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    fetchReservations();
  };

  const deleteReservation = async (id) => {
    await fetch(`http://127.0.0.1:8000/admin/reservations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchReservations();
  };

  useEffect(() => {
    if (token) fetchReservations();
  }, [token]);

  const filtered =
    filter === "all"
      ? reservations
      : reservations.filter((r) => r.status === filter);

  if (!token) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        }}
      >
        <div className="bg-white p-12 w-full max-w-md rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <p className="text-amber-500 tracking-[0.4em] text-xs mb-3 font-semibold">
              SAVORIA
            </p>
            <h1 className="text-4xl font-serif mb-2 text-gray-900">
              Admin Panel
            </h1>
            <p className="text-gray-500 text-sm">
              Sign in to manage reservations
            </p>
          </div>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-200 px-6 py-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors rounded-lg bg-gray-50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-200 px-6 py-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors rounded-lg bg-gray-50"
            />
            <button
              onClick={login}
              disabled={loading}
              className="bg-amber-400 text-black py-4 text-xs tracking-widest hover:bg-amber-300 transition-all duration-300 rounded-lg font-semibold"
            >
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-gray-800 px-8 py-6 flex justify-between items-center">
        <div>
          <p className="text-amber-400 tracking-[0.4em] text-xs mb-1">
            SAVORIA
          </p>
          <h1 className="text-2xl font-serif">Reservations</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex gap-6 text-sm">
            <span className="text-gray-400">
              Total:{" "}
              <span className="text-white font-semibold">
                {reservations.length}
              </span>
            </span>
            <span className="text-green-400">
              ✓ {reservations.filter((r) => r.status === "confirmed").length}
            </span>
            <span className="text-yellow-400">
              ◷ {reservations.filter((r) => r.status === "pending").length}
            </span>
            <span className="text-red-400">
              ✕ {reservations.filter((r) => r.status === "rejected").length}
            </span>
          </div>
          <button
            onClick={logout}
            className="border border-gray-700 px-4 py-2 text-xs tracking-widest hover:border-amber-400 hover:text-amber-400 transition-colors"
          >
            LOGOUT
          </button>
        </div>
      </div>

      <div className="px-8 py-4 border-b border-gray-800 flex gap-2">
        {["all", "pending", "confirmed", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 text-xs tracking-widest rounded-full transition-all ${filter === f ? "bg-amber-400 text-black" : "border border-gray-700 text-gray-400 hover:border-gray-500"}`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="p-8">
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-gray-600 text-lg">No reservations found</p>
          </div>
        )}
        <div className="grid gap-4">
          {filtered.map((r) => (
            <div
              key={r.id}
              className={`rounded-xl border p-6 transition-all ${
                r.status === "confirmed"
                  ? "border-green-900 bg-green-950/20"
                  : r.status === "rejected"
                    ? "border-red-900 bg-red-950/20"
                    : "border-gray-800 bg-gray-900/30"
              }`}
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 tracking-widest mb-1">
                      GUEST
                    </p>
                    <p className="font-semibold">{r.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{r.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 tracking-widest mb-1">
                      DATE & TIME
                    </p>
                    <p className="font-semibold">{r.date}</p>
                    <p className="text-xs text-amber-400 mt-1">
                      {r.time || "Time not set"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 tracking-widest mb-1">
                      GUESTS
                    </p>
                    <p className="font-semibold">
                      {r.guests}{" "}
                      {parseInt(r.guests) === 1 ? "person" : "people"}
                    </p>
                  </div>
                  {r.message && (
                    <div>
                      <p className="text-xs text-gray-600 tracking-widest mb-1">
                        NOTE
                      </p>
                      <p className="text-sm text-gray-400">{r.message}</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-2 min-w-[100px]">
                  <span
                    className={`text-xs px-3 py-1 rounded-full text-center font-semibold ${
                      r.status === "confirmed"
                        ? "bg-green-900 text-green-300"
                        : r.status === "rejected"
                          ? "bg-red-900 text-red-300"
                          : "bg-yellow-900 text-yellow-300"
                    }`}
                  >
                    {r.status.toUpperCase()}
                  </span>
                  {r.status !== "confirmed" && (
                    <button
                      onClick={() => updateStatus(r.id, "confirmed")}
                      className="text-xs bg-green-900 text-green-300 px-3 py-2 rounded-lg hover:bg-green-800 transition-colors"
                    >
                      ✓ Confirm
                    </button>
                  )}
                  {r.status !== "rejected" && (
                    <button
                      onClick={() => updateStatus(r.id, "rejected")}
                      className="text-xs bg-red-900 text-red-300 px-3 py-2 rounded-lg hover:bg-red-800 transition-colors"
                    >
                      ✕ Reject
                    </button>
                  )}
                  <button
                    onClick={() => deleteReservation(r.id)}
                    className="text-xs border border-gray-700 text-gray-500 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
