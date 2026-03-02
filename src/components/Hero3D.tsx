import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Text, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'motion/react';

function TypingText({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, [text]);

  return <span>{displayedText}<span className="animate-pulse">_</span></span>;
}

function CyberCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.2;
    meshRef.current.rotation.y = time * 0.3;
    
    // Mouse tracking effect
    const targetX = state.mouse.x * 0.5;
    const targetY = state.mouse.y * 0.5;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere
        ref={meshRef}
        args={[1, 64, 64]}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <MeshDistortMaterial
          color={hovered ? "#39FF14" : "#00F0FF"}
          attach="material"
          distort={0.4}
          speed={4}
          wireframe
          transparent
          opacity={0.6}
        />
      </Sphere>
      {/* Inner Core */}
      <Sphere args={[0.4, 32, 32]}>
        <meshStandardMaterial
          color={hovered ? "#39FF14" : "#00F0FF"}
          emissive={hovered ? "#39FF14" : "#00F0FF"}
          emissiveIntensity={2}
        />
      </Sphere>
    </Float>
  );
}

function Particles() {
  const count = 500;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#00F0FF" transparent opacity={0.4} />
    </points>
  );
}

export default function Hero3D() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-cyber-black">
      <div className="absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#39FF14" />
          <CyberCore />
          <Particles />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-8xl md:text-9xl font-display font-bold tracking-tighter text-white mb-4">
            NEXUS<span className="text-cyber-blue">HQ</span>
          </h1>
          <div className="h-8">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-cyber-blue font-mono text-xl tracking-[0.2em] uppercase"
            >
              <TypingText text="Secure. Analyze. Evolve." />
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Live Ticker */}
      <div className="absolute bottom-0 w-full bg-cyber-blue/10 backdrop-blur-md border-t border-cyber-blue/20 py-2 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="mx-8 text-xs font-mono text-cyber-blue uppercase tracking-widest">
              [SYSTEM] THREAT LEVEL: LOW • [NEWS] NEXUS V2.0 DEPLOYED • [ALERT] NEW CTF STARTING IN 2H • [USER] @CYBER_GHOST JOINED THE HUB •
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
