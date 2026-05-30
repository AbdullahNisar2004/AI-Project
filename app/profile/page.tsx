'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User as UserIcon, Mail, Calendar, UserCheck, Shield, Cpu, Activity, LogOut } from 'lucide-react'
import { motion } from 'framer-motion'
import { User } from '@supabase/supabase-js'

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      } else {
        setUser(user)
      }
      setLoading(false)
    }
    fetchUser()
  }, [supabase.auth, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-neon-cyan/30 border-t-neon-cyan rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  const profileData = [
    { label: 'First Name', value: user.user_metadata?.first_name || 'N/A', icon: <UserIcon className="w-4 h-4 text-neon-cyan" /> },
    { label: 'Last Name', value: user.user_metadata?.last_name || 'N/A', icon: <UserIcon className="w-4 h-4 text-neon-cyan" /> },
    { label: 'Email Address', value: user.email || 'N/A', icon: <Mail className="w-4 h-4 text-neon-cyan" /> },
    { label: 'Gender', value: user.user_metadata?.gender || 'N/A', icon: <Activity className="w-4 h-4 text-neon-cyan" /> },
    { label: 'Biological Age', value: user.user_metadata?.age || 'N/A', icon: <Calendar className="w-4 h-4 text-neon-cyan" /> },
    { label: 'Auth Status', value: 'Verified Node', icon: <Shield className="w-4 h-4 text-neon-cyan" /> },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="max-w-4xl mx-auto glass-morphism border-white/10 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-cyan/20 animate-gradient-x" />
          
          <CardHeader className="relative -mt-16 px-8">
            <div className="flex flex-col md:flex-row items-end gap-6">
              <div className="w-32 h-32 rounded-2xl bg-dark-card border-4 border-dark-bg overflow-hidden shadow-2xl relative group">
                <div className="absolute inset-0 bg-neon-cyan/10 group-hover:bg-neon-cyan/20 transition-colors" />
                <div className="flex items-center justify-center h-full">
                  <UserCheck className="w-16 h-16 text-neon-cyan" />
                </div>
              </div>
              <div className="pb-2 space-y-1">
                <CardTitle className="text-3xl font-black text-white uppercase tracking-tighter">
                  {user.user_metadata?.first_name} {user.user_metadata?.last_name}
                </CardTitle>
                <CardDescription className="text-neon-cyan font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                  <Cpu className="w-3 h-3" /> ACTIVE TERMINAL SESSION
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profileData.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2 group hover:border-neon-cyan/30 transition-all">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest group-hover:text-neon-cyan transition-colors">
                    {item.icon}
                    {item.label}
                  </div>
                  <div className="text-white font-bold text-lg">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 rounded-xl border border-dashed border-white/10 bg-white/5">
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-4 h-4 text-neon-purple" /> Security Credentials
              </h3>
              <div className="flex flex-col md:flex-row gap-4">
                <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">
                  Update Encryption Keys
                </Button>
                <Button onClick={handleLogout} variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-950/20 ml-auto">
                  <LogOut className="w-4 h-4 mr-2" /> Disconnect Node
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
