import React, { useState } from 'react';

// Classes em formato 3D Orbitais
const CLASSES_3D = [
  { id: 'hank', name: 'Hank', role: 'Arqueiro / Ranger', desc: 'DPS à distância com flechas mágicas de luz.', icon: '🏹', color: 'from-amber-600 to-orange-800' },
  { id: 'diana', name: 'Diana', role: 'Acrobata / Assassina', desc: 'Alta mobilidade e ataques velozes com bastão.', icon: '🤸‍♀️', color: 'from-emerald-600 to-teal-800' },
  { id: 'eric', name: 'Eric', role: 'Cavaleiro / Escudo', desc: 'Tanque principal com barreiras de proteção.', icon: '🛡️', color: 'from-blue-600 to-indigo-800' },
  { id: 'presto', name: 'Presto', role: 'Mago', desc: 'Magias arcanas instáveis e controle de área.', icon: '🎩', color: 'from-purple-600 to-violet-800' },
  { id: 'sheila', name: 'Sheila', role: 'Ladina', desc: 'Furtividade, invisibilidade e utilidade tática.', icon: '👤', color: 'from-rose-600 to-pink-800' },
  { id: 'bobby', name: 'Bobby', role: 'Bárbaro', desc: 'Resistência extrema e golpes massivos de martelo.', icon: '🔨', color: 'from-amber-700 to-yellow-900' },
];

