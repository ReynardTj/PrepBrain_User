import { useState } from 'react'
import { X, Image as ImageIcon, Utensils } from 'lucide-react'

interface Props {
  onPost: (dishName: string, description: string, waste: string, image: string | null) => void
}

const SAVED_RECIPES = ['Day-old sourdough toast', 'Spent coffee ground brownies']

export default function PostComposer({ onPost }: Props) {
  const [isComposing, setIsComposing] = useState(false)
  const [description, setDescription] = useState('')
  const [dishName, setDishName] = useState('')
  const [waste, setWaste] = useState('')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showRecipeDropdown, setShowRecipeDropdown] = useState(false)

  const canPost = !!dishName && !!description

  const handlePost = () => {
    if (!canPost) return
    onPost(dishName, description, waste, selectedImage)
    setDescription(''); setDishName(''); setWaste('')
    setSelectedImage(null); setIsComposing(false)
  }

  const handleCancel = () => {
    setIsComposing(false); setSelectedImage(null)
  }

  return (
    <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-6">
      <div className="flex gap-4 items-start">
        <img src="https://i.pravatar.cc/150?u=brunchmanager" className="w-12 h-12 rounded-[16px] object-cover border border-slate-100" alt="avatar" />
        <div className="flex-1 space-y-4">
          <textarea
            placeholder="Got some surplus food? Post a new off-menu dish..."
            className="w-full bg-slate-50 rounded-[24px] p-5 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500 resize-none transition-all"
            rows={isComposing ? 3 : 1}
            onClick={() => setIsComposing(true)}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          {isComposing && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Dish Name" className="bg-slate-50 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500" value={dishName} onChange={e => setDishName(e.target.value)} />
                <input type="text" placeholder="Waste Saved (kg)" className="bg-slate-50 rounded-2xl px-4 py-3 text-sm font-medium outline-none focus:ring-2 focus:ring-green-500" value={waste} onChange={e => setWaste(e.target.value)} />
              </div>

              {selectedImage && (
                <div className="relative w-full max-w-sm h-40 rounded-[20px] overflow-hidden border border-slate-200">
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                  <button onClick={() => setSelectedImage(null)} className="absolute top-2 right-2 bg-slate-900/70 text-white p-1.5 rounded-full">
                    <X size={14} />
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <div className="flex gap-4 text-slate-500 relative">
                  <label htmlFor="image-upload" className="p-2.5 hover:bg-slate-50 rounded-xl cursor-pointer flex items-center gap-2 group">
                    <ImageIcon size={20} className="group-hover:text-green-600" />
                    <span className="text-xs font-bold hidden sm:inline group-hover:text-green-600">Upload image</span>
                  </label>
                  <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) setSelectedImage(URL.createObjectURL(file))
                  }} />

                  <div className="relative">
                    <button className="p-2.5 hover:bg-slate-50 rounded-xl flex items-center gap-2 group" onClick={() => setShowRecipeDropdown(v => !v)}>
                      <Utensils size={20} className="group-hover:text-orange-500" />
                      <span className="text-xs font-bold hidden sm:inline group-hover:text-orange-500">Saved recipes</span>
                    </button>
                    {showRecipeDropdown && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl overflow-hidden z-50">
                        <div className="p-3 bg-slate-50 border-b border-slate-100">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Saved Recipes</p>
                        </div>
                        {SAVED_RECIPES.map((recipe, i) => (
                          <button key={i} className="w-full text-left px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-green-600 border-b border-slate-50 last:border-0"
                            onClick={() => { setDishName(recipe); setShowRecipeDropdown(false) }}>
                            {recipe}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="px-6 py-2 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-50" onClick={handleCancel}>Cancel</button>
                  <button
                    className={`px-8 py-2 rounded-2xl text-sm font-black transition-all ${canPost ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                    onClick={handlePost} disabled={!canPost}
                  >
                    Post Dish
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}