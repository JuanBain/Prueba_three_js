import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Stats } from '@react-three/drei'
import WallsGroup from './Scene/WallsGroup'
import BeamsGroup from './Scene/BeamsGroup'
import DoorsGroup from './Scene/DoorsGroup'
import WindowsGroup from './Scene/WindowsGroup'
import SimpleHouse from './Models/SimpleHouse.json'

export default function App() {
  const [data, setData] = useState(SimpleHouse)
  const [error, setError] = useState(null)
  const [showWalls, setShowWalls] = useState(true)
  const [showBeams, setShowBeams] = useState(true)
  const [showDoors, setShowDoors] = useState(true)
  const [showStats, setShowStats] = useState(false)
  const [showWindows, setShowWindows] = useState(true)


  if (import.meta.hot) {
    import.meta.hot.accept('./Models/SimpleHouse.json', (mod) => {
      setData(mod.default)
    })
  }

  return (
    <div className="app">
      <div className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h3 style={{ margin: 0 }}>House 3D</h3>
          <button onClick={() => setShowStats(s => !s)}>
            Stats
          </button>
        </div>
        {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
        {data?.meta?.name && <p><strong>Model:</strong> {data.meta.name}</p>}
        {!data && !error && <p>Loading /SimpleHouse.json…</p>}
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={showWalls}
            onChange={e => setShowWalls(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Show Walls
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={showBeams}
            onChange={e => setShowBeams(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Show Beams
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={showDoors}
            onChange={e => setShowDoors(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Show Doors
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={showWindows}
            onChange={e => setShowWindows(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          Show Windows
        </label>


      </div>
      <div className="viewer">
        <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
          <OrbitControls />
          <Grid args={[10, 10]} />
          <DoorsGroup
            showDoors={showDoors}
            doors={data?.layers?.doors}
            defaults={data?.defaults}
          />
          <WallsGroup
            showWalls={showWalls}
            walls={data?.layers?.walls}
            defaults={data?.defaults}
          />
          <BeamsGroup
            showBeams={showBeams}
            beams={data?.layers?.beams}
            defaults={data?.defaults}
          />
          <WindowsGroup
            showWindows={showWindows}
            windows={data?.layers?.windows}
            defaults={data?.defaults}
          />

          {showStats && <Stats position="bottom-left" />}
        </Canvas>
      </div>
    </div >
  )
}