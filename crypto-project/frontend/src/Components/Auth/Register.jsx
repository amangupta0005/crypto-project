// src/Components/Auth/Register.jsx
import { useState } from "react";
import API from "../../Api";

export default function Register({ setActivePage }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setMsg("? Registered successfully!");
      setTimeout(() => window.location.reload(), 1000);
    } catch (err) {
      console.error("Registration error:", err);
      setMsg(err.response?.data?.msg || err.response?.data?.message || "? Error occurred");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-white mb-6 tracking-wide">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="?? Username"
          className="w-full mb-4 px-4 py-3 bg-gray-900/70 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="email"
          placeholder="?? Email"
          className="w-full mb-4 px-4 py-3 bg-gray-900/70 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="?? Password"
          className="w-full mb-6 px-4 py-3 bg-gray-900/70 text-white border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all duration-300">
          Register ??
        </button>

        {msg && (
          <p
            className={`mt-4 text-center font-medium ${
              msg.includes("success") ? "text-green-400" : "text-red-400"
            }`}
          >
            {msg}
          </p>
        )}

        <p className="mt-6 text-gray-400 text-sm text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setActivePage("login")}
            className="text-blue-400 hover:underline bg-transparent border-none cursor-pointer p-0"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}
