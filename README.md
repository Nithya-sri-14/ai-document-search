📄 AI Document Search & Chat Application
An AI-powered web application that allows users to upload PDF documents and ask questions about their content using local LLMs (Ollama). The system uses FastAPI for backend, React for frontend, and vector search (embeddings) for accurate document-based answers.
🚀 Features
📤 Upload single or multiple PDF documents
🧠 Ask natural language questions about uploaded PDFs
🔍 Context-aware answers using RAG (Retrieval Augmented Generation)
⚡ Runs locally (no API key required)
🎨 Clean and interactive React UI
🔄 Real-time loading indicator while answers are generated
🛠️ Tech Stack
Frontend
React.js
CSS (custom styling)
Fetch API
Backend
FastAPI
LangChain
FAISS (vector database)
HuggingFace Embeddings
Ollama (local LLM)
AI / ML
Local LLMs via Ollama
Text embeddings for semantic search
PDF text extraction
📂 Project Structure
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
⚙️ How It Works (Flow)
User uploads PDF(s) from the React UI
Backend extracts text from PDFs
Text is split into chunks
Embeddings are generated
Embeddings are stored in FAISS
User asks a question
Relevant chunks are retrieved
Ollama LLM generates an answer using context
Answer is sent back to frontend
🧪 API Endpoints (Backend)
📤 Upload PDF
POST /upload
Accepts PDF file(s)
Indexes and stores document embeddings
💬 Chat with Documents
POST /chat?query=your_question
Returns AI-generated answer based on uploaded PDFs
▶️ How to Run the Project Locally
1️⃣ Start Ollama (Terminal 2)
ollama serve
Make sure a model is available:
ollama pull mistral
2️⃣ Start Backend (Terminal 1)
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
Backend runs at:
http://127.0.0.1:8000
Swagger UI:
http://127.0.0.1:8000/docs
3️⃣ Start Frontend (Terminal 3)
cd frontend
npm install
npm start
Frontend runs at:
http://localhost:3000
🖥️ User Interface Features
📁 File upload section
📋 Uploaded files list
💬 Chat input box
⏳ Loading indicator while AI generates response
🎨 Modern color-styled buttons and layout
⚡ Performance Optimizations Used
Local LLM (no network latency)
FAISS vector search for fast retrieval
Chunking documents to reduce prompt size
Cached embeddings after upload
🔐 API Key Requirement
❌ No API key required
✔️ Fully local AI using Ollama
📌 Use Cases
Academic document analysis
Question answering from study materials
Research paper understanding
Internal document search
AI-assisted learning
🧩 Future Enhancements
Authentication (login/signup)
Chat history storage
File deletion option
Support for DOCX and TXT
Deployment with Docker
Mobile app version
👩‍💻 Author
Nithya Sri A
Technology Enthusiast | AI & Web Development
⭐ GitHub
If you like this project, don’t forget to ⭐ the repository!
