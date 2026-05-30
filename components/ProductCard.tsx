'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/context/CartContext'
import Image from 'next/image'
import { Plus, Lock } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'

interface ProductProps {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
}

export function ProductCard({ id, name, description, price, category, image }: ProductProps) {
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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      router.push('/login')
      return
    }
    addToCart({ id, name, price, quantity: 1, image })
  }

  return (
    <Card className="group relative overflow-hidden glass-morphism border-white/10 hover:border-neon-cyan/50 transition-all duration-500 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          />
          <Badge className="absolute top-2 left-2 bg-neon-cyan text-dark-bg border-none font-bold">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">
          {name}
        </CardTitle>
        <p className="mt-2 text-sm text-gray-400 line-clamp-2">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between border-t border-white/5 bg-white/5">
        <span className="text-xl font-bold neon-text-cyan">
          ${price.toLocaleString()}
        </span>
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="bg-neon-purple hover:bg-neon-purple/80 text-white border-none shadow-[0_0_10px_rgba(188,19,254,0.3)]"
        >
          {user ? (
            <><Plus className="w-4 h-4 mr-1" /> Add</>
          ) : (
            <><Lock className="w-3 h-3 mr-1" /> Login to Add</>
          )}
        </Button>
      </CardFooter>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </Card>
  )
}
