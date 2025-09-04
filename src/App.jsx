import React, { useEffect, useReducer, useState } from 'react'
import { Canvas, invalidate } from '@react-three/fiber'
import { OrbitControls, Grid, Stats } from '@react-three/drei'
import SimpleHouse from './Models/SimpleHouse.json'
import WallsGroup from './Scene/WallsGroup'
import BeamsGroup from './Scene/BeamsGroup'
import DoorsGroup from './Scene/DoorsGroup'
import WindowsGroup from './Scene/WindowsGroup'
import PlumbingsGroup from './Scene/PlumbingsGroup'
import ElectricalRunsGroup from './Scene/ElectricalRunsGroup'
import RoofsGroup from './Scene/RoofsGroup'
import Sidebar from './Components/Sidebar'

const initialLayers = {
  walls: { show: true, opacity: 1 },
  beams: { show: true, opacity: 1 },
  doors: { show: true, opacity: 1 },
  windows: { show: true, opacity: 1 },
  plumbing: { show: true, opacity: 1 },
  electrical: { show: true, opacity: 1 },
  roof: { show: true, opacity: 1 },
}

function layersReducer(state, action) {
  switch (action.type) {
    case 'setShow':
      return { ...state, [action.key]: { ...state[action.key], show: action.value } }
    case 'toggleShow':
      return { ...state, [action.key]: { ...state[action.key], show: !state[action.key].show } }
    case 'setOpacity':
      return { ...state, [action.key]: { ...state[action.key], opacity: action.value } }
    default:
      return state
  }
}

export default function App() {
  const [data, setData] = useState(SimpleHouse)
  const [error, setError] = useState(null)
  const [showStats, setShowStats] = useState(false)
  const [layers, dispatch] = useReducer(layersReducer, initialLayers)

  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.accept('./Models/SimpleHouse.json', (mod) => {
        setData(mod.default)
      })
    }
  }, [])

  return (
    <div className="app" style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        layers={layers}
        dispatch={dispatch}
        data={data}
        error={error}
        showStats={showStats}
        setShowStats={setShowStats}
      />

      <div className="viewer" style={{ flex: 1 }}>
        <Canvas
          shadows
          frameloop={showStats ? 'always' : 'demand'}
          dpr={[1, 2]}
          gl={{ powerPreference: 'high-performance', antialias: true }}
          camera={{ position: [10, 10, 10], fov: 100 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />

          <OrbitControls makeDefault onChange={() => invalidate()} enableDamping />
          <Grid args={[20, 20, 10]} />

          <WallsGroup
            showWalls={layers.walls.show}
            walls={data?.layers?.walls}
            defaults={data?.defaults}
            opacity={layers.walls.opacity}
            color={data?.defaults?.colors?.walls}
          />

          <BeamsGroup
            showBeams={layers.beams.show}
            beams={data?.layers?.beams}
            defaults={data?.defaults}
            opacity={layers.beams.opacity}
            color={data?.defaults?.colors?.beams}
          />

          <DoorsGroup
            showDoors={layers.doors.show}
            doors={data?.layers?.doors}
            defaults={data?.defaults}
            opacity={layers.doors.opacity}
            color={data?.defaults?.colors?.doors}
          />

          <WindowsGroup
            showWindows={layers.windows.show}
            windows={data?.layers?.windows}
            defaults={data?.defaults}
            opacity={layers.windows.opacity}
            color={data?.defaults?.colors?.windows}
          />

          <PlumbingsGroup
            showPlumbings={layers.plumbing.show}
            plumbings={data?.layers?.plumbing}
            defaults={data?.defaults}
            opacity={layers.plumbing.opacity}
            color={data?.defaults?.colors?.plumbing}
          />

          <ElectricalRunsGroup
            showElectrical={layers.electrical.show}
            electricalRuns={data?.layers?.electrical}
            defaults={data?.defaults}
            opacity={layers.electrical.opacity}
            color={data?.defaults?.colors?.electrical}
          />

          <RoofsGroup
            showRoof={layers.roof.show}
            roofs={data?.layers?.roof}
            defaults={data?.defaults}
            opacity={layers.roof.opacity}
            color={data?.defaults?.colors?.roof}
          />

          {showStats && <Stats />}
        </Canvas>
      </div>
    </div>
  )
}