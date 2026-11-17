export function shuffled(items, random = Math.random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; }
  return copy;
}
export function newGame(characters, random = Math.random) { return { targets: shuffled(characters, random).slice(0, 10), round: 0, lives: 5, status: 'playing', wrong: [] }; }
export function answer(state, id) {
  if (state.status !== 'playing' || state.wrong.includes(id)) return 'ignored';
  if (state.targets[state.round].id === id) { state.round++; state.wrong = []; if (state.round === state.targets.length) state.status = 'won'; return 'correct'; }
  state.wrong.push(id); state.lives--; if (state.lives === 0) state.status = 'lost'; return 'wrong';
}
