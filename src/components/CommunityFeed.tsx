import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, MessageSquare, Heart, Share2, User, ShieldCheck } from 'lucide-react';

const INITIAL_POSTS = [
  {
    id: 1,
    author: "CyberSentinel",
    role: "Core Developer",
    content: "Just finished implementing the new quantum-resistant encryption layer for NexusHQ. Security first! 🛡️",
    timestamp: "2h ago",
    likes: 42,
    comments: 12,
    verified: true
  },
  {
    id: 2,
    author: "ZeroDayHunter",
    role: "Security Researcher",
    content: "Found a fascinating vulnerability in a popular IoT protocol today. Writing up the disclosure now. Stay safe out there.",
    timestamp: "5h ago",
    likes: 128,
    comments: 34,
    verified: false
  }
];

export default function CommunityFeed() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      author: "You",
      role: "Nexus Member",
      content: newPost,
      timestamp: "Just now",
      likes: 0,
      comments: 0,
      verified: false
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <section id="community" className="py-24 px-6 max-w-3xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-display font-bold mb-2">COMMUNITY <span className="text-cyber-blue">FEED</span></h2>
        <p className="text-white/50 font-mono">Connect with the elite minds of the ecosystem.</p>
      </div>

      {/* Post Input */}
      <div className="glass-panel p-6 mb-8">
        <div className="flex gap-4">
          <div className="w-12 h-12 rounded-full bg-cyber-blue/20 border border-cyber-blue/30 flex items-center justify-center text-cyber-blue">
            <User size={24} />
          </div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Share a threat update or breakthrough..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyber-blue/50 transition-all resize-none h-24"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handlePost}
                className="cyber-button flex items-center gap-2"
              >
                <Send size={16} />
                Broadcast
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-6">
        <AnimatePresence initial={false}>
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    <User size={20} className="text-white/60" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white">{post.author}</span>
                      {post.verified && <ShieldCheck size={14} className="text-cyber-blue" />}
                    </div>
                    <span className="text-xs text-white/40 font-mono uppercase tracking-wider">{post.role} • {post.timestamp}</span>
                  </div>
                </div>
              </div>

              <p className="text-white/80 leading-relaxed mb-6">
                {post.content}
              </p>

              <div className="flex items-center gap-6 border-t border-white/5 pt-4">
                <button className="flex items-center gap-2 text-white/40 hover:text-cyber-blue transition-colors text-sm">
                  <Heart size={18} />
                  {post.likes}
                </button>
                <button className="flex items-center gap-2 text-white/40 hover:text-cyber-blue transition-colors text-sm">
                  <MessageSquare size={18} />
                  {post.comments}
                </button>
                <button className="flex items-center gap-2 text-white/40 hover:text-cyber-blue transition-colors text-sm ml-auto">
                  <Share2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
