import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chatResponse, setChatResponse] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  // Upload files to FastAPI backend
  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      alert(data.message || data.error);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  // Ask question
  const handleAsk = async () => {
    if (!query) return;
    setLoading(true);
    setChatResponse("");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/chat?query=${encodeURIComponent(query)}`,
        { method: "POST" }
      );
      const data = await response.json();
      setChatResponse(data.answer || data.error || "No response");
    } catch (err) {
      console.error(err);
      setChatResponse("Error fetching response");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1>AI PDF Chatbot</h1>

      <div className="upload-section">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="file-input"
        />
        <button onClick={handleUpload} className="upload-btn">
          Upload PDFs
        </button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="file-list">
          <h3>Files Selected:</h3>
          <ul>
            {selectedFiles.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="chat-section">
        <input
          type="text"
          placeholder="Ask something about your PDFs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="chat-input"
        />
        <button onClick={handleAsk} className="ask-btn">
          Ask
        </button>

        <div className="chat-response">
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Generating answer...</p>
            </div>
          ) : (
            chatResponse && <p>{chatResponse}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
