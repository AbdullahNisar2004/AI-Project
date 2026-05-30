# Run Guide: NEO-CORP E-commerce

Follow these steps to initialize and run the NEO-CORP e-commerce platform.

## 1. Prerequisites
- Node.js 18+ installed.
- A Supabase account and project.
- A Google AI Studio API Key (for Gemini).

## 2. Environment Setup
Create a `.env.local` file in the root directory and populate it with the following keys:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini AI Configuration
GEMINI_API_KEY=your_google_ai_studio_api_key
```

### How to get the keys:
- **Supabase:** Go to Project Settings > API to find the URL and Anon Key.
- **Gemini:** Visit [Google AI Studio](https://aistudio.google.com/) and create an API Key.

## 3. Installation
Install the required dependencies:
```bash
npm install
```

## 4. Running the Development Server
Start the local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 5. Deployment
To create a production build:
```bash
npm run build
npm start
```

## 6. Project Features to Test
1. **Browse Items:** Scroll the main page to see the "techy" product cards.
2. **Authentication:** Create an account at `/signup` and login at `/login`.
3. **Cart Operations:** Add items, view the manifest at `/cart`, and adjust quantities.
4. **AI Chat:** Click the floating cyan bubble in the bottom right to talk to the Technical Support AI.
