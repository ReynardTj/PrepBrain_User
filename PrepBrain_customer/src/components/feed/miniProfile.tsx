export default function MiniProfile() {
  return (
    <div className="bg-white rounded-[32px] p-6 border border-slate-200 mb-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-slate-900 rounded-[20px] overflow-hidden border-4 border-slate-50">
          <img src="https://i.pravatar.cc/150?u=brunchmanager" alt="Shop" className="w-full h-full object-cover" draggable={false} />
        </div>
        <div>
          <h4 className="font-black text-slate-900 leading-tight">Yarra Valley Kitchen</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">South Yarra, VIC</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 text-center">
          <p className="text-[9px] font-black text-blue-400 uppercase tracking-wider mb-1">Nat. Rank</p>
          <p className="text-2xl font-[1000] text-blue-600">#34</p>
        </div>
        <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100 text-center">
          <p className="text-[9px] font-black text-green-400 uppercase tracking-wider mb-1">Total Impact</p>
          <p className="text-2xl font-[1000] text-green-600">85<span className="text-xs ml-0.5">kg</span></p>
        </div>
      </div>
    </div>
  )
}