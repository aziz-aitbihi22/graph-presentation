import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- BACKGROUND: Animated Graph Web (Mjehda o Bayna) ---
const InteractiveGraphBackground = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 70; // عدد النقط
    
    const resize = () => { 
      canvas.width = window.innerWidth; 
      canvas.height = window.innerHeight; 
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 3 + 1; // نجوم كبر شوية
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        
        // رسم النجمة (النقطة) بتوهج مجهد
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00f2ff';
        ctx.fillStyle = 'rgba(0, 242, 255, 0.9)'; // شفافية عالية باش تبان واضحة
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // رسم الخطوط بين النجوم
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 180) { // مسافة الربط
            ctx.shadowBlur = 0;
            ctx.strokeStyle = `rgba(0, 242, 255, ${0.4 - dist / 180})`; // خطوط باينة كتر
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize(); init(); animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  // زدت فـ الـ opacity ديال الكانفاس كامل
  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0, opacity: 0.8 }} />;
};

// --- SLIDES DATA (Bqa kima howa) ---
const slides = [
  { 
    title: "BIENVENUE", 
    isHome: true,
    mainTitle: "GRAPH NoSQL",
    subTitle: "Présentation sur les bases de données orientées graphe",
  },
  { 
    title: "DEFINITION COMPLETE", 
    isVertical: true,
    isSmallImage: true, 
    imageUrl: "/sql-vs-nosql.png",
    content: "Une base de données Graph NoSQL est un type de base de données non relationnelle qui stocke et organise les données sous forme de graphe. Ce graphe est composé de nœuds (nodes), de relations (relationships) et de propriétés (properties)."
  },
  { 
    title: "STRUCTURE D'UNE BASE GRAPH NoSQL", 
    isVertical: true, 
    imageUrl: "/image3.webp", 
    content: "1. Nœuds (Nodes) : Les nœuds représentent les entités du système (Utilisateur, Produit, Ville, etc.).\n2. Relations (Relationships) : Les relations relient deux nœuds entre eux.\n3. Propriétés (Properties) : Les propriétés sont des informations associées aux nœuds ou aux relations.\n4. Labels : Les labels permettent de définir le type d’un nœud."
  },
  { 
    title: "LANGAGES DE REQUETE", 
    content: "Les bases Graph NoSQL utilisent des langages spécifiques : - Cypher (Neo4j) - Gremlin (Apache TinkerPop).\n\nExemple de requête Cypher : MATCH (u:User)-[:ACHETE]->(p:Produit) RETURN u.nom, p.nom;"
  },
  { 
    title: "EXEMPLES D’UTILISATION", 
    content: "1. Réseaux sociaux : Gestion des amis, abonnements et recommandations (Facebook, LinkedIn).\n2. Systèmes de recommandation : Suggestion de produits ou de contenus (Amazon, Netflix).\n3. Détection de fraude : Analyse des relations suspectes (banques et assurances).\n4. Cartographie et navigation : Calcul de chemins et analyse de réseaux (GPS)."
  },
  { 
    title: "COMPARAISON AVEC LE RELATIONNEL", 
    isVertical: true,
    isSmallImage: true, 
    imageUrl: "/MicrosoftTeams-image-39.png", 
    content: "Base relationnelle : - Tables - Clés étrangères - Requêtes JOIN complexes - Langage SQL.\n\nGraph NoSQL : - Graphe - Relations directes - Traversées rapides - Langage Cypher / Gremlin."
  },
  { 
    title: "RESUME", 
    content: "Une base de données Graph NoSQL stocke les données sous forme de nœuds et de relations. Elle est particulièrement adaptée aux systèmes où les relations entre les données sont nombreuses et complexes."
  }
];

export default function App() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') setCurrent(prev => (prev < slides.length - 1 ? prev + 1 : prev));
      if (e.key === 'ArrowLeft') setCurrent(prev => (prev > 0 ? prev - 1 : prev));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const slide = slides[current];

  return (
    <div style={{ 
      width: '100vw', height: '100vh', background: '#020617', color: 'white', 
      display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, overflow: 'hidden' 
    }}>
      
      <style>{`
        .scroll-container::-webkit-scrollbar { width: 8px; }
        .scroll-container::-webkit-scrollbar-track { background: rgba(15, 23, 42, 0.5); border-radius: 10px; }
        .scroll-container::-webkit-scrollbar-thumb { background: #00f2ff; border-radius: 10px; box-shadow: 0 0 10px #00f2ff; }
        .scroll-container { scrollbar-width: thin; scrollbar-color: #00f2ff rgba(15, 23, 42, 0.5); }
      `}</style>

      <InteractiveGraphBackground />

      <div style={{ flex: 1, padding: '20px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 10 }}>
        <AnimatePresence mode="wait">
          <motion.div 
            key={current} 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -30 }} 
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {slide.isHome ? (
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '7.5rem', fontWeight: '900', color: '#00f2ff', textShadow: '0 0 40px #00f2ffcc', margin: 0 }}>{slide.mainTitle}</h1>
                <p style={{ fontSize: '2.2rem', color: '#cbd5e1', marginTop: '10px' }}>{slide.subTitle}</p>
              </div>
            ) : slide.isVertical ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '1350px', height: '100%' }}>
                <h1 style={{ color: '#00f2ff', fontSize: '2.8rem', marginBottom: '15px', textShadow: '0 0 15px #00f2ff88' }}>{slide.title}</h1>
                <div className="scroll-container" style={{ 
                    width: '100%', flex: 0.6, fontSize: '1.6rem', lineHeight: '1.5', 
                    background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)', 
                    padding: '25px 45px', borderRadius: '25px', border: '1px solid rgba(0, 242, 255, 0.4)', 
                    whiteSpace: 'pre-line', overflowY: 'auto', marginBottom: '20px' 
                }}>
                  {slide.content}
                </div>
                <div style={{ width: '100%', flex: 1.4, display: 'flex', justifyContent: 'center' }}>
                  <img src={slide.imageUrl} alt={slide.title} style={{ width: 'auto', height: '100%', maxHeight: '42vh', borderRadius: '20px', border: '2px solid #00f2ff', boxShadow: '0 0 30px rgba(0,242,255,0.4)', objectFit: 'contain' }} />
                </div>
              </div>
            ) : (
              <div style={{ width: '100%', maxWidth: '1350px' }}>
                <h1 style={{ color: '#00f2ff', fontSize: '3.8rem', marginBottom: '35px', textShadow: '0 0 15px #00f2ff88' }}>{slide.title}</h1>
                <div className="scroll-container" style={{ 
                  fontSize: '2rem', lineHeight: '1.7', background: 'rgba(15, 23, 42, 0.8)', 
                  padding: '55px', borderRadius: '35px', border: '1px solid rgba(0, 242, 255, 0.4)', 
                  whiteSpace: 'pre-line', overflowY: 'auto', maxHeight: '70vh' 
                }}>
                  {slide.content}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}