<h1>
  <img src="./frontend/app/favicon.ico" width="32" height="32" style="vertical-align: middle;" alt="Crux Logo" />
  CRUX — The Intellectual Arena
</h1>

> *One claim. One arena. No neutral ground.*

CRUX is an AI-powered debate platform where statements are judged before they reach the arena. The AI decides if your claim has enough tension to become a live argument — then scores every comment, updates both sides' analysis in real time, and shifts win probability as the debate evolves.

---

## What Makes It Different

- **AI Gatekeeping** — Every submitted statement is evaluated for controversy potential, logical viability, and debate merit. Weak claims don't survive.
- **Live Analysis** — Both sides of every argument have a continuously updated AI analysis that evolves as users post comments.
- **Logic Scoring** — Every comment is scored 4–8 based on novelty, reasoning quality, and argumentative strength. Scores update your global Logic Score.
- **Abuse Detection** — Comments are screened for English and Hindi abuse before posting. Violations deduct from your Logic Score.
- **Win Probability** — Once both sides have at least one comment, the AI calculates a live probability split based on argument quality.
- **Debater Profiles** — Your intellectual identity is inferred from your argument history. Not what you argued — how you think.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, TypeScript, Tailwind CSS v4 |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| AI | Groq API (LLaMA + GPT OSS) |
| Auth | JWT (Access and Refresh tokens) |
| Containerization | Docker + Docker Compose |

---

## Project Structure

```
crux/
├── frontend/               # Next.js app
│   ├── app/
│   │   ├── _components/
│   │   ├── _hooks/
│   │   ├── _types/
│   │   ├── (auth)/
│   │   ├── about/
│   │   ├── archive/
│   │   ├── argument/
│   │   ├── leaderboard/
│   │   ├── profile/
│   │   ├── rules/
│   │   └── statement/
│   └── ...
├── backend/                # Express API
│   ├── src/
│   │   ├── ai/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── db/
│   │   ├── lib/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   └── types/
│   └── ...
└── docker-compose.yml
```

---

## Developer Setup

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- A [Groq API key](https://console.groq.com/) (free tier available)

---

### 1. Clone the Repository

```bash
git clone https://github.com/Nitesh-Kumar-7557/crux
cd crux
```

---

### 2. Environment Variables

Rename `pgadmin.example.env` to `pgadmin.env` and replace email password of your choice.

Rename `.env.example` file in both `frontend/` and `backend/` directories to `.env`

and add your Groq api key inside `backend/.env`

---

### 3. Run the Stack

```bash
docker compose -f docker-compose.dev.yml up -d
```

This will ->  Start a PostgreSQL instance on port `5432` and PgAdmin on port `5051`

```bash
cd backend
```
```bash
npm run db-init  
# if this shows error, then it's already ran, skip it!
```

This will ->  Migrate the tables and seed the data into the database.

```bash
npm run dev
```

This will ->  Start the Express backend on port `8000`

Now on a new terminal window

```bash
cd frontend && npm run dev
```

This will ->  Start the Next.js frontend on port `3000`


---

### 4. Open the App

```
http://localhost:3000
```

---

### Stopping the Stack

```bash
docker compose -f docker-compose.dev.yml down
```

To also remove the database volume (full reset):

```bash
docker compose -f docker-compose.dev.yml down -v
```

---

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/profile/:id` | Get profile data with ID |
| `POST` | `/ai/statement` | Check eligibility of a statement |
| `POST` | `/like` | Post like on a comment |
| `POST` | `/negative/:id` | Post negative comment of a argument with ID |
| `POST` | `/affirmative/:id` | Post affirmative comment of a argument with ID |
| `GET` | `/comment/:id` | Get comments of a argument with ID |
| `GET` | `/argument/:id` | Get argument by ID |
| `POST` | `/argument` | Post a new argument |
| `POST` | `/user/refresh` | Generate a new Access token |
| `POST` | `/user/register` | Register a new user |
| `POST` | `/user/login` | Login |

---

## AI Functionality

| Function | Model | Trigger |
|----------|-------|---------|
| Statement eligibility check | Gpt OSS | On statement eligiblity check |
| Initial Crux AI analysis | Gpt OSS | On statement broadcast |
| User description generation | Gpt OSS | After each new argument posted |
| Comment abuse detection | Gpt OSS | Before every comment post |
| Comment scoring + analysis update | Gpt OSS | After every valid comment |
| Win probability update | Gpt OSS | After analysis updation |

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'add: your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

MIT License — see [LICENSE](./LICENSE) for details.

---

<p align="center">
  <strong>CRUX DIGITAL ARENA</strong><br/>
  <em>Where arguments are decided.</em>
</p>