# VidyaSetu

VidyaSetu is a full-stack web application that helps students evaluate study-abroad decisions through AI-powered guidance. It provides structured outputs for future career scenarios, visa-risk assessment, loan/lifestyle comparisons, and SOP generation.

## Tech Stack

- Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS
- Backend: Flask, Flask-CORS
- AI Provider: OpenRouter Chat Completions API
- Runtime: Node.js (frontend), Python 3.10+ (backend)

## Repository Structure

```text
.
├── frontend/                  # Next.js app and API proxy routes
│   ├── app/
│   │   ├── api/               # Proxies to Flask backend
│   │   ├── future-self/
│   │   ├── visa-risk/
│   │   ├── sop-copilot/
│   │   └── ...
│   └── components/
├── backend/                   # Flask app with AI orchestration
│   ├── app.py
│   └── requirements.txt
└── assets/                    # Static assets
```

## System Architecture
<img width="1165" height="2102" alt="vidyasetu_architecture" src="https://github.com/user-attachments/assets/696f4234-3b4f-475a-bf7d-ac0008e3180a" />



## API Flow

- Client pages call local Next.js endpoints (`/api/future-self`, `/api/visa-risk`, `/api/sop`).
- Next.js API routes proxy requests to Flask (`http://127.0.0.1:5000`).
- Flask builds prompts and calls OpenRouter.
- Flask returns JSON responses for analysis endpoints and Server-Sent Events for SOP streaming.

## Local Development Setup

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- Python 3.10 or newer
- pip

### 1) Backend Setup (Flask + OpenRouter)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Set required environment variables:

```bash
export OPENROUTER_API_KEY="your_openrouter_api_key"
export OPENROUTER_MODEL="openai/gpt-4o-mini"
```

Start backend:

```bash
python3 app.py
```

Backend runs on `http://127.0.0.1:5000`.

### 2) Frontend Setup (Next.js)

In a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

## Environment Variables

The backend reads these variables:

- `OPENROUTER_API_KEY` (required): OpenRouter API key
- `OPENROUTER_MODEL` (optional): OpenRouter model ID, default is `openai/gpt-4o-mini`

## Available Backend Endpoints

- `POST /api/future-self`
  - Returns structured career projections and financial comparison data
- `POST /api/visa-risk`
  - Returns a risk score, risk level, red flags, and recommended fixes
- `POST /api/sop`
  - Streams generated SOP text via Server-Sent Events

## Production and Scaling Guidance

### Runtime and Process Management

- Run Flask with Gunicorn (multiple workers) behind a reverse proxy.
- Run Next.js with `next build` and `next start` under a process manager (systemd, PM2, or container orchestrator).
- Use separate process definitions for frontend and backend.

### Network and Routing

- Place both services behind a load balancer or reverse proxy (Nginx, Traefik, or cloud LB).
- Route `/api/*` traffic consistently to the Next.js service if you keep proxy routes in Next.js.
- Restrict direct access to Flask except from trusted network layers.

### Horizontal Scaling

- Scale Next.js instances independently based on concurrent user traffic.
- Scale Flask instances independently based on AI request throughput.
- Keep services stateless to allow autoscaling and rolling deployments.

### Reliability and Security

- Store secrets in a secure secret manager; never commit API keys.
- Add request timeout, retry, and circuit-breaker strategies around OpenRouter calls.
- Add centralized logging, metrics, and distributed tracing for both services.
- Add rate limiting at the API edge to protect upstream model quotas.

### Performance Considerations

- Cache deterministic responses where appropriate.
- Use connection pooling and keep-alive settings for outbound requests.
- Monitor token usage and model latency; tune model selection by endpoint.

## Build Commands

Frontend:

```bash
cd frontend
npm run build
npm run start
```

Backend (example with Gunicorn):

```bash
cd backend
source venv/bin/activate
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## Troubleshooting

- `OpenRouter request failed: Missing OPENROUTER_API_KEY`
  - Set `OPENROUTER_API_KEY` in the same shell session before starting Flask.
- Frontend returns 502/empty data
  - Confirm Flask is running on `127.0.0.1:5000`.
  - Verify OpenRouter key validity and quota.
- SOP streaming does not render
  - Ensure no proxy in front of backend buffers `text/event-stream`.

## Roadmap Suggestions

- Move backend base URL from hardcoded values to environment variables in Next.js API routes.
- Add automated tests for endpoint contracts and streaming behavior.
- Add Dockerfiles and a compose stack for reproducible local and staging environments.
