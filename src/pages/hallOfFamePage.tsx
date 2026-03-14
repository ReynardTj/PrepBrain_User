import { Trophy, Star, ExternalLink } from 'lucide-react'

const HALL_ITEMS = [
  { year: "2023 Grand Prix", dish: "Organic Sourdough", shop: "Lune Croissanterie", img: "https://images.unsplash.com/photo-1585478259715-876a6a81fc08?w=500" },
  { year: "2024 Fan Favorite", dish: "Surplus Croissant Box", shop: "St Kilda Bakes", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500" },
  { year: "Most Innovative", dish: "Surplus Fruit Infusion", shop: "Higher Ground", img: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500" },
]

export default function HallOfFamePage() {
  return (
    <div className="max-w-6xl mx-auto py-12">
      <div className="text-center mb-20">
        <div className="inline-block p-6 bg-yellow-50 rounded-[32px] mb-8 border border-yellow-100">
          <Trophy size={64} className="text-yellow-500" />
        </div>
        <h2 className="text-6xl font-[1000] text-slate-900 tracking-tighter mb-6">The Hall of Fame</h2>
        <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
          Honoring the dishes and shops that have created a sustainable legacy, rescuing tons of food throughout WouldYouTry's history.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-10">
        {HALL_ITEMS.map((item, i) => (
          <div key={i} className="bg-white rounded-[48px] border border-slate-200 overflow-hidden group hover:-translate-y-4 transition-all duration-700 cursor-pointer">
            <div className="aspect-[4/5] bg-slate-100 relative">
              <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={item.dish} draggable={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90" />
              <div className="absolute bottom-10 left-10 right-10 text-white">
                <p className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-yellow-400 mb-2 flex items-center gap-2">
                  <Star size={14} fill="currentColor" /> {item.year}
                </p>
                <h4 className="text-3xl font-[1000] mb-2 leading-tight">{item.dish}</h4>
                <p className="text-sm font-bold text-slate-300 flex items-center gap-2 italic">
                  {item.shop} <ExternalLink size={14} />
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}