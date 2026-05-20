# IdeaFlow 💡

A full-stack startup idea sharing platform where users can discover, share, and engage with innovative startup ideas. Built with Next.js and Express.js.

---

## Overview

IdeaFlow is a community-driven platform that allows entrepreneurs, developers, and innovators to share their startup ideas with the world. Users can like, comment, and engage with ideas across various categories including FinTech, EdTech, HealthTech, and more.

---

## Features

### Core Features

- **Idea Feed** — Browse all startup ideas with search, filter by category, and sort by newest or oldest
- **Search with Suggestions** — Real-time autocomplete suggestions as you type, powered by MongoDB regex matching
- **Idea Details** — Full idea page with problem statement, proposed solution, target audience, budget, and tags
- **Add Idea** — Submit your own startup idea with detailed information
- **Update Idea** — Edit and update your existing ideas
- **Delete Idea** — Remove your ideas with a confirmation dialog

### Authentication

- Google OAuth login via Better Auth
- Session-based authentication with JWT verification
- Protected routes for authenticated users only

### Comments

- Post comments on any idea
- Reply to comments (nested one level deep)
- Edit your own comments inline
- Delete your own comments
- Like comments
- Replies load on demand

### User Profile

- View your posted ideas with total likes and comments stats
- Update your display name and profile photo URL
- Settings page for profile management

### Pages

- **Home** — Hero banner with trending ideas
- **Ideas** — Full feed with search, filter, and sort
- **Idea Details** — Individual idea page with comments
- **Add Idea** — Form to submit a new idea
- **My Ideas** — Dashboard for your posted ideas
- **My Interactions** — Ideas you have liked or commented on
- **Profile** — Your public profile with activity sidebar
- **Settings** — Update your name and profile photo

### UI & UX

- Skeleton loading screens for all pages
- Sticky filter bar with live search suggestions dropdown
- Comment modal on idea cards (Facebook-style)
- Responsive design — mobile, tablet, and desktop
- Smooth hover transitions and micro-interactions

---

## Tech Stack

### Frontend

| Technology              | Purpose                       |
| ----------------------- | ----------------------------- |
| Next.js 15 (App Router) | React framework, SSR, routing |
| Tailwind CSS v4         | Utility-first styling         |
| HeroUI v3               | UI component library          |
| Framer Motion           | Animations                    |
| Better Auth             | Authentication (Google OAuth) |
| react-hot-toast         | Toast notifications           |
| react-icons             | Icon library                  |
| use-debounce            | Debounced search input        |

### Backend

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| Express.js          | REST API server                 |
| MongoDB Atlas       | Database                        |
| MongoDB Node Driver | Database client                 |
| jose-cjs            | JWT verification via JWKS       |
| CORS                | Cross-origin resource sharing   |
| dotenv              | Environment variable management |
| nodemon             | Development server auto-restart |

---

## Project Structure

```
ideaflow/                          # Next.js frontend
├── src/
│   ├── app/
│   │   ├── (home)/                # Homepage
│   │   ├── ideas/                 # Ideas feed page
│   │   │   └── [id]/              # Idea details page
│   │   ├── add-idea/              # Add idea page
│   │   ├── update-idea/[id]/      # Update idea page
│   │   ├── my-ideas/              # My ideas dashboard
│   │   ├── my-interactions/       # Liked & commented ideas
│   │   ├── profile/               # User profile page
│   │   └── settings/              # Profile settings page
│   ├── components/
│   │   ├── Navbar.jsx             # Fixed navigation bar
│   │   ├── Footer.jsx             # Site footer
│   │   ├── IdeaCard.jsx           # Idea card with comment modal
│   │   ├── FilterBar.jsx          # Search, filter, sort bar
│   │   ├── DeleteIdeaAlert.jsx    # Delete confirmation modal
│   │   ├── UpdateIdeaForm.jsx     # Update idea form
│   │   └── comment/
│   │       ├── Comment.jsx        # Comment section
│   │       └── CommentCard.jsx    # Individual comment with replies
│   └── lib/
│       └── auth-client.ts         # Better Auth client config

ideaflow-server/                   # Express.js backend
├── index.js                       # Main server file
└── .env                           # Environment variables
```

---

## API Routes

### Ideas

| Method   | Route                | Description                                              |
| -------- | -------------------- | -------------------------------------------------------- |
| `GET`    | `/ideas`             | Get all ideas (supports `?search`, `?category`, `?sort`) |
| `GET`    | `/ideas/trending`    | Get top 6 ideas by like count                            |
| `GET`    | `/ideas/suggestions` | Get title suggestions for search autocomplete            |
| `GET`    | `/ideas/:id`         | Get single idea by ID (protected)                        |
| `POST`   | `/idea`              | Create a new idea                                        |
| `PATCH`  | `/ideas/:id`         | Update an idea                                           |
| `DELETE` | `/ideas/:id`         | Delete an idea                                           |

### Comments

| Method   | Route                         | Description                       |
| -------- | ----------------------------- | --------------------------------- |
| `GET`    | `/comment/:ideaId`            | Get all main comments for an idea |
| `POST`   | `/comment`                    | Post a new comment                |
| `POST`   | `/comment/:commentId/reply`   | Post a reply to a comment         |
| `GET`    | `/comment/:commentId/replies` | Get replies for a comment         |
| `PATCH`  | `/comment/:commentId`         | Edit a comment                    |
| `PATCH`  | `/comment/:commentId/like`    | Toggle like on a comment          |
| `DELETE` | `/comment/:commentId`         | Delete a comment and its replies  |

---

## Environment Variables

### Frontend — `.env.local`

```
NEXT_PUBLIC_SERVER_URL=http://localhost:4000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_uri
```

### Backend — `.env`

```
MONGODB_URI=your_mongodb_uri
PORT=4000
```

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account
- Google OAuth credentials

### Installation

**1. Clone the repository:**

```bash
git clone https://github.com/Aminulislam98/ideaflow.git
cd ideaflow
```

**2. Install frontend dependencies:**

```bash
cd ideaflow
npm install
```

**3. Install backend dependencies:**

```bash
cd ideaflow-server
npm install
```

**4. Set up environment variables:**

Create `.env.local` in the frontend root and `.env` in the backend root with the variables listed above.

**5. Run the backend:**

```bash
cd ideaflow-server
nodemon index.js
```

**6. Run the frontend:**

```bash
cd ideaflow
npm run dev
```

**7. Open your browser:**

```
http://localhost:3000
```

---

## Database Collections

### `ideas`

Stores all startup idea posts with author info, likes, and comment counts.

### `comments`

Stores comments and replies. Uses `parentId: null` for main comments and `parentId: commentId` for replies.

### `users` (managed by Better Auth)

Stores user accounts and session data.

---

## Author

**Aminul Islam**

- GitHub: [@Aminulislam98](https://github.com/Aminulislam98)
- LinkedIn: [linkedin.com/in/aminulislam98](https://linkedin.com/in/aminulislam98)
- Email: aminul@aminulislam.co.uk
- Website: aminulislam.uk

---

## License

This project is for educational and portfolio purposes.
