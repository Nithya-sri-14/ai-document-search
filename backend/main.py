from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
import shutil

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_ollama import OllamaLLM
from langchain.chains import ConversationalRetrievalChain
from langchain.memory import ConversationBufferMemory

# -------------------------
# App setup
# -------------------------
app = FastAPI(title="AI Document Search")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------
# Global objects
# -------------------------
VECTOR_DB = None
QA_CHAIN = None

# -------------------------
# Embeddings (FAST & STABLE)
# -------------------------
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# -------------------------
# LLM (OLLAMA)
# -------------------------
llm = OllamaLLM(
    model="mistral",
    temperature=0.1,
    num_predict=256,     # limits response length (faster)
    num_ctx=2048         # smaller context window
)
# -------------------------
# Memory
# -------------------------
from langchain.memory import ConversationBufferWindowMemory

MEMORY = ConversationBufferWindowMemory(
    k=3,  # only last 3 turns kept
    memory_key="chat_history",
    return_messages=True
)
# -------------------------
# Upload PDFs (MULTI FILE)
# -------------------------
@app.post("/upload")
async def upload_pdfs(files: List[UploadFile] = File(...)):
    global VECTOR_DB, QA_CHAIN

    os.makedirs("data", exist_ok=True)

    all_chunks = []

    for file in files:
        file_path = f"data/{file.filename}"

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        loader = PyPDFLoader(file_path)
        documents = loader.load()

        splitter = RecursiveCharacterTextSplitter(
            chunk_size=800,
            chunk_overlap=100
        )

        chunks = splitter.split_documents(documents)
        all_chunks.extend(chunks)

    if VECTOR_DB is None:
        VECTOR_DB = FAISS.from_documents(all_chunks, embeddings)
    else:
        VECTOR_DB.add_documents(all_chunks)

    QA_CHAIN = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=VECTOR_DB.as_retriever(search_kwargs={"k": 2}),
        memory=MEMORY
    )

    return {
        "message": f"{len(files)} PDF(s) uploaded and indexed successfully"
    }

# -------------------------
# Chat Endpoint
# -------------------------
@app.post("/chat")
async def chat(query: str):
    if QA_CHAIN is None:
        return {"answer": "Upload a document first"}

    try:
        result = QA_CHAIN.invoke({"question": query})
        return {"answer": result["answer"]}
    except Exception as e:
        return {"error": str(e)}
