import { Store, Star, Flame, MapPin } from 'lucide-react'
import { useMapDrag } from '../hooks/useMapDrag'
import { MAP_PINS } from '../data/mockData'

const FEATURED_RESTAURANTS = [
  { name: 'Cumulus Inc.', description: 'Seasonal dining in the heart of Melbourne.', location: '45 Flinders Ln, Melbourne', status: 'Open Now', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100' },
  { name: 'Krimper Cafe', description: 'Industrial-chic cafe with house-baked pastries.', location: '20 Guildford Ln, Melbourne', status: 'Closing Soon', img: 'https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=100' },
  { name: 'Hash Specialty Coffee', description: 'Specialty coffee and all-day brunch.', location: '113 Hardware St, Melbourne', status: 'Open Now', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100' },
]

export default function ExplorePage() {
  const { mapPos, handleMouseDown, handleMouseMove, handleMouseUp } = useMapDrag()

  return (
    <div className="max-w-6xl mx-auto py-8 flex flex-col" style={{ height: 'calc(100vh - 120px)', minHeight: '650px' }}>
      <div className="grid grid-cols-12 gap-10 flex-1 overflow-hidden">

        {/* Map */}
        <div className="col-span-8 h-full relative">
          <div
            className="bg-slate-100 rounded-[40px] h-full border border-slate-200 relative overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              className="absolute w-[150%] h-[150%] left-1/2 top-1/2 pointer-events-none"
              style={{ transform: `translate(calc(-50% + ${mapPos.x}px), calc(-50% + ${mapPos.y}px))` }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12607.755491185593!2d144.9536838!3d-37.8136276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b8c21cb29b%3A0x1c045678462e3510!2sMelbourne%20CBD!5e0!3m2!1sen!2sau!4v1715000000000!5m2!1sen!2sau"
                width="100%" height="100%"
                style={{ border: 0, filter: 'contrast(1.05)' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Melbourne CBD"
                className="absolute inset-0 opacity-80"
              />
              <div className="absolute inset-0">
                {MAP_PINS.map(pin => (
                  <div key={pin.id} className="absolute transform -translate-x-1/2 -translate-y-full group pointer-events-auto hover:z-50" style={{ top: pin.top, left: pin.left }}>
                    <div className="w-12 h-12 bg-slate-900 rounded-[20px] flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-green-500 transition-all duration-300 border-[3px] border-white cursor-pointer">
                      <Store size={20} />
                    </div>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white p-3 rounded-2xl shadow-2xl w-48 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 pointer-events-none">
                      <img src={pin.img} className="w-full h-20 object-cover rounded-xl mb-3" alt={pin.name} draggable={false} />
                      <h5 className="font-black text-slate-900 text-xs leading-tight">{pin.name}</h5>
                      <div className="flex justify-between items-center mt-2">
                        <span className="flex items-center gap-1 text-[10px] font-bold text-yellow-500"><Star size={12} fill="currentColor" /> {Math.min(5, Math.max(0, pin.rating))}</span>
                        <span className="text-[8px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-md uppercase tracking-wider">{pin.status}</span>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebars */}
        <div className="col-span-4 flex flex-col gap-6 h-full overflow-hidden">
          <div className="bg-slate-900 rounded-[32px] p-6 text-white shadow-xl flex flex-col overflow-hidden shrink-0">
            <h3 className="font-black text-slate-100 mb-4 flex items-center gap-2 shrink-0"><Flame size={18} className="text-orange-500" /> Featured Restaurants</h3>
            <div className="space-y-2.5 flex-1 min-h-0 flex flex-col justify-start">
              {FEATURED_RESTAURANTS.map((restaurant, i) => (
                <div key={i} className="flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group bg-white/5 flex-shrink-0">
                  <img
                    src={restaurant.img}
                    alt={restaurant.name}
                    className="w-11 h-11 rounded-[12px] object-cover border border-white/10 flex-shrink-0"
                    draggable={false}
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-black text-white truncate block">{restaurant.name}</span>
                    <p className="text-[9px] text-slate-300 font-medium line-clamp-1 mt-0.5">{restaurant.description}</p>
                    <p className="text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-1">{restaurant.location}</p>
                    <span className="inline-block text-[8px] font-black text-green-400 bg-green-400/20 px-1.5 py-0.5 rounded mt-1 uppercase tracking-tighter">{restaurant.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 border border-slate-200 flex-1 overflow-y-auto flex flex-col">
            <h3 className="font-[1000] text-lg text-slate-900 mb-4 flex items-center gap-2 shrink-0"><MapPin size={18} className="text-blue-500" /> Near Me</h3>
            <div className="space-y-3 flex-1">
              {[
                { name: "Cumulus Inc.", dist: "0.2km", status: "Open Now", color: "text-green-500", img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100" },
                { name: "Krimper Cafe", dist: "0.4km", status: "Closing Soon", color: "text-orange-500", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?w=100" },
                { name: "Hash Specialty", dist: "0.8km", status: "Open Now", color: "text-green-500", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=100" }
              ].map((shop, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <img src={shop.img} alt={shop.name} className="w-10 h-10 rounded-[10px] object-cover border border-slate-100" draggable={false} />
                    <div>
                      <p className="text-xs font-black text-slate-800">{shop.name}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{shop.dist} away</p>
                    </div>
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-tighter ${shop.color}`}>{shop.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}