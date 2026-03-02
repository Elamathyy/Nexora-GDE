import { motion } from 'motion/react';
import { Trophy, Award, Zap, Shield } from 'lucide-react';

const LEADERBOARD = [
  { rank: 1, user: "Neo_Cyber", points: 15420, level: 85, badge: "Grandmaster", color: "cyber-blue" },
  { rank: 2, user: "Ghost_In_Shell", points: 12850, level: 72, badge: "Elite Hunter", color: "hacker-green" },
  { rank: 3, user: "Bit_Cracker", points: 11200, level: 68, badge: "Pro Analyst", color: "white" },
  { rank: 4, user: "Cipher_Queen", points: 9800, level: 60, badge: "Pro Analyst", color: "white" },
  { rank: 5, user: "Root_Access", points: 8500, level: 55, badge: "Senior Scout", color: "white" },
];

export default function Leaderboard() {
  return (
    <section id="leaderboard" className="py-24 px-6 max-w-5xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-display font-bold mb-2">ELITE <span className="text-cyber-blue">RANKINGS</span></h2>
        <p className="text-white/50 font-mono">The top operators in the Nexus ecosystem.</p>
      </div>

      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-bottom border-white/10">
              <th className="p-6 font-mono text-xs uppercase tracking-widest text-white/40">Rank</th>
              <th className="p-6 font-mono text-xs uppercase tracking-widest text-white/40">Operator</th>
              <th className="p-6 font-mono text-xs uppercase tracking-widest text-white/40">Badge</th>
              <th className="p-6 font-mono text-xs uppercase tracking-widest text-white/40">Level</th>
              <th className="p-6 font-mono text-xs uppercase tracking-widest text-white/40 text-right">XP Points</th>
            </tr>
          </thead>
          <tbody>
            {LEADERBOARD.map((entry, idx) => (
              <motion.tr
                key={entry.rank}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group"
              >
                <td className="p-6">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold ${
                    entry.rank === 1 ? 'bg-cyber-blue text-cyber-black shadow-[0_0_15px_rgba(0,240,255,0.5)]' :
                    entry.rank === 2 ? 'bg-hacker-green text-cyber-black' :
                    'bg-white/10 text-white'
                  }`}>
                    {entry.rank}
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-cyber-blue transition-colors">
                      <Shield size={20} className={entry.rank === 1 ? 'text-cyber-blue' : 'text-white/60'} />
                    </div>
                    <span className="font-bold text-white group-hover:text-cyber-blue transition-colors">{entry.user}</span>
                  </div>
                </td>
                <td className="p-6">
                  <span className={`text-xs font-mono uppercase tracking-wider px-2 py-1 rounded border ${
                    entry.rank === 1 ? 'border-cyber-blue/30 text-cyber-blue bg-cyber-blue/5' :
                    entry.rank === 2 ? 'border-hacker-green/30 text-hacker-green bg-hacker-green/5' :
                    'border-white/10 text-white/60'
                  }`}>
                    {entry.badge}
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${entry.rank === 1 ? 'bg-cyber-blue' : 'bg-white/40'}`} 
                        style={{ width: `${(entry.level / 100) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono text-white/60">LVL {entry.level}</span>
                  </div>
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Zap size={14} className="text-cyber-blue" />
                    <span className="font-mono font-bold text-white">{entry.points.toLocaleString()}</span>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyber-blue/10 text-cyber-blue">
            <Trophy size={24} />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-white/40">Global Rank</div>
            <div className="text-2xl font-display font-bold">#1,240</div>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-hacker-green/10 text-hacker-green">
            <Award size={24} />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-white/40">Badges Earned</div>
            <div className="text-2xl font-display font-bold">12</div>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-white/10 text-white">
            <Zap size={24} />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-white/40">Current Streak</div>
            <div className="text-2xl font-display font-bold">15 Days</div>
          </div>
        </div>
      </div>
    </section>
  );
}