export default function App() {
  const [selectedClass, setSelectedClass] = useState<any | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hp, setHp] = useState(100);
  const [mp, setMp] = useState(100);
  const [isFlying, setIsFlying] = useState(false);

  // Rotação do carrossel 3D na seleção
  const nextClass = () => setCurrentIndex((prev) => (prev + 1) % CLASSES_3D.length);
  const prevClass = () => setCurrentIndex((prev) => (prev - 1 + CLASSES_3D.length) % CLASSES_3D.length);

  // Se não escolheu a classe, exibe o Carrossel 3D imersivo
  if (!selectedClass) {
    const cls = CLASSES_3D[currentIndex];
    return (
      <div className="relative w-screen h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-between p-6 select-none font-sans">
        
        {/* Fundo com efeito estelar/mágico */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black z-0"></div>

        {/* Topo: Título Temático */}
        <div className="z-10 text-center mt-4">
          <h1 className="text-3xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-600 drop-shadow-[0_5px_15px_rgba(245,158,11,0.4)]">
            REINO DOS PERDIDOS
          </h1>
          <p className="text-xs md:text-sm text-amber-300/60 tracking-wider uppercase mt-1">Selecione seu Campeão para entrar no Portal</p>
        </div>

        {/* Centro: Palco 3D do Herói em Destaque */}
        <div className="z-10 flex flex-col items-center justify-center my-auto w-full max-w-sm">
          <div className="relative w-64 h-72 rounded-3xl bg-gradient-to-b from-slate-800/80 to-slate-950/90 border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.2)] flex flex-col items-center justify-center p-6 text-center transform transition-all duration-500 hover:scale-105">
            
            {/* Círculo Mágico de Fundo */}
            <div className="absolute w-44 h-44 rounded-full border border-dashed border-amber-500/30 animate-spin-slow pointer-events-none"></div>

            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${cls.color} flex items-center justify-center text-4xl shadow-lg mb-4 border border-white/20`}>
              {cls.icon}
            </div>
            
            <h2 className="text-2xl font-bold text-amber-400 tracking-wide">{cls.name}</h2>
            <span className="text-xs text-amber-200/70 font-semibold mb-2">{cls.role}</span>
            <p className="text-xs text-gray-300 leading-relaxed px-2">{cls.desc}</p>
          </div>

          {/* Setas de Navegação 3D */}
          <div className="flex gap-6 mt-6">
            <button 
              onClick={prevClass}
              className="w-12 h-12 rounded-full bg-slate-800/80 border border-amber-500/50 flex items-center justify-center text-amber-400 text-xl font-bold active:scale-90 transition-all shadow-lg"
            >
              ◀
            </button>
            <button 
              onClick={() => setSelectedClass(cls)}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 text-slate-950 font-black tracking-wider text-sm shadow-[0_0_20px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-95 transition-all uppercase"
            >
              Entrar no Reino
            </button>
            <button 
              onClick={nextClass}
              className="w-12 h-12 rounded-full bg-slate-800/80 border border-amber-500/50 flex items-center justify-center text-amber-400 text-xl font-bold active:scale-90 transition-all shadow-lg"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Rodapé indicador */}
        <div className="z-10 text-[10px] text-gray-500 font-mono">
          Engine 3D Viewport • Caverna do Dragão MMORPG
        </div>
      </div>
    );
  }

  // Visão de Jogo 3D / Mundo Aberto (Estilo Perfect World com Voo Livre)
  return (
    <div className="relative w-screen h-screen bg-slate-950 overflow-hidden select-none font-sans">
      
      {/* Simulação de Cenário 3D em Perspectiva */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-indigo-950 to-slate-900 flex flex-col items-center justify-center perspective-[1000px]">
        
        {/* Efeito de grade de terreno estilo mundo aberto 3D */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px] [transform:rotateX(60deg)_translateY(-100px)] pointer-events-none"></div>

        {/* Personagem no centro do mundo */}
        <div className={`relative z-10 text-center p-8 bg-black/60 backdrop-blur-xl rounded-3xl border border-amber-500/40 shadow-2xl transition-transform duration-700 ${isFlying ? '-translate-y-20 scale-110' : ''}`}>
          <div className="text-7xl mb-3 animate-bounce">{selectedClass.icon}</div>
          <h2 className="text-2xl font-black text-amber-400 tracking-wide">{selectedClass.name}</h2>
          <span className="text-xs text-amber-200/70 block mt-1">{isFlying ? '✨ Voo Livre Ativo (Céus do Reino)' : '🌍 Explorando a Montanha do Vingador'}</span>
          
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            <button 
              onClick={() => setIsFlying(!isFlying)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${isFlying ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.6)]' : 'bg-slate-800 text-amber-400 border-amber-600/50'}`}
            >
              {isFlying ? '🪂 Pousar' : '🦅 Voar (Montaria/Asas)'}
            </button>
            <button 
              onClick={() => setHp(prev => Math.max(0, prev - 15))}
              className="px-3 py-2 bg-red-950/80 border border-red-600 text-xs rounded-xl font-bold text-red-300 hover:bg-red-900"
            >
              💥 Tomar Dano
            </button>
            <button 
              onClick={() => setHp(100)}
              className="px-3 py-2 bg-emerald-950/80 border border-emerald-600 text-xs rounded-xl font-bold text-emerald-300 hover:bg-emerald-900"
            >
              🧪 Curar
            </button>
          </div>
        </div>
      </div>

      {/* HUD Superior (Estilo Perfect World) */}
      <div className="absolute top-0 inset-x-0 p-4 flex justify-between items-start pointer-events-none z-20">
        {/* Painel do Jogador */}
        <div className="bg-black/80 border border-amber-600/60 p-3 rounded-2xl text-white w-60 backdrop-blur-md pointer-events-auto shadow-2xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xl">
              {selectedClass.icon}
            </div>
            <div>
              <h4 className="text-xs font-bold text-amber-400">{selectedClass.name}</h4>
              <span className="text-[10px] text-amber-200/60 font-mono">Nível 1 (Mortal)</span>
            </div>
          </div>
          {/* HP */}
          <div className="w-full bg-red-950 h-2.5 rounded-full overflow-hidden mb-1 border border-red-800 relative">
            <div className="bg-red-600 h-full transition-all duration-300" style={{ width: `${hp}%` }}></div>
            <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-white">HP: {hp}/100</span>
          </div>
          {/* MP */}
          <div className="w-full bg-blue-950 h-2 rounded-full overflow-hidden border border-blue-800 relative">
            <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${mp}%` }}></div>
            <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-white">MP: {mp}/100</span>
          </div>
        </div>

        {/* Minimapa 3D Circular */}
        <div className="w-32 h-32 rounded-full bg-slate-950/90 border-2 border-amber-500 shadow-2xl pointer-events-auto flex flex-col items-center justify-center text-amber-400 text-xs font-mono relative overflow-hidden">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#d97706_1.5px,transparent_1.5px)] [background-size:10px_10px]"></div>
          <span className="z-10 font-bold text-amber-300">🗺️ Vingador</span>
          <span className="z-10 text-[9px] text-emerald-400">{isFlying ? 'Céus Abertos' : 'Zona PvP/PvE'}</span>
        </div>
      </div>

      {/* HUD Inferior: Hotbar de Habilidades 3D */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center items-center pointer-events-none z-20">
        <div className="bg-black/90 border border-amber-600/70 p-3 rounded-3xl flex gap-3 backdrop-blur-xl pointer-events-auto shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          {['1', '2', '3', '4', '5'].map((key) => (
            <button
              key={key}
              onClick={() => alert(`Habilidade ${key} (${selectedClass.name}) executada no espaço 3D!`)}
              className="w-14 h-14 bg-gradient-to-b from-slate-800 to-slate-900 border border-amber-600/50 rounded-2xl flex flex-col items-center justify-center text-white font-bold hover:border-amber-400 hover:scale-110 active:scale-95 transition-all relative group shadow-md"
            >
              <span className="text-2xl group-hover:rotate-12 transition-transform">⚡</span>
              <span className="absolute top-1 left-2 text-[9px] text-amber-400 font-mono font-bold">#{key}</span>
            </button>
          ))}
          <button
            onClick={() => setSelectedClass(null)}
            className="w-14 h-14 bg-gradient-to-b from-red-950 to-slate-900 border border-red-600/50 rounded-2xl flex flex-col items-center justify-center text-white font-bold hover:border-red-400 hover:scale-110 active:scale-95 transition-all relative group shadow-md ml-3"
            title="Trocar Herói"
          >
            <span className="text-xl">🔄</span>
            <span className="absolute top-1 right-2 text-[8px] text-red-400 font-mono">Trocar</span>
          </button>
        </div>
      </div>

    </div>
  );
}
