import { create } from 'zustand'

export const useStore = create((set) => ({
  gameState: 'start', // 'start', 'game', 'editor', 'gameover'
  diet: null, // 'carnivore', 'herbivore', 'omnivore'
  creatureDesign: 1, // 1 to 5
  stats: {
    health: 100,
    maxHealth: 100,
    speed: 5,
    size: 1,
    attack: 10,
    defense: 5,
    energy: 100,
    maxEnergy: 100,
  },
  dna: 0,
  history: {
    kills: 0,
    eatenPlants: 0,
    evolutions: 0,
    reproductions: 0,
    deaths: 0,
    timeAlive: 0
  },
  
  setGameState: (state) => set({ gameState: state }),
  setDiet: (diet) => set({ diet }),
  setCreatureDesign: (design) => set({ creatureDesign: design }),
  addDna: (amount) => set((state) => ({ dna: state.dna + amount })),
  
  eatFood: (type, nutrition) => set((state) => {
    // Increase energy or health
    const newEnergy = Math.min(state.stats.energy + nutrition * 10, state.stats.maxEnergy);
    const newHealth = Math.min(state.stats.health + nutrition * 5, state.stats.maxHealth);
    
    // Update history
    const historyUpdate = { ...state.history };
    if (type === 'meat') historyUpdate.kills += 1;
    if (type === 'plant') historyUpdate.eatenPlants += 1;
    
    return { 
      stats: { ...state.stats, energy: newEnergy, health: newHealth },
      history: historyUpdate,
      dna: state.dna + nutrition // get DNA for eating
    }
  }),
  
  takeDamage: (amount) => set((state) => {
    const dmg = Math.max(1, amount - state.stats.defense * 0.5);
    const newHealth = state.stats.health - dmg;
    
    if (newHealth <= 0) {
      return { 
        gameState: 'gameover',
        history: { ...state.history, deaths: state.history.deaths + 1 }
      }
    }
    return { stats: { ...state.stats, health: newHealth } }
  }),
  
  reproduce: () => set((state) => ({
    gameState: 'editor',
    history: { ...state.history, reproductions: state.history.reproductions + 1 },
    stats: { ...state.stats, health: state.stats.maxHealth, energy: state.stats.maxEnergy }
  })),
  
  evolve: (upgrades) => set((state) => {
    // upgrades is an object like { speed: 1, attack: 2 } etc
    const newStats = { ...state.stats };
    let cost = 0;
    
    for (const [key, value] of Object.entries(upgrades)) {
      if (value > 0) {
        newStats[key] += value;
        cost += value * 10; // 10 DNA per stat point
      }
    }
    
    // Check if player has enough DNA and wants to finish evolution
    if (state.dna >= cost) {
      // If player wants to end game after multiple evolutions:
      if (state.history.evolutions >= 4) { // Let's say 5th evolution is the final one
        return {
          gameState: 'gameover',
          history: { ...state.history, evolutions: state.history.evolutions + 1 },
          dna: state.dna - cost
        }
      }
      
      return {
        gameState: 'game',
        stats: newStats,
        dna: state.dna - cost,
        history: { ...state.history, evolutions: state.history.evolutions + 1 }
      }
    }
    return state;
  }),
  
  restart: () => set({
    gameState: 'start',
    diet: null,
    creatureDesign: 1,
    stats: {
      health: 100, maxHealth: 100, speed: 5, size: 1, attack: 10, defense: 5, energy: 100, maxEnergy: 100,
    },
    dna: 0,
    history: { kills: 0, eatenPlants: 0, evolutions: 0, reproductions: 0, deaths: 0, timeAlive: 0 }
  })
}))
