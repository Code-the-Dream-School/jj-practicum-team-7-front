# PeerQuests: Front-End Repository

This repository holds the frontend source for the JJJ Practicum Team 7's application
"PeerQuests".

## About The Project

PeerQuests is a fun, social platform that helps people stay motivated by building habits together through shared challenges. 
This repository contains the **React.js application** code, which interfaces with our [Back-End Repository](https://github.com/Code-the-Dream-School/jj-practicum-team-7-back).

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Core Features](#core-features)
3. [Quick Start](#quick-start)
4. [Presentation](#presentation)
5. [Authors](#authors)

## Technologies Used

Our front-end is powered by modern tools and libraries to ensure a smooth, efficient, and intuitive user experience:

- **Frameworks:**

  - `React` - A JavaScript library for building user interfaces with a component-based architecture.

- **Routing and Navigation:**

  - `React Router Dom` - Enables dynamic routing for an intuitive single-page application experience.

- **State Management:**

  - `Zustand` - Manages global application state, such as user authentication, challenges data, and notifications.

- **HTTP Requests:**

  - `Axios` - Handles API communication with the back-end server.

- **Styling and CSS Frameworks:**

  - `Tailwind CSS` - A utility-first CSS framework for responsive and modern UI design.

- **Development and Build Tools:**
  - `Vite` - A fast front-end build tool for a streamlined development experience.
  - `ESLint` - Ensures consistent and clean code through linting.
  - `Prettier` - Formats code automatically for readability and uniformity.

## Development Scripts

This project includes several NPM scripts to facilitate development, testing, and production builds:

- **`build`**:
  Builds the project for production.

  ```bash
  npm run build
  ```
  
- **`lint`**:
  Lints the codebase using ESLint.

  ```bash
  npm run lint
  ```

- **`preview`**:
  Serves the built application locally.

  ```bash
  npm run preview
  ```

# Core Features: 
- **👥 Create & Join Challenges** – set goals, invite friends
- **✅ Daily Check-Ins & Invites** – track progress and see new invitations
- **🏆 Leaderboards** – view rankings in each challenge and globally
- **👤 Secure Sign-In** – quick access via email or Google
- **🎨 Responsive Interface** – smooth on desktop and mobile
- **📊 Manage Challenges** – edit, invite or leave easily

## Quick Start

### Setup

1. **Clone the Repository**: Clone this repository to your local machine.
2. **Install Dependencies**: Run `npm install` to install required packages.
3. **Create a `.env` File**: Create a `.env` file in the root directory and add the following variable:

```bash
  VITE_BACKEND_URL=http://localhost:8000
```

4. **Start the Development Server**: Run `npm run dev` to start the application locally on `localhost:5173`.
5. **Explore the Application**: Register an account and explore features such as create a new challenge, check in, accept a new challenge.

- Ensure the back-end server is running as per the instructions in our [Back-End Repository](https://github.com/Code-the-Dream-School/jj-practicum-team-7-back).

## Presentation

- [Final Presentation Slides](#)

## Authors

- Lima Eftekhar
- Natalia Sirtak
- Darya Pogas
- Romanna Bidnyk

