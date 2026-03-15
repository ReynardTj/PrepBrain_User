import { useState, useMemo, useRef } from 'react'
import { BarChart3, TrendingUp, CheckCircle2, Sparkles, ChefHat, ArrowRight, Zap, Plus } from 'lucide-react'

// Cumulative profile views over 14 days – final value matches metric "Profile Views: 14,842"
const INFLUENCE_CHART_DATA = [
  { day: 1, label: 'Day 1', value: 620 },
  { day: 2, label: 'Day 2', value: 1280 },
  { day: 3, label: 'Day 3', value: 2100 },
  { day: 4, label: 'Day 4', value: 3050 },
  { day: 5, label: 'Day 5', value: 3980 },
  { day: 6, label: 'Day 6', value: 5120 },
  { day: 7, label: 'Day 7', value: 6280 },
  { day: 8, label: 'Day 8', value: 7450 },
  { day: 9, label: 'Day 9', value: 8620 },
  { day: 10, label: 'Day 10', value: 9850 },
  { day: 11, label: 'Day 11', value: 11020 },
  { day: 12, label: 'Day 12', value: 12200 },
  { day: 13, label: 'Day 13', value: 13540 },
  { day: 14, label: 'Day 14', value: 14842 },
]

const TOOLTIP_WIDTH = 160
const TOOLTIP_HEIGHT = 52
const TOOLTIP_OFFSET = 10

function InfluenceGrowthChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)

  const width = 700
  const height = 220
  const padding = { top: 12, right: 12, bottom: 32, left: 48 }
  const innerWidth = width - padding.left - padding.right
  const innerHeight = height - padding.top - padding.bottom
  const maxVal = Math.max(...INFLUENCE_CHART_DATA.map(d => d.value))
  const minVal = 0

  const pathData = useMemo(() => {
    const xScale = (i: number) => padding.left + (i / (INFLUENCE_CHART_DATA.length - 1)) * innerWidth
    const yScale = (v: number) => padding.top + innerHeight - ((v - minVal) / (maxVal - minVal)) * innerHeight
    const points = INFLUENCE_CHART_DATA.map((d, i) => `${xScale(i)},${yScale(d.value)}`)
    const linePath = `M ${points.join(' L ')}`
    const areaPath = `${linePath} L ${padding.left + innerWidth},${padding.top + innerHeight} L ${padding.left},${padding.top + innerHeight} Z`
    return { linePath, areaPath, points: INFLUENCE_CHART_DATA.map((d, i) => ({ x: xScale(i), y: yScale(d.value), value: d.value, label: d.label })) }
  }, [innerWidth, innerHeight, maxVal, minVal])

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * width
    // const y = ((e.clientY - rect.top) / rect.height) * height
    if (containerRef.current) setContainerRect(containerRef.current.getBoundingClientRect())
    if (pathData.points.length === 0) return
    let nearest = 0
    let nearestDx = Math.abs(pathData.points[0].x - x)
    for (let i = 1; i < pathData.points.length; i++) {
      const dx = Math.abs(pathData.points[i].x - x)
      if (dx < nearestDx) {
        nearestDx = dx
        nearest = i
      }
    }
    setHoverIndex(nearest)
  }

  const handleMouseLeave = () => {
    setHoverIndex(null)
    setContainerRect(null)
  }

  const tooltipStyle = useMemo(() => {
    if (hoverIndex == null || !containerRect || !pathData.points[hoverIndex]) return undefined
    const point = pathData.points[hoverIndex]
    const scale = Math.min(containerRect.width / width, containerRect.height / height)
    const offsetX = (containerRect.width - width * scale) / 2
    const offsetY = (containerRect.height - height * scale) / 2
    const px = offsetX + point.x * scale
    const py = offsetY + point.y * scale
    let left = px - TOOLTIP_WIDTH / 2
    let top = py - TOOLTIP_HEIGHT - TOOLTIP_OFFSET
    left = Math.max(8, Math.min(containerRect.width - TOOLTIP_WIDTH - 8, left))
    top = Math.max(8, Math.min(containerRect.height - TOOLTIP_HEIGHT - 8, top))
    if (top > py - TOOLTIP_HEIGHT - 4) top = py + TOOLTIP_OFFSET
    return { left: `${left}px`, top: `${top}px` }
  }, [hoverIndex, containerRect, pathData.points])

  const yTicks = [0, 5000, 10000, 15000]
  const gridY = yTicks.map(v => {
    const y = padding.top + innerHeight - ((v - minVal) / (maxVal - minVal)) * innerHeight
    return { v, y }
  })

  return (
    <div ref={containerRef} className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-64"
        preserveAspectRatio="xMidYMid meet"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          <linearGradient id="influenceArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {gridY.map(({ v, y }) => (
          <g key={v}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
            <text x={padding.left - 6} y={y + 4} textAnchor="end" className="fill-slate-400 text-[10px] font-bold" style={{ fontFamily: 'system-ui' }}>{v >= 1000 ? `${v / 1000}k` : v}</text>
          </g>
        ))}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <line key={i} x1={padding.left + t * innerWidth} y1={padding.top} x2={padding.left + t * innerWidth} y2={height - padding.bottom} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
        ))}
        {/* Area fill */}
        <path d={pathData.areaPath} fill="url(#influenceArea)" />
        {/* Line */}
        <path d={pathData.linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Hover dot */}
        {hoverIndex != null && pathData.points[hoverIndex] && (
          <g>
            <circle cx={pathData.points[hoverIndex].x} cy={pathData.points[hoverIndex].y} r="6" fill="#3b82f6" stroke="white" strokeWidth="2" />
            <line x1={pathData.points[hoverIndex].x} y1={pathData.points[hoverIndex].y} x2={pathData.points[hoverIndex].x} y2={height - padding.bottom} stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
          </g>
        )}
        {/* X-axis labels */}
        {INFLUENCE_CHART_DATA.filter((_, i) => i % 2 === 0).map((d, i) => {
          const idx = i * 2
          const x = padding.left + (idx / (INFLUENCE_CHART_DATA.length - 1)) * innerWidth
          return <text key={d.day} x={x} y={height - 8} textAnchor="middle" className="fill-slate-400 text-[10px] font-bold" style={{ fontFamily: 'system-ui' }}>{d.label}</text>
        })}
      </svg>
      {hoverIndex != null && pathData.points[hoverIndex] && tooltipStyle && (
        <div
          className="absolute z-10 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg shadow-lg border border-slate-700 pointer-events-none"
          style={tooltipStyle}
        >
          <div className="text-slate-300 font-medium">{pathData.points[hoverIndex].label}</div>
          <div className="text-blue-300">{pathData.points[hoverIndex].value.toLocaleString()} profile views</div>
        </div>
      )}
    </div>
  )
}

