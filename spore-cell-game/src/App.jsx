import React from 'react'
import { useStore } from './store'
import Game from './Game'
import './index.css'

const StartScreen = () => {
  const { setDiet, setCreatureDesign, setGameState, diet, creatureDesign } = useStore()
  
  return (
    <div className="screen-container start-screen">
      <div className="panel glass-panel">
        <h1 className="title">Spore: Cell Stage 🦠</h1>
        
        <div className="section">
          <h3>Select Diet</h3>
          <div className="button-group">
            <button className={`btn ${diet === 'carnivore' ? 'active carnivore' : ''}`} onClick={() => setDiet('carnivore')}>🥩 Carnivore</button>
            <button className={`btn ${diet === 'herbivore' ? 'active herbivore' : ''}`} onClick={() => setDiet('herbivore')}>🌿 Herbivore</button>
            <button className={`btn ${diet === 'omnivore' ? 'active omnivore' : ''}`} onClick={() => setDiet('omnivore')}>🍕 Omnivore</button>
          </div>
        </div>
        
        <div className="section">
          <h3>Select Design</h3>
          <div className="button-group">
            {[1, 2, 3, 4, 5].map(id => (
              <button 
                key={id}
                className={`btn design-btn ${creatureDesign === id ? 'active' : ''}`}
                onClick={() => setCreatureDesign(id)}
              >
                Design {id}
              </button>
            ))}
          </div>
        </div>
        
        <button 
          className="btn btn-primary start-btn" 
          disabled={!diet}
          onClick={() => setGameState('game')}
        >
          Enter the Primordial Soup
        </button>
      </div>
    </div>
  )
}

const EditorScreen = () => {
  const { stats, dna, evolve, setGameState } = useStore()
  const [upgrades, setUpgrades] = React.useState({ speed: 0, size: 0, attack: 0, defense: 0 })
  
  const handleUpgrade = (stat) => {
    setUpgrades(p => ({ ...p, [stat]: p[stat] + 1 }))
  }
  
  const totalCost = Object.values(upgrades).reduce((a,b) => a+b, 0) * 10
  
  const submitEvolution = () => {
    if (dna >= totalCost) {
      evolve(upgrades)
    }
  }

  return (
    <div className="screen-container editor-screen">
       <div className="panel glass-panel">
         <h1 className="title">🧬 Evolution Chamber</h1>
         <p className="dna-display">Available DNA: <strong>{dna - totalCost}</strong></p>
         
         <div className="stats-grid">
           {['speed', 'size', 'attack', 'defense'].map(stat => (
             <div key={stat} className="stat-row">
               <span className="stat-name">{stat.toUpperCase()}: {stats[stat]} {upgrades[stat] > 0 && <span className="upgrade-preview">+{upgrades[stat]}</span>}</span>
               <button 
                 className="btn btn-small"
                 disabled={(dna - totalCost) < 10}
                 onClick={() => handleUpgrade(stat)}
               >
                 + Upgrade (10 DNA)
               </button>
             </div>
           ))}
         </div>
         
         <div className="actions">
           <button className="btn btn-primary" onClick={submitEvolution}>Finish Evolution</button>
         </div>
       </div>
    </div>
  )
}

const GameOverScreen = () => {
  const { history, restart } = useStore()
  
  return (
    <div className="screen-container game-over-screen">
      <div className="panel glass-panel">
         <h1 className="title">💀 Game Over</h1>
         <h2 className="subtitle">Your Evolutionary Journey</h2>
         
         <div className="stats-list">
           <p>Evolutions: <span>{history.evolutions}</span></p>
           <p>Reproductions: <span>{history.reproductions}</span></p>
           <p>Creatures Eaten: <span>{history.kills}</span></p>
           <p>Plants Eaten: <span>{history.eatenPlants}</span></p>
           <p>Deaths: <span>{history.deaths}</span></p>
         </div>
         
         <button className="btn btn-primary mt-4" onClick={restart}>Play Again</button>
      </div>
    </div>
  )
}

function App() {
  const { gameState } = useStore()

  return (
    <div className="app-root">
      {gameState === 'start' && <StartScreen />}
      {gameState === 'game' && <Game />}
      {gameState === 'editor' && <EditorScreen />}
      {gameState === 'gameover' && <GameOverScreen />}
    </div>
  )
}

export default App
