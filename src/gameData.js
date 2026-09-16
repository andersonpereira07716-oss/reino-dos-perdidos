export const fasesData = {
  1: {
    title: "A Entrada da Caverna",
    text: "Você está diante da colossal e sombria entrada da Caverna do Dragão. O vento sopra um eco distante de rugidos. Uma névoa mágica cobre o chão.",
    choices: [
      { text: "Entrar correndo com a espada em punho", nextPhase: 2, hpChange: -10, item: null, scoreAdd: 50 },
      { text: "Examinar os arredores com cautela", nextPhase: 3, hpChange: 0, item: "Tocha Mágica", scoreAdd: 100 }
    ]
  },
  2: {
    title: "O Salão dos Ecoos",
    text: "Sua pressa atraiu morcegos gigantes! Você sofreu alguns arranhões, mas encontrou uma passagem secreta iluminada por cristais.",
    choices: [
      { text: "Seguir pelo túnel esquerdo", nextPhase: 4, hpChange: -5, item: "Cristal Brilhante", scoreAdd: 150 },
      { text: "Voltar para a bifurcação principal", nextPhase: 1, hpChange: 0, item: null, scoreAdd: 10 }
    ]
  },
  3: {
    title: "A Aluvião Oculta",
    text: "Examinando com cautela, você descobriu um baú antigo deixado por aventureiros anteriores.",
    choices: [
      { text: "Abrir o baú com cuidado", nextPhase: 4, hpChange: 0, item: "Poção de Cura", scoreAdd: 200 },
      { text: "Ignorar e seguir adiante", nextPhase: 4, hpChange: 0, item: null, scoreAdd: 80 }
    ]
  },
  4: {
    title: "O Covil do Dragão",
    text: "Você chegou ao salão principal. O imenso Dragão Vermelho repousa sobre uma montanha de ouro, abrindo lentamente os olhos de fogo!",
    choices: [
      { text: "Tentar negociar usando os itens coletados", nextPhase: 5, hpChange: 0, item: "Escama Dourada", scoreAdd: 500 },
      { text: "Atacar o dragão diretamente!", nextPhase: 6, hpChange: -50, item: null, scoreAdd: 300 }
    ]
  },
  5: {
    title: "Vitória Lendária!",
    text: "Com sabedoria e coragem, você conquistou o respeito da fera e os tesouros guardados do Reino dos Perdidos!",
    choices: [
      { text: "Jogar Novamente", nextPhase: 1, hpChange: 100, reset: true, scoreAdd: 1000 }
    ]
  },
  6: {
    title: "Fim de Jogo",
    text: "O poder do dragão foi demais para esta tentativa. Suas forças se esvaíram nas sombras da caverna...",
    choices: [
      { text: "Tentar Novamente", nextPhase: 1, hpChange: 100, reset: true, scoreAdd: 0 }
    ]
  }
};
