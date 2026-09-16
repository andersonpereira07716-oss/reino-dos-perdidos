import { useState } from 'react';


const translations = {
  pt: {
    level: "Nível",
    gold: "Ouro",
    kills: "Abates",
    shop: "Loja de Armas",
    talents: "Árvore de Talentos",
    prestige: "Sistema de Prestígio",
    monsters: [
      { name: 'Orc Guerreiro', reward: '+30 Ouro' },
      { name: 'Golem de Pedra', reward: '+65 Ouro' },
      { name: 'Dragão Sombrio', reward: '+130 Ouro' },
      { name: 'Lorde das Sombras', reward: '+280 Ouro' },
    ]
  },
  en: {
    level: "Level",
    gold: "Gold",
    kills: "Kills",
    shop: "Weapon Shop",
    talents: "Talent Tree",
    prestige: "Prestige System",
    monsters: [
      { name: 'Warrior Orc', reward: '+30 Gold' },
      { name: 'Stone Golem', reward: '+65 Gold' },
      { name: 'Shadow Dragon', reward: '+130 Gold' },
      { name: 'Shadow Lord', reward: '+280 Gold' },
    ]
  },
  es: {
    level: "Nivel",
    gold: "Oro",
    kills: "Bajas",
    shop: "Tienda de Armas",
    talents: "Árbol de Talentos",
    prestige: "Sistema de Prestigio",
    monsters: [
      { name: 'Orco Guerrero', reward: '+30 Oro' },
      { name: 'Gólem de Piedra', reward: '+65 Oro' },
      { name: 'Dragón Sombrío', reward: '+130 Oro' },
      { name: 'Señor de las Sombras', reward: '+280 Oro' },
    ]
  }
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('reino_lang') || 'pt');
  const t = translations[lang as keyof typeof translations];

  const changeLanguage = (newLang: string) => {
    setLang(newLang);
    localStorage.setItem('reino_lang', newLang);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#030712', color: '#fff', position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
      
      {/* SELETOR DE IDIOMA */}
      <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '5px', zIndex: 15 }}>
        {['pt', 'en', 'es'].map((l) => (
          <button 
            key={l} 
            onClick={() => changeLanguage(l)} 
            style={{ 
              background: lang === l ? '#f59e0b' : '#1e293b', 
              color: lang === l ? '#020617' : '#fff', 
              border: '1px solid #f59e0b', 
              borderRadius: '6px', 
              padding: '4px 8px', 
              fontSize: '10px', 
              fontWeight: 'bold', 
              cursor: 'pointer' 
            }}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '75px 20px', boxSizing: 'border-box' }}>
        <div style={{ background: 'rgba(0,0,0,0.85)', border: '1px solid rgba(245,158,11,0.5)', borderRadius: '24px', padding: '16px', width: '100%', maxWidth: '310px', boxSizing: 'border-box', textAlign: 'center' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#f59e0b', margin: '0 0 2px 0' }}>Hank ({t.level} 1)</h2>
          <div style={{ fontSize: '10px', color: '#fbbf24', marginBottom: '8px' }}>🪙 50 {t.gold} • ⚔️ 0 {t.kills}</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button style={{ padding: '8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: '#7f1d1d', color: '#fca5a5', border: '1px solid #ef4444', cursor: 'pointer' }}>👹 {t.monsters[0].name} ({t.monsters[0].reward})</button>
            <button style={{ padding: '8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: '#374151', color: '#e5e7eb', border: '1px solid #6b7280', cursor: 'pointer' }}>🗿 {t.monsters[1].name} ({t.monsters[1].reward})</button>
            <button style={{ padding: '8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: '#581c87', color: '#e9d5ff', border: '1px solid #a855f7', cursor: 'pointer' }}>🐉 {t.monsters[2].name} ({t.monsters[2].reward})</button>
            <button style={{ padding: '8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: '#451a03', color: '#fed7aa', border: '1px solid #ea580c', cursor: 'pointer' }}>👑 {t.monsters[3].name} ({t.monsters[3].reward})</button>
            <button style={{ padding: '8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: '#1e3a8a', color: '#93c5fd', border: '1px solid #3b82f6', cursor: 'pointer' }}>🏛️ {t.shop}</button>
            <button style={{ padding: '8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: '#0369a1', color: '#bae6fd', border: '1px solid #38bdf8', cursor: 'pointer' }}>✨ {t.talents}</button>
            <button style={{ padding: '8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', background: '#854d0e', color: '#fef08a', border: '1px solid #eab308', cursor: 'pointer' }}>👑 {t.prestige}</button>
          </div>
        </div>
      </div>

    </div>
  );
}
