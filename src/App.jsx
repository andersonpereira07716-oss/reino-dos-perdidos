import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'caverna_do_dragao_rpg_v2';

const defaultGameState = {
  playerName: 'Hank',
  level: 1,
  gold: 50,
  kills: 0,
  critChance: 10,
  damageMultiplier: 1,
  language: 'PT',
  floatingTexts: []
};

export default function App() {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultGameState, ...JSON.parse(saved) } : defaultGameState;
    } catch (e) {
      return defaultGameState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Erro ao salvar progresso', e);
    }
  }, [state]);

  const addFloatingText = (text, type = 'gold') => {
    const id = Date.now() + Math.random();
    setState(prev => ({
      ...prev,
      floatingTexts: [...prev.floatingTexts, { id, text, type }]
    }));

    setTimeout(() => {
      setState(prev => ({
        ...prev,
        floatingTexts: prev.floatingTexts.filter(item => item.id !== id)
      }));
    }, 1000);
  };

  const handleAttack = (baseGold, monsterName) => {
    const isCrit = Math.random() * 100 < state.critChance;
    const multiplier = isCrit ? 2 : 1;
    const earnedGold = Math.round(baseGold * state.damageMultiplier * multiplier);

    const newGold = state.gold + earnedGold;
    const newKills = state.kills + 1;
    const newLevel = Math.floor(newKills / 10) + 1;

    addFloatingText(isCrit ? `CRITICO! +${earnedGold} Ouro` : `+${earnedGold} Ouro`, isCrit ? 'crit' : 'gold');

    setState(prev => ({
      ...prev,
      gold: newGold,
      kills: newKills,
      level: newLevel
    }));
  };

  const monsters = [
    { name: 'Orc Guerreiro', gold: 30, color: 'from-red-900 to-red-950 border-red-700' },
    { name: 'Golem de Pedra', gold: 65, color: 'from-slate-700 to-slate-900 border-slate-600' },
    { name: 'Dragao Sombrio', gold: 130, color: 'from-purple-900 to-indigo-950 border-purple-700' },
    { name: 'Lorde das Sombras', gold: 280, color: 'from-amber-900 to-yellow-950 border-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-amber-100 flex flex-col items-center justify-center p-4 font-sans select-none relative overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        {state.floatingTexts.map(item => (
          <span 
            key={item.id} 
            className={`absolute animate-bounce text-sm font-black drop-shadow-lg ${
              item.type === 'crit' ? 'text-yellow-300 scale-125' : 'text-amber-400'
            }`}
            style={{
              top: `${40 + (Math.random() * 20 - 10)}%`,
              left: `${50 + (Math.random() * 30 - 15)}%`
            }}
          >
            {item.text}
          </span>
        ))}
      </div>

      <div className="absolute top-4 right-4 flex gap-1">
        {['PT', 'EN', 'ES'].map(lang => (
          <button 
            key={lang}
            onClick={() => setState({ ...state, language: lang })}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition ${
              state.language === lang 
                ? 'bg-amber-500 text-slate-950 border-amber-400' 
                : 'bg-slate-900 text-amber-300 border-amber-600/30'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      <div className="w-full max-w-sm bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-center backdrop-blur-sm">
        
        <div>
          <h1 className="text-xl font-black text-amber-400 tracking-wide">
            {state.playerName} (Nivel {state.level})
          </h1>
          <p className="text-xs text-amber-200/80 mt-1 flex justify-center gap-3 font-semibold">
            <span>Ouro: {state.gold}</span>
            <span>Abates: {state.kills}</span>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {monsters.map((m, idx) => (
            <button
              key={idx}
              onClick={() => handleAttack(m.gold, m.name)}
              className={`bg-gradient-to-r ${m.color} hover:brightness-125 border py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow transition-transform active:scale-95 flex justify-between items-center`}
            >
              <span>{m.name}</span>
              <span className="bg-black/40 px-2 py-0.5 rounded text-amber-300">+{m.gold} Ouro</span>
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <button 
            onClick={() => {
              if (state.gold >= 100) {
                setState({ ...state, gold: state.gold - 100, critChance: state.critChance + 5 });
                addFloatingText('Critico +5%!', 'crit');
              } else {
                alert('Ouro insuficiente!');
              }
            }}
            className="bg-slate-800 border border-blue-500/40 text-blue-300 py-2 rounded-xl text-xs font-semibold transition active:scale-95"
          >
            Loja de Armas (Custo: 100 Ouro)
          </button>

          <button 
            onClick={() => {
              if (state.gold >= 250) {
                setState({ ...state, gold: state.gold - 250, damageMultiplier: state.damageMultiplier + 0.5 });
                addFloatingText('Dano Aumentado!', 'crit');
              } else {
                alert('Ouro insuficiente!');
              }
            }}
            className="bg-slate-800 border border-teal-500/40 text-teal-300 py-2 rounded-xl text-xs font-semibold transition active:scale-95"
          >
            Arvore de Talentos (Custo: 250 Ouro)
          </button>

          <button 
            onClick={() => {
              if (confirm('Deseja resetar o progresso atual?')) {
                setState(defaultGameState);
                localStorage.removeItem(STORAGE_KEY);
              }
            }}
            className="bg-slate-900 border border-red-900/40 text-red-400 py-1.5 rounded-xl text-[10px] font-semibold transition"
          >
            Sistema de Prestigio / Reset
          </button>
        </div>

      </div>

    </div>
  );
}
