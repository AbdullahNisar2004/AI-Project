'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Connection established. NEO-CORP Support online. How can I assist your operation today?' }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      const data = await response.json()
      if (data.error) throw new Error(data.error)

      setMessages((prev) => [...prev, { role: 'assistant', content: data.content }])
    } catch (error: any) {
      const errorMessage = error.message || 'Signal interference detected. Please retry transmission.'
      setMessages((prev) => [...prev, { role: 'assistant', content: `[SYSTEM ERROR]: ${errorMessage}` }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4"
          >
            <Card className="w-[350px] md:w-[400px] h-[500px] flex flex-col glass-morphism border-neon-cyan/50 shadow-[0_0_20px_rgba(0,243,255,0.2)]">
              <CardHeader className="p-4 border-b border-white/10 flex flex-row items-center justify-between bg-white/5">
                <CardTitle className="text-sm font-bold flex items-center gap-2 text-neon-cyan uppercase tracking-widest">
                  <Bot className="w-5 h-5" />
                  Technical Support
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-grow p-0 overflow-hidden">
                <ScrollArea className="h-full p-4" viewportRef={scrollRef}>
                  <div className="space-y-4">
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                          m.role === 'user' 
                            ? 'bg-neon-purple/20 border border-neon-purple/30 text-white' 
                            : 'bg-white/5 border border-white/10 text-gray-200'
                        }`}>
                          <div className="flex items-center gap-2 mb-1 opacity-50 text-[10px] uppercase font-bold tracking-tighter">
                            {m.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                            {m.role === 'user' ? 'Identity Verified' : 'Neo-Support'}
                          </div>
                          {m.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-white/5 border border-white/10 p-3 rounded-lg text-gray-400">
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-4 border-t border-white/10 bg-white/5">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                  className="flex w-full gap-2"
                >
                  <Input
                    placeholder="Input command..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="bg-dark-bg/50 border-white/10 focus:border-neon-cyan text-white text-xs h-9"
                  />
                  <Button size="icon" className="h-9 w-9 bg-neon-cyan text-dark-bg hover:bg-neon-cyan/80 shrink-0">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'bg-red-500 hover:bg-red-600 rotate-90' : 'bg-neon-cyan hover:bg-neon-cyan/80'
        }`}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageSquare className="w-6 h-6 text-dark-bg" />}
      </Button>
    </div>
  )
}
