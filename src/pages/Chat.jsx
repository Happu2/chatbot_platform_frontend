import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import MessageBubble from "../components/MessageBubble";

export default function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res = await api.get(`/chat/${id}`);
        setMessages(
          res.data.map((c) => ({
            role: c.role,
            text: c.message,
          }))
        );
      } catch (err) {
        console.error(err);
      }
    };

    fetchChatHistory();
  }, [id]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await api.post("/chat", {
        projectId: id,
        message: userText,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: res.data.reply },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
   <h2 className="text-xl font-bold mb-2">Chatbot</h2>


      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto border rounded p-4 bg-white">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center">
            Start the conversation 👋
          </p>
        )}

        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} text={msg.text} />
        ))}

        {loading && (
          <p className="text-sm text-gray-400 mt-2">AI is typing…</p>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 mt-3">
        <input
          type="text"
          className="input flex-1"
          placeholder="Ask something about ..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          autoFocus
        />
        <button className="btn" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}
