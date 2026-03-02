import Hero3D from './components/Hero3D';
import Events from './components/Events';
import CommunityFeed from './components/CommunityFeed';
import Leaderboard from './components/Leaderboard';
import AIChatbot from './components/AIChatbot';
import Navbar from './components/Navbar';
import { motion } from 'motion/react';
import { Globe } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-cyber-black text-white selection:bg-cyber-blue/30 selection:text-cyber-blue">
      <Navbar />
      
      <main>
        <Hero3D />
        
        <div className="relative z-10">
          {/* Background Gradient Orbs */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyber-blue/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-hacker-green/5 rounded-full blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Events />
            <CommunityFeed />
            <Leaderboard />
          </motion.div>
        </div>
      </main>

      <footer className="py-12 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
              <span className="font-bold text-xs">N</span>
            </div>
            <span className="text-lg font-display font-bold">NEXUS<span className="text-cyber-blue">HQ</span></span>
          </div>
          
          <div className="text-white/40 font-mono text-xs">
            © 2026 NEXUS ECOSYSTEM • ALL RIGHTS RESERVED • [DEPLOYATHON_2026]
          </div>

          <div className="flex items-center gap-6 text-white/40">
            <a href="#" className="hover:text-cyber-blue transition-colors"><span className="sr-only">GitHub</span><Globe size={20} /></a>
            <a href="#" className="hover:text-cyber-blue transition-colors"><span className="sr-only">Twitter</span><Globe size={20} /></a>
          </div>
        </div>
      </footer>

      <AIChatbot />
    </div>
  );
}
