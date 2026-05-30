'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { ShieldCheck, Mail, Lock, UserPlus, Fingerprint, User, Calendar } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    age: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          gender: formData.gender,
          age: formData.age,
        }
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-dark-bg">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-md glass-morphism border-neon-cyan/30 text-center p-8 shadow-[0_0_50px_rgba(0,243,255,0.15)]">
            <div className="relative inline-block mb-6">
               <ShieldCheck className="w-20 h-20 text-neon-cyan animate-pulse" />
               <div className="absolute inset-0 bg-neon-cyan blur-2xl opacity-20 animate-pulse" />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Registration Seeded</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              We have dispatched an encrypted verification link to <span className="text-neon-cyan font-mono">{formData.email}</span>. 
              Confirm your bio-metrics to activate your node.
            </p>
            <Link href="/login">
              <Button className="w-full bg-neon-cyan text-dark-bg font-black py-6 hover:bg-neon-cyan/80 transition-all uppercase tracking-widest">
                Return to Access Point
              </Button>
            </Link>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark-bg py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass-morphism border-neon-purple/30 shadow-[0_0_40px_rgba(188,19,254,0.1)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent" />
          
          <CardHeader className="space-y-2 text-center pb-8">
            <div className="flex justify-center mb-4 relative">
              <div className="p-4 rounded-full bg-neon-purple/10 border border-neon-purple/20">
                <Fingerprint className="w-12 h-12 text-neon-purple animate-pulse" />
              </div>
            </div>
            <CardTitle className="text-3xl font-black tracking-tighter neon-text-purple uppercase">Initialize Identity</CardTitle>
            <CardDescription className="text-gray-500 font-mono text-xs uppercase tracking-widest">
              Securing connection to NEO-CORP mainframe
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSignup}>
            <CardContent className="space-y-6">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 rounded-lg bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-mono"
                >
                  [ERROR]: {error.toUpperCase()}
                </motion.div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-400 text-xs uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3 text-neon-purple" /> First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 focus:border-neon-purple text-white h-12 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-400 text-xs uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3 text-neon-purple" /> Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 focus:border-neon-purple text-white h-12 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-gray-400 text-xs uppercase tracking-widest flex items-center gap-2">
                    Gender
                  </Label>
                  <Select onValueChange={(value: string | null) => setFormData({ ...formData, gender: value ?? '' })} required>
                    <SelectTrigger className="bg-white/5 border-white/10 focus:border-neon-purple text-white h-12">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent className="glass-morphism border-white/10 text-white">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="classified">Classified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age" className="text-gray-400 text-xs uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-neon-purple" /> Biological Age
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    className="bg-white/5 border-white/10 focus:border-neon-purple text-white h-12 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-400 text-xs uppercase tracking-widest flex items-center gap-2">
                  <Mail className="w-3 h-3 text-neon-purple" /> Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="bio-id@mainframe.net"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 focus:border-neon-purple text-white h-12 transition-all"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-400 text-xs uppercase tracking-widest flex items-center gap-2">
                  <Lock className="w-3 h-3 text-neon-purple" /> Encrypted Key
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 focus:border-neon-purple text-white h-12 transition-all"
                />
              </div>

              <div className="pt-2 text-[10px] text-gray-600 font-mono leading-tight">
                BY INITIALIZING, YOU AGREE TO OUR <span className="text-neon-purple">NEURAL-LINK PROTOCOLS</span> AND <span className="text-neon-purple">DATA HARVESTING POLICY</span>.
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-6 pb-8">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-neon-purple text-white font-black h-12 hover:bg-neon-purple/80 transition-all shadow-[0_0_20px_rgba(188,19,254,0.2)] group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ENCRYPTING...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    ESTABLISH CONNECTION
                  </span>
                )}
              </Button>
              
              <div className="h-[1px] w-full bg-white/5 relative">
                <span className="absolute left-1/2 -top-2 -translate-x-1/2 bg-dark-bg px-2 text-[10px] text-gray-700 font-mono">OR</span>
              </div>

              <p className="text-xs text-center text-gray-500 font-mono">
                ALREADY REGISTERED?{' '}
                <Link href="/login" className="text-neon-cyan hover:text-neon-cyan/80 transition-colors uppercase font-bold tracking-tighter">
                  [ACCESS TERMINAL]
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}
