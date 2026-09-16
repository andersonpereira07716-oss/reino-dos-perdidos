const STORAGE_KEY = 'caverna_do_dragao_save_v1';

export const defaultState = {
  screen: 'menu',
  phaseId: 1,
  hp: 100,
  score: 0,
  inventory: [],
  historyLog: []
};

export function loadGame() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultState;
  } catch (e) {
    return defaultState;
  }
}

export function saveGame(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Erro ao salvar o jogo', e);
  }
}
