'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Cpu } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push('/')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark-bg">
      <Card className="w-full max-w-md glass-morphism border-neon-cyan/30 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Cpu className="w-12 h-12 text-neon-cyan animate-pulse" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tighter neon-text-cyan">Access Terminal</CardTitle>
          <CardDescription className="text-gray-400">
            Enter your credentials to access NEO-CORP
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 rounded bg-red-900/30 border border-red-500/50 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="identity@neo-corp.net"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus:border-neon-cyan text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/10 focus:border-neon-cyan text-white"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-neon-cyan text-dark-bg font-bold hover:bg-neon-cyan/80 transition-all"
            >
              {loading ? 'Decrypting...' : 'Log In'}
            </Button>
            <p className="text-sm text-center text-gray-500">
              New recruit?{' '}
              <Link href="/signup" className="text-neon-purple hover:underline">
                Create Identity
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
