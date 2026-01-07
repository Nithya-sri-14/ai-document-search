import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/upload", formData);
      setMessages((prev) => [...prev, { sender: "system", text: res.data.message }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "system", text: "Upload failed" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!query) return;
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    setQuery("");

    try {
      setLoading(true);
      const res = await axios.post(`http://127.0.0.1:8000/chat?query=${encodeURIComponent(query)}`);
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.answer }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Error in response" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>AI PDF Chatbot</h1>

      <div style={{ marginBottom: "20px" }}>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={loading || !file}>Upload PDF</button>
      </div>

      <div style={{ border: "1px solid gray", padding: "10px", height: "400px", overflowY: "scroll" }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "10px 0" }}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
        {loading && <div>Loading...</div>}
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={handleSend} disabled={loading || !query}>Send</button>
      </div>
    </div>
  );
}

export default App;

