import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Shield, Menu, X, Github, Twitter, Globe } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Missions', href: '#events' },
    { name: 'Community', href: '#community' },
    { name: 'Rankings', href: '#leaderboard' },
    { name: 'Docs', href: '#' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-cyber-black/80 backdrop-blur-lg border-b border-white/10 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-cyber-blue flex items-center justify-center text-cyber-black group-hover:rotate-12 transition-transform">
            <Shield size={24} />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter">
            NEXUS<span className="text-cyber-blue">HQ</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-mono uppercase tracking-widest text-white/60 hover:text-cyber-blue transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="cyber-button text-xs">
            Connect Wallet
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-cyber-black border-b border-white/10"
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-mono uppercase tracking-widest text-white/60 hover:text-cyber-blue transition-colors"
            >
              {link.name}
            </a>
          ))}
          <button className="cyber-button w-full">
            Connect Wallet
          </button>
        </div>
      </motion.div>
    </nav>
  );
}
