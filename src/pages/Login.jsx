import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    navigate("/projects");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded w-96 shadow">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="input mt-2" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn mt-4 w-full">Login</button>
      </form>
    </div>
  );
}
