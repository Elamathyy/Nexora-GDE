import { motion } from 'motion/react';
import { Calendar, Trophy, Users, ShieldAlert } from 'lucide-react';

const EVENTS = [
  {
    id: 1,
    title: "CyberStrike 2026",
    type: "Hackathon",
    date: "March 15-17",
    prize: "$10,000",
    participants: 1240,
    status: "Open",
    color: "cyber-blue"
  },
  {
    id: 2,
    title: "Nexus CTF: Zero Day",
    type: "Capture The Flag",
    date: "March 22",
    prize: "RTX 5090",
    participants: 850,
    status: "Open",
    color: "hacker-green"
  },
  {
    id: 3,
    title: "AI Security Summit",
    type: "Conference",
    date: "April 05",
    prize: "Certificates",
    participants: 3200,
    status: "Registration Full",
    color: "white"
  }
];

export default function Events() {
  return (
    <section id="events" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-4xl font-display font-bold mb-2">UPCOMING <span className="text-cyber-blue">MISSIONS</span></h2>
        <p className="text-white/50 font-mono">Deploy your skills in the next generation of cyber challenges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {EVENTS.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, rotateX: 5, rotateY: 5 }}
            className="glass-panel p-6 group cursor-pointer relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${event.color}/10 blur-3xl -mr-16 -mt-16 group-hover:bg-${event.color}/20 transition-all`} />
            
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl bg-white/5 border border-white/10 text-${event.color === 'cyber-blue' ? 'cyber-blue' : event.color === 'hacker-green' ? 'hacker-green' : 'white'}`}>
                {event.type === 'Hackathon' ? <Trophy size={24} /> : event.type === 'Capture The Flag' ? <ShieldAlert size={24} /> : <Users size={24} />}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded">
                {event.type}
              </span>
            </div>

            <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-cyber-blue transition-colors">{event.title}</h3>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center text-sm text-white/60 font-mono">
                <Calendar size={14} className="mr-2" />
                {event.date}
              </div>
              <div className="flex items-center text-sm text-white/60 font-mono">
                <Trophy size={14} className="mr-2" />
                Prize Pool: {event.prize}
              </div>
              <div className="flex items-center text-sm text-white/60 font-mono">
                <Users size={14} className="mr-2" />
                {event.participants} Registered
              </div>
            </div>

            <button className={event.color === 'hacker-green' ? 'cyber-button-green w-full' : 'cyber-button w-full'}>
              {event.status === 'Open' ? 'Register Now' : 'Waitlist'}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
