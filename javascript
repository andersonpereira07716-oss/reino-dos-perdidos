const translations = {
  pt: {
    level: "Nível",
    gold: "Ouro",
    kills: "Abates",
    monsters: {
      orc: "Orc Guerreiro",
      golem: "Golem de Pedra",
      dragon: "Dragão Sombrio",
      shadowLord: "Lorde das Sombras"
    },
    menus: {
      weaponShop: "Loja de Armas",
      talentTree: "Árvore de Talentos",
      prestigeSystem: "Sistema de Prestígio"
    }
  },
  en: {
    level: "Level",
    gold: "Gold",
    kills: "Kills",
    monsters: {
      orc: "Warrior Orc",
      golem: "Stone Golem",
      dragon: "Shadow Dragon",
      shadowLord: "Shadow Lord"
    },
    menus: {
      weaponShop: "Weapon Shop",
      talentTree: "Talent Tree",
      prestigeSystem: "Prestige System"
    }
  },
  es: {
    level: "Nivel",
    gold: "Oro",
    kills: "Bajas",
    monsters: {
      orc: "Orco Guerrero",
      golem: "Gólem de Piedra",
      dragon: "Dragón Sombrío",
      shadowLord: "Señor de las Sombras"
    },
    menus: {
      weaponShop: "Tienda de Armas",
      talentTree: "Árbol de Talentos",
      prestigeSystem: "Sistema de Prestigio"
    }
  }
};

// Exemplo de uso para o idioma atual (ex: 'pt', 'en' ou 'es')
let currentLang = 'pt'; 
const t = translations[currentLang];

// Para exibir na tela:
console.log(`${t.monsters.orc} (+30 ${t.gold})`); 
// Saída: Orc Guerreiro (+30 Ouro)
