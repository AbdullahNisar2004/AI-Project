import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextResponse } from 'next/server'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

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
    const lastMessage = messages[messages.length - 1].content

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m: Message) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
      },
    })

    const result = await chat.sendMessage([
      { text: SYSTEM_PROMPT },
      { text: lastMessage }
    ])
    
    const response = await result.response
    const text = response.text()

    return NextResponse.json({ content: text })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json({ error: 'Signal lost. Re-establishing connection...' }, { status: 500 })
  }
}
