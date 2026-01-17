import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", { email, password });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="w-96 p-6 bg-white shadow">
        <h2 className="text-xl mb-4">Register</h2>
        <input className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="input mt-2" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn mt-4 w-full">Register</button>
      </form>
    </div>
  );
}
