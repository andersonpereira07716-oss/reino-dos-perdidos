import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'caverna_do_dragao_rpg_v3';

const translations = {
  PT: {
    level: 'Nível',
    gold: 'Ouro',
    kills: 'Abates',
    shop: 'Loja de Armas',
    talents: 'Árvore de Talentos',
    prestige: 'Sistema de Prestígio / Reset',
    insufficientGold: 'Ouro insuficiente!',
    resetConfirm: 'Deseja resetar o progresso atual?',
    monsters: ['Orc Guerreiro', 'Golem de Pedra', 'Dragão Sombrio', 'Lorde das Sombras']
  },
  EN: {
    level: 'Level',
    gold: 'Gold',
    kills: 'Kills',
    shop: 'Weapon Shop',
    talents: 'Talent Tree',
    prestige: 'Prestige System / Reset',
    insufficientGold: 'Not enough gold!',
    resetConfirm: 'Do you want to reset current progress?',
    monsters: ['Orc Warrior', 'Stone Golem', 'Shadow Dragon', 'Shadow Lord']
  },
  ES: {
    level: 'Nivel',
    gold: 'Oro',
    kills: 'Bajas',
    shop: 'Tienda de Armas',
    talents: 'Árbol de Talentos',
    prestige: 'Sistema de Prestigio / Reiniciar',
    insufficientGold: '¡Oro insuficiente!',
    resetConfirm: '¿Deseas reiniciar el progreso actual?',
    monsters: ['Orco Guerrero', 'Gólem de Piedra', 'Dragón Sombrío', 'Señor de las Sombras']
  }
};

const defaultGameState = {
  playerName: 'Hank',
  level: 1,
  gold: 50,
  kills: 0,
  critChance: 10,
  damageMultiplier: 1,
  weaponLevel: 1,
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

  const t = translations[state.language] || translations.PT;

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
    const earnedGold = Math.round(baseGold * state.damageMultiplier * state.weaponLevel * multiplier);

    const newGold = state.gold + earnedGold;
    const newKills = state.kills + 1;
    const newLevel = Math.floor(newKills / 10) + 1;

    addFloatingText(isCrit ? `CRÍTICO! +${earnedGold}` : `+${earnedGold}`, isCrit ? 'crit' : 'gold');

    setState(prev => ({
      ...prev,
      gold: newGold,
      kills: newKills,
      level: newLevel
    }));
  };

  const buyWeapon = () => {
    const cost = state.weaponLevel * 120;
    if (state.gold >= cost) {
      setState(prev => ({
        ...prev,
        gold: prev.gold - cost,
        weaponLevel: prev.weaponLevel + 1
      }));
      addFloatingText('Arma Melhores!', 'crit');
    } else {
      alert(t.insufficientGold);
    }
  };

  const buyTalent = () => {
    const cost = state.critChance * 15;
    if (state.gold >= cost) {
      setState(prev => ({
        ...prev,
        gold: prev.gold - cost,
        critChance: prev.critChance + 5
      }));
      addFloatingText('Crítico +5%!', 'crit');
    } else {
      alert(t.insufficientGold);
    }
  };

  const rawMonsters = [
    { baseGold: 30, color: 'from-red-900 to-red-950 border-red-700' },
    { baseGold: 65, color: 'from-slate-700 to-slate-900 border-slate-600' },
    { baseGold: 130, color: 'from-purple-900 to-indigo-950 border-purple-700' },
    { baseGold: 280, color: 'from-amber-900 to-yellow-950 border-amber-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-amber-100 flex flex-col items-center justify-center p-4 font-sans select-none relative overflow-hidden">
      
      {/* Efeitos Flutuantes */}
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

      {/* Idiomas */}
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

      {/* Caixa do Jogo */}
      <div className="w-full max-w-sm bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 text-center backdrop-blur-sm">
        
        <div>
          <h1 className="text-xl font-black text-amber-400 tracking-wide">
            {state.playerName} ({t.level} {state.level})
          </h1>
          <p className="text-xs text-amber-200/80 mt-1 flex justify-center gap-3 font-semibold">
            <span>🪙 {state.gold} {t.gold}</span>
            <span>⚔️ {state.kills} {t.kills}</span>
          </p>
        </div>

        {/* Lista de Batalha */}
        <div className="flex flex-col gap-2">
          {rawMonsters.map((m, idx) => {
            const monsterName = t.monsters[idx];
            const reward = Math.round(m.baseGold * state.weaponLevel);
            return (
              <button
                key={idx}
                onClick={() => handleAttack(m.baseGold, monsterName)}
                className={`bg-gradient-to-r ${m.color} hover:brightness-125 border py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow transition-transform active:scale-95 flex justify-between items-center`}
              >
                <span>👹 {monsterName}</span>
                <span className="bg-black/40 px-2 py-0.5 rounded text-amber-300">+{reward} Ouro</span>
              </button>
            );
          })}
        </div>

        {/* Lojas e Talentos */}
        <div className="flex flex-col gap-2 mt-1">
          <button 
            onClick={buyWeapon}
            className="bg-slate-800 hover:bg-slate-750 border border-blue-500/40 text-blue-300 py-2 rounded-xl text-xs font-semibold transition active:scale-95 flex justify-between px-4"
          >
            <span>🏛️ {t.shop} (Nv. {state.weaponLevel})</span>
            <span className="text-amber-400 font-bold">{state.weaponLevel * 120} Ouro</span>
          </button>

          <button 
            onClick={buyTalent}
            className="bg-slate-800 hover:bg-slate-750 border border-teal-500/40 text-teal-300 py-2 rounded-xl text-xs font-semibold transition active:scale-95 flex justify-between px-4"
          >
            <span>✨ {t.talents} ({state.critChance}% Crit)</span>
            <span className="text-amber-400 font-bold">{state.critChance * 15} Ouro</span>
          </button>

          <button 
            onClick={() => {
              if (confirm(t.resetConfirm)) {
                setState(defaultGameState);
                localStorage.removeItem(STORAGE_KEY);
              }
            }}
            className="bg-slate-900 hover:bg-red-950/40 border border-red-900/40 text-red-400 py-1.5 rounded-xl text-[10px] font-semibold transition mt-1"
          >
            👑 {t.prestige}
          </button>
        </div>

      </div>

    </div>
  );
}
