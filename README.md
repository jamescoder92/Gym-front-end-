# Fitness 360 — Frontend

The React single-page application for **Fitness 360**, a gym management platform. Members can register, log in, browse and book classes, track workouts and progress, and manage their membership plan.

**Live app:** https://gym-front-end-beryl.vercel.app
**Backend repo:** https://github.com/jamescoder92/Gym-back-end

---

## Tech Stack

- **Library:** React (Create React App)
- **Routing:** React Router
- **API communication:** Native `fetch` via a shared API helper (`src/api/api.js`)
- **Auth:** JWT stored in `localStorage`, attached to requests via `Authorization: Bearer <token>`
- **Deployment:** Vercel

---

## Features

- Public pages: Home, Login, Register, Reset Password
- Protected pages (require login): Dashboard, Classes, Progress, Membership, Profile
- Conditional navbar based on auth state
- JWT-based session handling
- Password reset flow connected to the backend's token-based reset endpoints
- Global design system: dark background, lime-green accent, Exo 2 / DM Sans typography, glassmorphism cards

---

## Project Structure

```
src/
├── api/
│   └── api.js          # Shared fetch helper (adds JWT, base URL)
├── components/
│   └── Navbar.js
├── context/             # Auth/session context (if applicable)
├── pages/
│   ├── Home.js
│   ├── Login.js
│   ├── Register.js
│   ├── ResetPassword.js
│   ├── Dashboard.js
│   ├── Classes.js
│   ├── Progress.js
│   ├── Membership.js
│   └── Profile.js
├── App.js
└── index.js
```

---

## Local Setup

```bash
git clone https://github.com/jamescoder92/Gym-front-end.git
cd Gym-front-end
npm install
npm start                # runs on http://localhost:3000
```

### Environment Variables

The API base URL is currently set directly in `src/api/api.js`. For local development against a local backend, point it at `http://127.0.0.1:5000`; for production it should point at the deployed backend URL (`https://gym-back-end-afqm.onrender.com`).

If migrated to environment variables, create a `.env` file:

```
REACT_APP_API_URL=http://127.0.0.1:5000
```

---

## Deployment

The app auto-deploys to Vercel on push to `main`. Build command: `npm run build`. Output directory: `build`.

---

## Author

Built by **[jamescoder92](https://github.com/jamescoder92)** as a capstone project for Moringa School.

## License

MIT — see [LICENSE](LICENSE) for details.