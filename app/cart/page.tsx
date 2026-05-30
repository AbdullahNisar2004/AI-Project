'use client'

import { useCart } from '@/context/CartContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold text-white mb-4 neon-text-purple">Inventory Empty</h2>
        <p className="text-gray-400 mb-8 text-lg">Your cargo bay is currently empty. Requisition new equipment.</p>
        <Link href="/">
          <Button className="bg-neon-cyan text-dark-bg font-bold">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Armory
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-black tracking-tighter text-white mb-8 neon-text-cyan uppercase">
        Cargo Manifest
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id} className="glass-morphism border-white/5 overflow-hidden">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover rounded border border-white/10"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-white text-lg group-hover:text-neon-cyan transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-neon-cyan font-mono">${item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-lg border border-white/10">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-white font-mono w-4 text-center">{item.quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-white hover:bg-white/10"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-500 hover:text-red-500 hover:bg-red-500/10"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <Card className="glass-morphism border-neon-cyan/20 sticky top-24">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-bold text-white uppercase tracking-wider">Transaction Summary</h2>
              <div className="space-y-2 text-gray-400 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} units)</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Data Transfer Fee</span>
                  <span className="text-neon-cyan">FREE</span>
                </div>
              </div>
              <div className="h-[1px] bg-white/10" />
              <div className="flex justify-between text-xl font-black text-white">
                <span>TOTAL</span>
                <span className="neon-text-cyan">${totalPrice.toLocaleString()}</span>
              </div>
              <Button
                className="w-full bg-neon-cyan text-dark-bg font-bold py-6 text-lg hover:bg-neon-cyan/80 group"
                disabled
              >
                <CreditCard className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                SECURE CHECKOUT
              </Button>
              <p className="text-[10px] text-center text-gray-500 uppercase tracking-widest">
                Payment systems currently under maintenance by order of NEO-CORP
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
