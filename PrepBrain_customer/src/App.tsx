import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import FeedPage from './pages/FeedPage'
import RankingPage from './pages/RankingPage'
import HallOfFamePage from './pages/HallOfFamePage'
import ExplorePage from './pages/ExplorePage'
import DashboardPage from './pages/DashboardPage'
import type { ActiveTab } from './types'

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('feed')

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-slate-900 font-sans pb-12">
      <Navbar activeTab={activeTab} onChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-10">
        {activeTab === 'feed'       && <FeedPage />}
        {activeTab === 'ranking'    && <RankingPage />}
        {activeTab === 'halloffame' && <HallOfFamePage />}
        {activeTab === 'map'        && <ExplorePage />}
        {activeTab === 'dashboard'  && <DashboardPage />}
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}