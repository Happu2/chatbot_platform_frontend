import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
  }, []);

  const createProject = async () => {
    const res = await api.post("/projects", { name });
    setProjects([...projects, res.data]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>

      <div className="flex gap-2 mb-4">
        <input className="input" placeholder="Project name" onChange={e => setName(e.target.value)} />
        <button className="btn" onClick={createProject}>Create</button>
      </div>

      {projects.map(p => (
        <div key={p.id} onClick={() => navigate(`/chat/${p.id}`)}
          className="p-4 border rounded mb-2 cursor-pointer hover:bg-gray-50">
          {p.name}
        </div>
      ))}
    </div>
  );
}
