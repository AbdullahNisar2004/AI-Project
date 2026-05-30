# NEO-CORP | Advanced Military E-commerce Terminal

### Project Overview
NEO-CORP is a professional, high-end military hardware e-commerce platform. It provides a secure digital terminal for requisitioning advanced tactical equipment, ranging from neural-link reconnaissance drones to hydraulic exoskeleton suits. The platform is designed with a "techy" cyberpunk aesthetic, featuring neon-gated interfaces and glassmorphism UI elements.

---

### Features List
- **Advanced Authentication:** Secure login and registration powered by Supabase Auth with custom "Identity Initialization" flows.
- **Military Grade Catalog:** Dynamic product display of high-end tactical hardware fetched from a JSON data layer.
- **Secure Manifest (Cart):** Full cart functionality (Add/Remove/Update) with persistent storage and authentication-gated actions.
- **Product Recon (Detail Pages):** In-depth technical specifications and high-resolution visuals for every item in the armory.
- **AI Support Operative:** Floating chatbot powered by Gemini 1.5 Flash, providing context-aware technical assistance and product info.
- **Responsive Terminal:** Fully optimized for mobile and desktop "field operations."

---

### Technology Stack
- **Frontend Framework:** Next.js 15 (App Router)
- **Backend-as-a-Service:** Supabase (Auth & Session management)
- **Component Library:** Shadcn UI (Customized Neon variants)
- **Styling:** Tailwind CSS 4.0
- **AI Engine:** Google Gemini 1.5 Flash (via Generative AI SDK)
- **State Management:** React Context API
- **Animations:** Framer Motion

---

### Installation Guide
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd neo-corp
   ```

2. **Install core modules:**
   ```bash
   npm install
   ```

3. **Initialize the terminal:**
   ```bash
   npm run dev
   ```

---

### API Setup Instructions
1. **Supabase Setup:**
   - Create a new project at [supabase.com](https://supabase.com).
   - Enable Email Auth in the Authentication settings.
   - Copy your `Project URL` and `Anon Key`.

2. **Gemini AI Setup:**
   - Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
   - Ensure you have access to the `gemini-1.5-flash` model.

---

### Environment Variables Needed
Create a `.env.local` file in the root directory:

```env
# Supabase Connectivity
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key

# AI Intelligence
GEMINI_API_KEY=your-google-ai-studio-api-key
```

---

### Deployment Process
1. **Optimization Build:**
   ```bash
   npm run build
   ```
2. **Production Launch:**
   ```bash
   npm start
   ```
3. **Cloud Deployment:**
   - For **Vercel**: Connect your GitHub repo, add the Environment Variables in the project settings, and deploy.
   - For **Netlify**: Use the Next.js adapter and configure the same environment variables.

---
*Authorized by NEO-CORP Central Command*