const DAILY_TASKS_STORAGE_KEY = 'wouldyoutry_daily_tasks'

interface DailyTaskItem {
  id: string
  task: string
  done: boolean
}

const DEFAULT_DAILY_TASKS: DailyTaskItem[] = [
  { id: '1', task: 'Update surplus inventory', done: true },
  { id: '2', task: 'Reply to 5 fan comments', done: false },
  { id: '3', task: 'Publish Week 12 Report', done: false },
]

function loadStoredTasks(): DailyTaskItem[] {
  try {
    const raw = localStorage.getItem(DAILY_TASKS_STORAGE_KEY)
    if (!raw) return DEFAULT_DAILY_TASKS
    const parsed = JSON.parse(raw) as DailyTaskItem[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DAILY_TASKS
  } catch {
    return DEFAULT_DAILY_TASKS
  }
}

function saveTasks(tasks: DailyTaskItem[]) {
  localStorage.setItem(DAILY_TASKS_STORAGE_KEY, JSON.stringify(tasks))
}

function DailyTasksCard() {
  const [tasks, setTasks] = useState<DailyTaskItem[]>(loadStoredTasks)
  const [isAdding, setIsAdding] = useState(false)
  const [newTaskText, setNewTaskText] = useState('')

  const remaining = useMemo(() => tasks.filter(t => !t.done).length, [tasks])

  const toggleTask = (id: string) => {
    setTasks(prev => {
      const next = prev.map(t => t.id === id ? { ...t, done: !t.done } : t)
      saveTasks(next)
      return next
    })
  }

  const addTask = () => {
    const trimmed = newTaskText.trim()
    if (!trimmed) return
    const newTask: DailyTaskItem = { id: crypto.randomUUID?.() ?? `t-${Date.now()}`, task: trimmed, done: false }
    setTasks(prev => {
      const next = [...prev, newTask]
      saveTasks(next)
      return next
    })
    setNewTaskText('')
    setIsAdding(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="bg-white rounded-[48px] p-10 border border-slate-200">
      <div className="flex items-center justify-between mb-8">
        <h4 className="font-[1000] text-xl text-slate-900 flex items-center gap-3"><CheckCircle2 size={24} className="text-blue-500" /> Daily Tasks</h4>
        <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-3 py-1 rounded-full">{remaining} REMAINING</span>
      </div>
      <div className="space-y-5">
        {tasks.map(t => (
          <div
            key={t.id}
            role="button"
            tabIndex={0}
            onClick={() => toggleTask(t.id)}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTask(t.id) } }}
            className={`flex items-center gap-4 cursor-pointer group transition-opacity duration-200 ${t.done ? 'opacity-70' : ''}`}
          >
            <div className={`w-7 h-7 rounded-xl border flex items-center justify-center transition-all flex-shrink-0 ${t.done ? 'bg-green-500 border-green-500' : 'border-slate-300 group-hover:border-slate-900'}`}>
              {t.done && <CheckCircle2 size={16} className="text-white" />}
            </div>
            <span className={`text-sm font-bold transition-all ${t.done ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{t.task}</span>
          </div>
        ))}
        {isAdding ? (
          <div className="flex flex-wrap items-center gap-2 pt-1 min-w-0">
            <input
              type="text"
              value={newTaskText}
              onChange={e => setNewTaskText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Task name..."
              className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            <div className="flex items-center gap-2 flex-shrink-0">
              <button type="button" onClick={addTask} className="px-4 py-2.5 rounded-xl bg-blue-500 text-white text-sm font-bold hover:bg-blue-600 transition-colors whitespace-nowrap">Add</button>
              <button type="button" onClick={() => { setIsAdding(false); setNewTaskText('') }} className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors whitespace-nowrap">Cancel</button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-bold text-sm hover:border-slate-300 hover:text-slate-700 hover:bg-slate-50 transition-all"
          >
            <Plus size={18} /> Add Task
          </button>
        )}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto py-8 space-y-10">
      <div className="grid grid-cols-12 gap-10">

        {/* Hero stat card */}
        <div className="col-span-12">
          <div className="bg-slate-900 rounded-[64px] p-16 text-white relative overflow-hidden flex items-center justify-between">
            <div className="relative z-10 flex-1">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-20 h-20 rounded-[30px] overflow-hidden border-4 border-white/20">
                  <img src="https://i.pravatar.cc/150?u=brunchmanager" className="w-full h-full object-cover" alt="Manager" draggable={false} />
                </div>
                <div>
                  <h2 className="text-6xl font-[1000] tracking-tighter leading-none mb-2">Yarra Kitchen Manager</h2>
                  <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-400" /> Verified Eco-Partner 2026
                  </p>
                </div>
              </div>
              <div className="flex gap-16">
                <div><p className="text-5xl font-[1000] text-green-400 tracking-tighter">#34</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">National Rank</p></div>
                <div className="w-px h-16 bg-white/10" />
                <div><p className="text-5xl font-[1000] text-blue-400 tracking-tighter">12.8k</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Monthly Reach</p></div>
                <div className="w-px h-16 bg-white/10" />
                <div><p className="text-5xl font-[1000] text-yellow-400 tracking-tighter">1.4k</p><p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Engagement Rate</p></div>
              </div>
            </div>
            <div className="relative z-10 w-[300px] h-[180px] flex items-end gap-3 bg-white/5 p-8 rounded-[40px] border border-white/10 backdrop-blur-xl">
              {[40, 75, 50, 95, 60, 85, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-white/10 rounded-t-xl relative overflow-hidden group">
                  <div className="absolute bottom-0 w-full bg-green-500 group-hover:bg-green-400 transition-all duration-1000" style={{ height: `${h}%` }} />
                </div>
              ))}
            </div>
            <Sparkles className="absolute -bottom-20 -right-20 text-white/5 w-[500px] h-[500px] rotate-12" />
          </div>
        </div>

        {/* Metrics */}
        <div className="col-span-8 space-y-10">
          <div className="bg-white rounded-[56px] p-12 border border-slate-200 relative overflow-hidden">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="text-3xl font-[1000] text-slate-900 tracking-tight flex items-center gap-3">
                  <BarChart3 size={32} className="text-blue-500" /> Influence Growth
                </h3>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time Performance Metrics</p>
              </div>
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-2xl border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-green-700 uppercase tracking-widest">Live Tracking</span>
              </div>
            </div>
            <div className="mb-8">
              <InfluenceGrowthChart />
            </div>
            <div className="grid grid-cols-4 gap-8 pt-10 border-t border-slate-100">
              {[
                { label: "Profile Views", val: "14,842", delta: "+15%", up: true },
                { label: "Engagement", val: "18.4%", delta: "+4%", up: true },
                { label: "Viral Shares", val: "1,245", delta: "+24%", up: true },
                { label: "Saves", val: "890", delta: "-2%", up: false }
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-3xl font-[1000] text-slate-900">{stat.val}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${stat.up ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>{stat.delta}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div className="bg-white rounded-[40px] p-10 border border-slate-200 flex flex-col items-center">
              <h4 className="font-black text-slate-900 w-full mb-6">Waste Saved by Category</h4>
              <div className="relative w-40 h-40 mb-6">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  <path className="text-slate-100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-green-500" strokeDasharray="50, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-blue-500" strokeDasharray="30, 100" strokeDashoffset="-50" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-orange-500" strokeDasharray="20, 100" strokeDashoffset="-80" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black">85</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">KG Total</span>
                </div>
              </div>
              <div className="w-full space-y-2">
                {[['bg-green-500', 'Produce', '50%'], ['bg-blue-500', 'Bakery', '30%'], ['bg-orange-500', 'Dairy', '20%']].map(([color, label, pct]) => (
                  <div key={label} className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2 font-bold"><div className={`w-2 h-2 rounded-full ${color}`} /> {label}</span>
                    <span className="text-slate-500 font-black">{pct}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[40px] p-10 text-white flex flex-col justify-between">
              <div>
                <h4 className="font-black text-slate-100 flex items-center gap-2 mb-2"><TrendingUp size={18} className="text-green-400" /> Revenue Recovery</h4>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">Value generated from off-menu surplus sales this month.</p>
              </div>
              <div>
                <p className="text-5xl font-black text-white tracking-tighter mb-4">$3,240 <span className="text-sm text-slate-400">AUD</span></p>
                <div className="bg-white/10 p-4 rounded-2xl border border-white/5">
                  <p className="text-[10px] font-black uppercase text-green-400 mb-1">+12% vs Last Month</p>
                  <p className="text-xs text-slate-300">Equivalent to saving approx. 40 meals.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-4 space-y-10">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-[56px] p-12 text-white relative overflow-hidden cursor-pointer"
            onClick={() => window.open('https://qkhnh.github.io/PrepBrain/', '_blank')}>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-[24px] flex items-center justify-center mb-8 shadow-xl">
                <ChefHat size={32} />
              </div>
              <h3 className="text-3xl font-[1000] mb-4 leading-tight">Leftover Recipe Generator</h3>
              <p className="text-purple-100 text-sm font-medium mb-10 leading-relaxed">Turn today's leftovers into tomorrow's signature off-menu dish.</p>
              <button className="w-full bg-white text-purple-600 py-5 rounded-[24px] font-[1000] text-xs hover:bg-slate-50 hover:scale-105 transition-all flex items-center justify-center gap-2">
                Launch Generator <ArrowRight size={16} />
              </button>
            </div>
            <Zap className="absolute -top-10 -right-10 text-white/5 w-64 h-64 rotate-45" />
          </div>

          <DailyTasksCard />
        </div>
      </div>
    </div>
  )
}