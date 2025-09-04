import React, { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, Stats } from '@react-three/drei'
import WallsGroup from './Scene/WallsGroup'
import BeamsGroup from './Scene/BeamsGroup'
import DoorsGroup from './Scene/DoorsGroup'
import WindowsGroup from './Scene/WindowsGroup'
import SimpleHouse from './Models/SimpleHouse.json'
import PlumbingsGroup from './Scene/PlumbingsGroup'
import ElectricalRunsGroup from './Scene/ElectricalRunsGroup'
import RoofsGroup from './Scene/RoofsGroup'

export default function App() {
  const [data, setData] = useState(SimpleHouse)
  const [error, setError] = useState(null)
  const [showWalls, setShowWalls] = useState(true)
  const [showBeams, setShowBeams] = useState(true)
  const [showDoors, setShowDoors] = useState(true)
  const [showStats, setShowStats] = useState(false)
  const [showWindows, setShowWindows] = useState(true)
  const [showPlumbings, setShowPlumbings] = useState(true)
  const [showElectrical, setShowElectrical] = useState(true)
  const [showRoof, setShowRoof] = useState(true)
  const [wallsOpacity, setWallsOpacity] = useState(1)
  const [beamsOpacity, setBeamsOpacity] = useState(1)
  const [doorsOpacity, setDoorsOpacity] = useState(1)
  const [windowsOpacity, setWindowsOpacity] = useState(1)
  const [plumbingsOpacity, setPlumbingsOpacity] = useState(1)
  const [electricalOpacity, setElectricalOpacity] = useState(1)
  const [roofOpacity, setRoofOpacity] = useState(1)


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
          {showWalls ? 'Hide Walls' : 'Show Walls'}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ minWidth: '60px' }}>Opacity</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={wallsOpacity}
              onChange={e => setWallsOpacity(Number(e.target.value))}
              style={{ marginLeft: '8px', verticalAlign: 'middle' }}
            />
            <span style={{ marginLeft: '8px' }}>{Math.round(wallsOpacity * 100)}%</span>
          </div>
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={showBeams}
            onChange={e => setShowBeams(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          {showBeams ? 'Hide Beams' : 'Show Beams'}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ minWidth: '60px' }}>Opacity</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={beamsOpacity}
              onChange={e => setBeamsOpacity(Number(e.target.value))}
              style={{ marginLeft: '8px', verticalAlign: 'middle' }}
            />
            <span style={{ marginLeft: '8px' }}>{Math.round(beamsOpacity * 100)}%</span>
          </div>
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={showDoors}
            onChange={e => setShowDoors(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          {showDoors ? 'Hide Doors' : 'Show Doors'}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ minWidth: '60px' }}>Opacity</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={doorsOpacity}
              onChange={e => setDoorsOpacity(Number(e.target.value))}
              style={{ marginLeft: '8px', verticalAlign: 'middle' }}
            />
            <span style={{ marginLeft: '8px' }}>{Math.round(doorsOpacity * 100)}%</span>
          </div>
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={showWindows}
            onChange={e => setShowWindows(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          {showWindows ? 'Hide Windows' : 'Show Windows'}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ minWidth: '60px' }}>Opacity</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={windowsOpacity}
              onChange={e => setWindowsOpacity(Number(e.target.value))}
              style={{ marginLeft: '8px', verticalAlign: 'middle' }}
            />
            <span style={{ marginLeft: '8px' }}>{Math.round(windowsOpacity * 100)}%</span>
          </div>
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={showPlumbings}
            onChange={e => setShowPlumbings(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          {showPlumbings ? 'Hide Plumbing' : 'Show Plumbing'}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ minWidth: '60px' }}>Opacity</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={plumbingsOpacity}
              onChange={e => setPlumbingsOpacity(Number(e.target.value))}
              style={{ marginLeft: '8px', verticalAlign: 'middle' }}
            />
            <span style={{ marginLeft: '8px' }}>{Math.round(plumbingsOpacity * 100)}%</span>
          </div>
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={showElectrical}
            onChange={e => setShowElectrical(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          {showElectrical ? 'Hide Electrical' : 'Show Electrical'}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ minWidth: '60px' }}>Opacity</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={electricalOpacity}
              onChange={e => setElectricalOpacity(Number(e.target.value))}
              style={{ marginLeft: '8px', verticalAlign: 'middle' }}
            />
            <span style={{ marginLeft: '8px' }}>{Math.round(electricalOpacity * 100)}%</span>
          </div>
        </label>
        <label style={{ display: 'block', marginBottom: '8px' }}>
          <input
            type="checkbox"
            checked={showRoof}
            onChange={e => setShowRoof(e.target.checked)}
            style={{ marginRight: '8px' }}
          />
          {showRoof ? 'Hide Roof' : 'Show Roof'}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
            <span style={{ minWidth: '60px' }}>Opacity</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={roofOpacity}
              onChange={e => setRoofOpacity(Number(e.target.value))}
              style={{ marginLeft: '8px', verticalAlign: 'middle' }}
            />
            <span style={{ marginLeft: '8px' }}>{Math.round(roofOpacity * 100)}%</span>
          </div>
        </label>
      </div>
      <div className="viewer">
        <Canvas shadows camera={{ position: [10, 0, 10], fov: 100 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
          <OrbitControls />
          <Grid args={[100, 100, 10]} />
          <DoorsGroup
            showDoors={showDoors}
            doors={data?.layers?.doors}
            defaults={data?.defaults}
            opacity={doorsOpacity}
            color={data.defaults?.colors?.doors}
          />
          <WallsGroup
            showWalls={showWalls}
            walls={data?.layers?.walls}
            defaults={data?.defaults}
            opacity={wallsOpacity}
            color={data.defaults?.colors?.walls}
          />
          <BeamsGroup
            showBeams={showBeams}
            beams={data?.layers?.beams}
            defaults={data?.defaults}
            opacity={beamsOpacity}
            color={data.defaults?.colors?.beams}
          />
          <WindowsGroup
            showWindows={showWindows}
            windows={data?.layers?.windows}
            defaults={data?.defaults}
            opacity={windowsOpacity}
            color={data.defaults?.colors?.windows}
          />
          <PlumbingsGroup
            showPlumbings={showPlumbings}
            plumbings={data?.layers?.plumbing}
            defaults={data?.defaults}
            opacity={plumbingsOpacity}
            color={data.defaults?.colors?.plumbing}

          />
          <ElectricalRunsGroup
            showElectrical={showElectrical}
            electricalRuns={data?.layers?.electrical}
            defaults={data?.defaults}
            opacity={electricalOpacity}
            color={data.defaults?.colors?.electrical}
          />
          <RoofsGroup
            showRoof={showRoof}
            roofs={data?.layers?.roof}
            defaults={data?.defaults}
            color={data.defaults?.colors?.roof}
            opacity={roofOpacity}
          />
          {showStats && <Stats position="bottom-left" />}
        </Canvas>
      </div>
    </div >
  )
}