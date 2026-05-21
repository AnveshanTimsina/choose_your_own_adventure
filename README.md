# Choose Your Own Adventure - AI Story Generator

An AI-powered "Choose Your Own Adventure" game engine that dynamically generates complex, branching narratives based on user-provided themes.

> **🚧 Project Status: Backend Core Complete | Frontend in Progress**
> The backend architecture and AI generation pipeline are fully implemented. The frontend UI (to be built with **React**) is currently under development.

## 🌟 Project Overview

This project serves as a dynamic story engine where users input a theme, and the AI crafts a multi-layered, interactive branching story graph. Players can navigate through different nodes, make choices with distinct consequences, and encounter unique endings (both winning and losing).

## 🏗️ Architecture & Tech Stack

### Backend (Core Highlight)

The backend is built with modern Python technologies, focusing on high performance, reliable AI integration, and robust data integrity. This serves as the powerhouse for the narrative engine.

- **Framework:** **FastAPI** for providing high-performance, fully typed REST API endpoints.
- **AI/LLM Integration:** **LangChain** coupled with **Google Gemini (gemini-3.5-flash)** to orchestrate complex recursive prompts and generate the structured story graphs.
- **Database Engine:** **PostgreSQL** integration configured via **SQLAlchemy** (ORM) and `psycopg2`.
- **Data Validation Elements:** Strict schema validation, robust environment configuration, and structured LLM output parsing via **Pydantic** (`PydanticOutputParser`).
- **Asynchronous Jobs:** Built-in polling/job tracking architecture (`StoryJob`) to manage long-running LLM story generation tasks seamlessly, ensuring non-blocking API interactions.

### Frontend (Upcoming)

- The frontend will be built using **React**. It will consume the FastAPI endpoints to render an immersive, interactive interface for users to navigate their customized stories conditionally node-by-node.

## 📂 Project Structure

```text
choose_your_own_adventure/
├── backend/                  # API Engine & Generative AI Pipeline
│   ├── core/                 # Langchain setups, prompt tuning, and Story Generation logic
│   ├── db/                   # Database connection and deployment configs
│   ├── models/               # SQLAlchemy ORM Models (Story, StoryNode, StoryJob)
│   ├── routers/              # FastAPI route controllers / web-handlers
│   ├── schemas/              # Pydantic Data schemas for IO validation
│   ├── main.py               # FastAPI application entry runner
│   └── pyproject.toml        # Environment, dependencies, and configuration
└── frontend/                 # React UI Workspace (Under Construction)
```

## 🚀 Getting Started (Backend)

To run the backend engine locally:

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Activate the Virtual Environment & Install Dependencies:**
   _(Ensure you have Python >=3.13 installed)_

   ```bash
   source .venv/bin/activate
   pip install -r requirements.txt  # Or pip install the dependencies listed in pyproject.toml
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the `backend` directory and add your credentials:

   ```env
   GEMINI_API_KEY="your_google_gemini_api_key_here"
   # Add your DB strings/settings as needed
   ```

4. **Run the API Server:**

   ```bash
   uvicorn main:app --reload
   ```

5. **Interact with the API Docs:**
   Access the interactive Swagger UI natively provided by FastAPI at `http://localhost:8000/docs` to test job polling and story generation.

## 🗺️ Development Roadmap

- [x] Design relational database schema for highly-nested branching stories.
- [x] Integrate LangChain & Gemini 3.5 Flash for dynamic structured JSON generation.
- [x] Build robust FastAPI endpoints for node expansion and job status tracking.
- [ ] Initialize and set up the React frontend workspace.
- [ ] Build the interactive UI flow for reading and choosing story paths.
- [ ] Add player state/session management.

---

_Created as a comprehensive portfolio piece showcasing complex backend system design, generative AI integration using LangChain, and modern web application architecture._
