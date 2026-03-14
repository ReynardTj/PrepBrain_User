import { X, ChevronRight } from 'lucide-react'

interface Props {
  onClose: () => void
}

export default function VoteModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[40px] w-full max-w-md overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black text-slate-900">Cast Your Vote</h3>
            <p className="text-xs font-bold text-slate-400 mt-1">Which category does this dish deserve?</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-3">
          {['Most Creative', 'Best Value', 'Incredible Taste', 'Zero Waste Hero'].map(label => (
            <button
              key={label}
              onClick={onClose}
              className="w-full flex items-center justify-between p-5 rounded-2xl border-2 border-slate-100 hover:border-slate-900 group transition-all"
            >
              <span className="font-black text-slate-800 group-hover:translate-x-1 transition-transform">{label}</span>
              <ChevronRight size={18} className="text-slate-300 group-hover:text-slate-900" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}