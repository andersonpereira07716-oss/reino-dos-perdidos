import React, { useState, useEffect } from 'react';
import { loadGame, saveGame, defaultState } from './gameStore';
import { fasesData } from './gameData';

export default function App() {
  const [gameState, setGameState] = useState(loadGame);

  useEffect(() => {
    saveGame(gameState);
  }, [gameState]);

  const handleChoice = (choice) => {
    if (choice.reset) {
      setGameState(defaultState);
      return;
    }

    const newHp = Math.max(0, Math.min(100, gameState.hp + (choice.hpChange || 0)));
    const newInventory = choice.item && !gameState.inventory.includes(choice.item)
      ? [...gameState.inventory, choice.item]
      : gameState.inventory;

    setGameState({
      ...gameState,
      phaseId: choice.nextPhase,
      hp: newHp,
      score: gameState.score + (choice.scoreAdd || 0),
      inventory: newInventory
    });
  };

  const currentPhase = fasesData[gameState.phaseId] || fasesData[1];

  return (
    <div className="min-h-screen bg-slate-950 text-amber-100 flex flex-col items-center justify-between p-4 font-sans select-none">
      
      <header className="w-full max-w-md bg-slate-900/80 border border-amber-500/30 rounded-xl p-3 shadow-lg flex flex-col gap-2">
        <div className="flex justify-between items-center text-sm font-bold">
          <span className="text-red-400">❤️ HP: {gameState.hp}%</span>
          <span className="text-amber-400">⭐ Pontos: {gameState.score}</span>
        </div>
        <div className="flex flex-wrap gap-1 items-center text-xs">
          <span className="text-slate-400 font-semibold mr-1">Inventário:</span>
          {gameState.inventory.length === 0 ? (
            <span className="text-slate-600 italic">Vazio</span>
          ) : (
            gameState.inventory.map((item, idx) => (
              <span key={idx} className="bg-amber-950/60 border border-amber-600/50 px-2 py-0.5 rounded text-amber-200">
                {item}
              </span>
            ))
          )}
        </div>
      </header>

      <main className="w-full max-w-md my-auto flex flex-col items-center text-center py-6">
        {gameState.screen === 'menu' ? (
          <div className="flex flex-col gap-4 w-full">
            <h1 className="text-3xl font-black text-amber-400 tracking-wider drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]">
              CAVERNA DO DRAGÃO
            </h1>
            <p className="text-xs text-slate-400 mb-4">O Reino dos Perdidos</p>
            
            <button 
              onClick={() => setGameState({ ...gameState, screen: 'game' })}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black py-3 px-6 rounded-xl shadow-md transition-transform active:scale-95 text-lg border border-amber-400/40"
            >
              🎮 Iniciar Aventura
            </button>

            <button 
              onClick={() => setGameState({ ...gameState, screen: 'history' })}
              className="bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold py-3 px-6 rounded-xl border border-amber-600/30 transition-transform active:scale-95"
            >
              📜 Sobre o Jogo
            </button>
          </div>
        ) : gameState.screen === 'history' ? (
          <div className="flex flex-col gap-4 w-full bg-slate-900/90 p-5 rounded-2xl border border-amber-500/20 text-left">
            <h2 className="text-xl font-bold text-amber-400 text-center mb-2">A Lenda</h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Entre nas profundezas misteriosas do Reino dos Perdidos. Suas escolhas moldarão seu destino, testarão sua coragem e definirão se você conquistará os tesouros ou se tornará parte da lenda do dragão.
            </p>
            <button 
              onClick={() => setGameState({ ...gameState, screen: 'menu' })}
              className="mt-4 bg-amber-700 hover:bg-amber-600 text-slate-950 font-bold py-2 rounded-lg transition"
            >
              Voltar ao Menu
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-5 w-full bg-slate-900/90 p-5 rounded-2xl border border-amber-500/30 shadow-xl text-left">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h2 className="text-lg font-bold text-amber-300">{currentPhase.title}</h2>
              <button 
                onClick={() => setGameState({ ...gameState, screen: 'menu' })}
                className="text-xs text-slate-400 hover:text-amber-400 underline"
              >
                Menu
              </button>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed min-h-[90px]">
              {currentPhase.text}
            </p>

            <div className="flex flex-col gap-2.5 mt-2">
              {currentPhase.choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleChoice(choice)}
                  className="bg-slate-800 hover:bg-amber-950/50 hover:border-amber-500/60 border border-slate-700 text-amber-100 text-xs font-semibold py-3 px-4 rounded-xl text-left transition-all shadow active:scale-[0.98]"
                >
                  👉 {choice.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      <footer className="text-[10px] text-slate-600 tracking-wider">
        Caverna do Dragão • Capacitor & React
      </footer>

    </div>
  );
}
