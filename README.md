FlavorAI Frontend

This is the frontend application for the "FlavorAI" project - a smart recipe assistant that allows users to browse, add, edit, and rate recipes. Built with React, TypeScript, and Tailwind CSS.

Tech Stack:
-React (Vite)
-TypeScript
-Tailwind CSS
-Axios
-React Router

Getting Started

1. Clone and Install

clone repository, then

cd .\frontend\
npm install

2. Configure Environment

Create a .env file in the root directory:

VITE_API_URL=http://localhost:3000

This should match your backend API base URL.

3. Start the App

npm run dev

Features:
-User Authentication (Register/Login with JWT)
-Add new recipes (title, description, ingredients, instructions)
-Edit/Delete own recipes
-Browse and search all recipes
-Filter your own recipes
-Submit and update star ratings (1-5)
-View average rating
-Mobile responsive layout

API Integration:
-All API endpoints are served from the backend (/recipes, /auth, /rating, etc.) using JWT tokens stored in memory (via React context).

UX Decisions:

-Clean and minimalistic UI for better focus on recipe content

-Tailwind CSS ensures consistency and responsive design

-Search field hides when no results to reduce clutter

-Rating stars are interactive and update immediately after submission

-Recipes are truncated in the list view (line-clamp) to improve scanability

Technical Decisions

-Used React Context to handle authentication state across the app

-Vite was chosen for its fast development build and simplicity

-Star ratings are stored in backend and aggregated in frontend (avgRating)

-TypeScript with strict types enabled to ensure robust structure

-Axios handles API calls with dynamic JWT headers
