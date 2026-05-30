# Project Specification: NEO-CORP E-commerce

## 1. Overview
NEO-CORP is a professional, tech-focused e-commerce platform with a modern "cyberpunk" aesthetic. It features a full shopping experience, secure authentication, and an AI-powered technical support chatbot.

## 2. Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Backend:** Supabase (Authentication & Session Management)
- **UI Library:** Shadcn UI (Customized with Neon variants)
- **Styling:** Tailwind CSS 4.0
- **State Management:** React Context (Cart management with localStorage persistence)
- **AI Integration:** Google Gemini 1.5 Flash (Technical Support Chatbot)
- **Animations:** Framer Motion

## 3. Core Features

### 3.1 Authentication
- Managed via Supabase Auth.
- Support for User Login and Registration.
- **Enhanced Registration:** Collects First Name, Last Name, Gender, and Biological Age.
- **User Profile:** Dedicated `/profile` page displaying user metadata and security status.
- Protected client-side state for authenticated users.

### 3.2 Product Management
- Products are served from a static `items.json` data layer.
- Includes categories, high-quality tech imagery, and detailed descriptions.

### 3.3 Shopping Cart
- Add/Remove items from the cart.
- Real-time quantity updates.
- Persistent state across sessions using `localStorage`.
- Visual indicators (badge) in the navigation bar.

### 3.4 AI Chatbot
- Integrated "NEO-CORP Technical Support" assistant.
- Powered by Gemini 1.5 Flash.
- Custom system prompt for a futuristic, professional persona.
- Context-aware responses regarding products and platform status.

### 3.5 Aesthetic
- **Theme:** Forced Dark Mode.
- **Colors:** Neon Cyan (`#00f3ff`), Neon Purple (`#bc13fe`), Dark Background (`#050505`).
- **Effects:** Glassmorphism, Neon glow borders, Pulsing animations.

## 4. Architecture
- `app/`: Next.js pages and API routes.
- `components/`: Reusable UI components and business components.
- `context/`: Global state providers (Cart).
- `lib/`: Utility functions and Supabase configuration.
- `data/`: Mock data storage.
