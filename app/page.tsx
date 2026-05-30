import { ProductCard } from '@/components/ProductCard'
import items from '@/data/items.json'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
          EQUIP THE <span className="neon-text-cyan">FUTURE</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Welcome to NEO-CORP. High-performance augmentations and hardware for the modern digital operative.
        </p>
        <div className="flex justify-center gap-4">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-neon-cyan self-center" />
          <span className="text-xs font-mono text-neon-cyan uppercase tracking-widest">Authorized Access Only</span>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-neon-cyan self-center" />
        </div>
      </section>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <Link key={item.id} href={`/product/${item.id}`} className="block">
            <ProductCard {...item} />
          </Link>
        ))}
      </div>
    </div>
  )
}
