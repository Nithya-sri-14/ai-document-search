<img width="2880" height="1800" alt="image" src="https://github.com/user-attachments/assets/0b651e39-c8ae-47a3-bfa1-e9485956a499" />
# 📄 AI Document Search & Chat Application

An **AI-powered web application** that allows users to upload PDF documents and ask questions about their content using **local Large Language Models (LLMs)** via **Ollama**.
The system uses **FastAPI** for the backend, **React** for the frontend, and **vector search (FAISS + embeddings)** to generate accurate, context-aware answers using **RAG (Retrieval Augmented Generation)**.

---

## 🚀 Features

* 📤 Upload single or multiple PDF documents
* 🧠 Ask natural language questions about uploaded PDFs
* 🔍 Context-aware answers using **RAG (Retrieval Augmented Generation)**
* ⚡ Runs completely **locally** (no API key required)
* 🎨 Clean and interactive **React UI**
* 🔄 Real-time loading indicator while responses are generated

---

## 🛠️ Tech Stack

### Frontend

* React.js
* CSS (custom styling)
* Fetch API

### Backend

* FastAPI
* LangChain
* FAISS (Vector Database)
* HuggingFace Embeddings
* Ollama (Local LLM runtime)

### AI / ML

* Local LLMs via Ollama
* Text embeddings for semantic search
* PDF text extraction

---

## 📂 Project Structure

```
ai-document-search/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── .gitignore
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ How It Works (Application Flow)

1. User uploads PDF(s) from the React UI
2. Backend extracts text from PDFs
3. Text is split into smaller chunks
4. Embeddings are generated for each chunk
5. Embeddings are stored in **FAISS**
6. User asks a question
7. Relevant chunks are retrieved using vector search
8. **Ollama LLM** generates an answer using retrieved context
9. Answer is returned to the frontend

---

## 🧪 API Endpoints (Backend)

### 📤 Upload PDF

**POST** `/upload`

* Accepts one or multiple PDF files
* Extracts text and indexes document embeddings

### 💬 Chat with Documents

**POST** `/chat?query=your_question`

* Returns AI-generated answers based on uploaded PDFs

---

## ▶️ How to Run the Project Locally

### 1️⃣ Start Ollama (Terminal 2)

```bash
ollama serve
```

Ensure a model is available:

```bash
ollama pull mistral
```

---

### 2️⃣ Start Backend (Terminal 1)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

**Backend URL:**

```
http://127.0.0.1:8000
```

**Swagger API Docs:**

```
http://127.0.0.1:8000/docs
```

---

### 3️⃣ Start Frontend (Terminal 3)

```bash
cd frontend
npm install
npm start
```

**Frontend URL:**

```
http://localhost:3000
```

---

## 🖥️ User Interface Features

* 📁 PDF file upload section
* 📋 Uploaded files list
* 💬 Chat input box
* ⏳ Loading indicator during AI response generation
* 🎨 Modern UI with styled buttons and layout

---

## ⚡ Performance Optimizations

* Local LLM execution (no network latency)
* FAISS vector search for fast retrieval
* Document chunking to reduce prompt size
* Cached embeddings after upload

---

## 🔐 API Key Requirement

* ❌ No API key required
* ✔️ Fully local AI using **Ollama**

---

## 📌 Use Cases

* Academic document analysis
* Question answering from study materials
* Research paper understanding
* Internal document search
* AI-assisted learning

---

## 🧩 Future Enhancements

* Authentication (login/signup)
* Chat history storage
* File deletion option
* Support for DOCX and TXT files
* Docker-based deployment
* Mobile application version

---

## 👩‍💻 Author

**Nithya Sri A**
Technology Enthusiast | AI & Web Development

---

## ⭐ GitHub

If you like this project, don’t forget to ⭐ star the repository!
