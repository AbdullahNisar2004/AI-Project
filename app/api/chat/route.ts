import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'models/gemini-1.5-flash' })

const SYSTEM_PROMPT = `
You are the NEO-CORP Advanced Technical Support AI. 
Your persona is sleek, professional, and slightly futuristic/cyberpunk. 
You assist customers with inquiries about NEO-CORP products: 
- Quantum-X Neural Link
- Neon-Pulse Kinetic Blade
- Void-Stalker HUD Goggles
- Aether-Core Power Cell
- Cyber-Deck v9.0
- Ghost-Shell Stealth Suit

Keep your responses concise, helpful, and "techy". Use terms like "initialization", "encryption", "bandwidth", "neural sync", etc. 
If asked about payments, inform the user that the payment gateway is currently under maintenance for a security audit.
`

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: Request) {
  try {
    const { messages }: { messages: Message[] } = await req.json()
    
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
    }

    const lastMessage = messages[messages.length - 1].content

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing from environment variables.' }, { status: 500 })
    }

    // Create model with system instructions
    const modelWithSystem = genAI.getGenerativeModel({ 
      model: 'models/gemini-1.5-flash',
      systemInstruction: {
        role: 'system',
        parts: [{ text: SYSTEM_PROMPT }]
      }
    })

    // Filter history to ensure it starts with a 'user' message and alternates roles
    const history = messages.slice(0, -1)
      .map((m: Message) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }))
      .filter((m, index) => {
        // Gemini history MUST start with 'user'
        if (index === 0 && m.role === 'model') return false;
        return true;
      });

    const chat = modelWithSystem.startChat({
      history: history,
      generationConfig: {
        maxOutputTokens: 500,
      },
    })

    const result = await chat.sendMessage(lastMessage)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ content: text })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    const status = error.status || 500
    const message = error.message || 'Signal lost. Re-establishing connection...'
    return NextResponse.json({ error: message }, { status })
  }
}
