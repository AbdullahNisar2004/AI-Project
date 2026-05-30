'use client'

import { use } from 'react'
import items from '@/data/items.json'
import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ShoppingCart, Shield, Zap, Cpu, Activity, Lock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = items.find((item) => item.id === id)
  const { addToCart } = useCart()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [supabase.auth])

  const handleAddToCart = () => {
    if (!user) {
      router.push('/login')
      return
    }
    addToCart({ ...product!, quantity: 1 })
  }

  if (!product) {
    notFound()
  }

  const specs = [
    { icon: <Cpu className="w-4 h-4 text-neon-cyan" />, label: 'Architecture', value: 'Neural-Sync v4' },
    { icon: <Zap className="w-4 h-4 text-neon-cyan" />, label: 'Efficiency', value: '99.9% Uptime' },
    { icon: <Shield className="w-4 h-4 text-neon-cyan" />, label: 'Security', value: 'Quantum Encrypted' },
    { icon: <Activity className="w-4 h-4 text-neon-cyan" />, label: 'Latency', value: '< 0.001ms' },
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-gray-400 hover:text-neon-cyan mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Armory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg border border-white/10 glass-morphism group">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/80 to-transparent" />
          <Badge className="absolute top-4 left-4 bg-neon-cyan text-dark-bg font-black uppercase tracking-widest">
            {product.category}
          </Badge>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
              {product.name}
            </h1>
            <p className="text-2xl font-mono text-neon-cyan neon-text-cyan">
              ${product.price.toLocaleString()}
            </p>
          </div>

          <p className="text-gray-400 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="h-[1px] bg-white/10 w-full" />

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-2 gap-4">
            {specs.map((spec, i) => (
              <div key={i} className="p-4 rounded-lg bg-white/5 border border-white/5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-mono text-neon-cyan uppercase tracking-widest opacity-70">
                  {spec.icon}
                  {spec.label}
                </div>
                <div className="text-white font-bold tracking-tight">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 space-y-4">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-neon-cyan text-dark-bg font-black py-8 text-xl hover:bg-neon-cyan/80 shadow-[0_0_20px_rgba(0,243,255,0.3)] transition-all group"
            >
              {user ? (
                <><ShoppingCart className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" /> ADD TO MANIFEST</>
              ) : (
                <><Lock className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" /> LOGIN TO ADD</>
              )}
            </Button>
            <p className="text-center text-[10px] text-gray-500 uppercase tracking-[0.2em] animate-pulse">
              Secure transmission guaranteed by NEO-CORP
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
