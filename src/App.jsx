import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'caverna_do_dragao_rpg_v8';

const playSound = (type) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'hit') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'crit') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } else if (type === 'buy') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    }
  } catch (e) {}
};

const translations = {
  PT: {
    level: 'Nível',
    gold: 'Ouro',
    kills: 'Abates',
    shop: 'Loja de Armas',
    talents: 'Árvore de Talentos',
    achievements: 'Conquistas',
    adButton: '📺 Assistir Anúncio (+500 Ouro)',
    prestige: 'Prestígio / Reset',
    insufficientGold: 'Ouro insuficiente!',
    resetConfirm: 'Deseja resetar o progresso atual?',
    monsters: [
      'Orc Guerreiro', 
      'Golem de Pedra', 
      'Dragão Sombrio', 
      'Lorde das Sombras', 
      'Mago Corrompido', 
      'Titã do Caos'
    ]
  },
  EN: {
    level: 'Level',
    gold: 'Gold',
    kills: 'Kills',
    shop: 'Weapon Shop',
    talents: 'Talent Tree',
    achievements: 'Achievements',
    adButton: '📺 Watch Ad (+500 Gold)',
    prestige: 'Prestige / Reset',
    insufficientGold: 'Not enough gold!',
    resetConfirm: 'Do you want to reset current progress?',
    monsters: [
      'Orc Warrior', 
      'Stone Golem', 
      'Shadow Dragon', 
      'Shadow Lord', 
      'Corrupted Mage', 
      'Chaos Titan'
    ]
  },
  ES: {
    level: 'Nivel',
    gold: 'Oro',
    kills: 'Bajas',
    shop: 'Tienda de Armas',
    talents: 'Árbol de Talentos',
    achievements: 'Logros',
    adButton: '📺 Ver Anuncio (+500 Oro)',
    prestige: 'Prestigio / Reiniciar',
    insufficientGold: '¡Oro insuficiente!',
    resetConfirm: '¿Deseas reiniciar el progreso actual?',
    monsters: [
      'Orco Guerrero', 
      'Gólem de Piedra', 
      'Dragón Sombrío', 
      'Señor de las Sombras', 
      'Mago Corrompido', 
      'Titán del Caos'
    ]
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
  claimedAchievements: [],
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
    } catch (e) {}
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
    }, 800);
  };

  const handleAttack = (baseGold) => {
    const isCrit = Math.random() * 100 < state.critChance;
    const earnedGold = Math.round(baseGold * state.damageMultiplier * state.weaponLevel * (isCrit ? 2 : 1));

    if (isCrit) playSound('crit');
    else playSound('hit');

    setState(prev => ({
      ...prev,
      gold: prev.gold + earnedGold,
      kills: prev.kills + 1,
      level: Math.floor((prev.kills + 1) / 15) + 1
    }));

    addFloatingText(isCrit ? `CRÍTICO! +${earnedGold}` : `+${earnedGold}`, isCrit ? 'crit' : 'gold');
  };

  const buyWeapon = () => {
    const cost = state.weaponLevel * 120;
    if (state.gold >= cost) {
      playSound('buy');
      setState(prev => ({
        ...prev,
        gold: prev.gold - cost,
        weaponLevel: prev.weaponLevel + 1
      }));
      addFloatingText('Arma Evoluída!', 'crit');
    } else {
      alert(t.insufficientGold);
    }
  };

  const buyTalent = () => {
    const cost = state.critChance * 15;
    if (state.gold >= cost) {
      playSound('buy');
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

  const watchAdForGold = () => {
    playSound('buy');
    setState(prev => ({ ...prev, gold: prev.gold + 500 }));
    addFloatingText('+500 Ouro!', 'crit');
  };

  const achievementsList = [
    { id: 1, target: 10, reward: 200, title: 'Iniciante (10 Abates)' },
    { id: 2, target: 50, reward: 1000, title: 'Guerreiro (50 Abates)' },
    { id: 3, target: 100, reward: 3000, title: 'Lendário (100 Abates)' }
  ];

  const claimAchievement = (ach) => {
    if (state.kills >= ach.target && !state.claimedAchievements.includes(ach.id)) {
      playSound('buy');
      setState(prev => ({
        ...prev,
        gold: prev.gold + ach.reward,
        claimedAchievements: [...prev.claimedAchievements, ach.id]
      }));
      addFloatingText(`+${ach.reward} Ouro!`, 'crit');
    }
  };

  const rawMonsters = [
    { baseGold: 30, color: 'from-red-900 to-red-950 border-red-700' },
    { baseGold: 65, color: 'from-slate-700 to-slate-900 border-slate-600' },
    { baseGold: 130, color: 'from-purple-900 to-indigo-950 border-purple-700' },
    { baseGold: 280, color: 'from-amber-900 to-yellow-950 border-amber-600' },
    { baseGold: 500, color: 'from-blue-900 to-cyan-950 border-blue-600' },
    { baseGold: 1000, color: 'from-rose-950 to-orange-950 border-rose-600' }
  ];

  return (
    <div className="min-h-screen w-full bg-slate-950 text-amber-100 flex flex-col items-center justify-start p-3 font-sans select-none relative">
      
      {/* Idiomas */}
      <div className="w-full max-w-sm flex justify-end gap-1 mb-2 z-10">
        {['PT', 'EN', 'ES'].map(lang => (
          <button 
            key={lang}
            onClick={() => setState(prev => ({ ...prev, language: lang }))}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition cursor-pointer ${
              state.language === lang 
                ? 'bg-amber-500 text-slate-950 border-amber-400' 
                : 'bg-slate-900 text-amber-300 border-amber-600/30'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Caixa do Jogo Principal */}
      <div className="w-full max-w-sm bg-slate-900 border border-amber-500/40 rounded-2xl p-3 shadow-2xl flex flex-col gap-2.5 text-center relative z-20">
        
        {/* Textos Flutuantes Isolados Apenas na Área do Card */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {state.floatingTexts.map(item => (
            <span 
              key={item.id} 
              className={`absolute animate-bounce text-xs font-black drop-shadow-lg ${
                item.type === 'crit' ? 'text-yellow-300 scale-110' : 'text-amber-400'
              }`}
              style={{
                top: `${30 + Math.random() * 40}%`,
                left: `${20 + Math.random() * 60}%`
              }}
            >
              {item.text}
            </span>
          ))}
        </div>

        <div>
          <h1 className="text-base font-black text-amber-400 tracking-wide">
            {state.playerName} ({t.level} {state.level})
          </h1>
          <p className="text-xs text-amber-200/80 mt-0.5 flex justify-center gap-3 font-semibold">
            <span>🪙 {state.gold} {t.gold}</span>
            <span>⚔️ {state.kills} {t.kills}</span>
          </p>
        </div>

        {/* Botão de Anúncio */}
        <button
          onClick={watchAdForGold}
          className="w-full bg-gradient-to-r from-emerald-700 to-teal-800 border border-emerald-500/50 py-2.5 px-3 rounded-xl text-xs font-bold text-white shadow active:scale-95 cursor-pointer z-40 relative"
        >
          {t.adButton}
        </button>

        {/* Lista de Batalha */}
        <div className="flex flex-col gap-1.5 z-40 relative">
          {rawMonsters.map((m, idx) => {
            const monsterName = t.monsters[idx];
            const reward = Math.round(m.baseGold * state.weaponLevel);
            return (
              <button
                key={idx}
                onClick={() => handleAttack(m.baseGold)}
                className={`w-full bg-gradient-to-r ${m.color} border py-2 px-3 rounded-xl text-xs font-bold text-white shadow active:scale-95 flex justify-between items-center cursor-pointer`}
              >
                <span>👹 {monsterName}</span>
                <span className="bg-black/40 px-2 py-0.5 rounded text-amber-300">+{reward}</span>
              </button>
            );
          })}
        </div>

        {/* Lojas e Talentos */}
        <div className="flex flex-col gap-1.5 z-40 relative">
          <button 
            onClick={buyWeapon}
            className="w-full bg-slate-800 border border-blue-500/40 text-blue-300 py-2 px-3 rounded-xl text-xs font-semibold active:scale-95 flex justify-between items-center cursor-pointer"
          >
            <span>🏛️ {t.shop} (Nv. {state.weaponLevel})</span>
            <span className="text-amber-400 font-bold">{state.weaponLevel * 120} Ouro</span>
          </button>

          <button 
            onClick={buyTalent}
            className="w-full bg-slate-800 border border-teal-500/40 text-teal-300 py-2 px-3 rounded-xl text-xs font-semibold active:scale-95 flex justify-between items-center cursor-pointer"
          >
            <span>✨ {t.talents} ({state.critChance}% Crit)</span>
            <span className="text-amber-400 font-bold">{state.critChance * 15} Ouro</span>
          </button>
        </div>

        {/* Conquistas */}
        <div className="flex flex-col gap-1 bg-slate-950/60 p-2 rounded-xl border border-amber-500/20 text-left z-40 relative">
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-0.5">🏆 {t.achievements}</span>
          <div className="flex flex-col gap-1">
            {achievementsList.map(ach => {
              const isUnlocked = state.kills >= ach.target;
              const isClaimed = state.claimedAchievements.includes(ach.id);
              return (
                <button
                  key={ach.id}
                  onClick={() => claimAchievement(ach)}
                  disabled={!isUnlocked || isClaimed}
                  className={`w-full py-1.5 px-2 rounded-lg text-xs font-semibold flex justify-between items-center transition ${
                    isClaimed 
                      ? 'bg-slate-900 text-slate-500 border border-slate-800' 
                      : isUnlocked 
                      ? 'bg-amber-600 text-slate-950 border border-amber-400 animate-pulse cursor-pointer' 
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800 opacity-60'
                  }`}
                >
                  <span>{ach.title}</span>
                  <span>{isClaimed ? 'Resgatado' : `+${ach.reward} Ouro`}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prestígio */}
        <button 
          onClick={() => {
            if (confirm(t.resetConfirm)) {
              setState(defaultGameState);
              localStorage.removeItem(STORAGE_KEY);
            }
          }}
          className="w-full bg-slate-900 border border-red-900/40 text-red-400 py-2 rounded-xl text-xs font-semibold cursor-pointer active:scale-95 z-40 relative"
        >
          👑 {t.prestige}
        </button>

      </div>

    </div>
  );
}
