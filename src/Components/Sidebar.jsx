import React from 'react'
import LayerControl from './LayerControl'
import { LAYERS_UI } from '../Config/layersConfig'

export default function Sidebar({
    layers,
    dispatch,
    data,
    error,
    showStats,
    setShowStats,
}) {
    return (
        <div className="sidebar" style={{ width: 280, padding: 12, borderRight: '1px solid #ddd', overflow: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ margin: 0 }}>House 3D</h3>
                <button onClick={() => setShowStats((s) => !s)}>
                    {showStats ? 'Hide Stats' : 'Show Stats'}
                </button>
            </div>

            {error && <p style={{ color: '#b91c1c' }}>{error}</p>}
            {data?.meta?.name && <p><strong>Model:</strong> {data.meta.name}</p>}
            {!data && !error && <p>Loading /SimpleHouse.json…</p>}

            {LAYERS_UI.map(({ key: k, label }) => (
                <LayerControl key={k} k={k} label={label} state={layers[k]} dispatch={dispatch} />
            ))}
        </div>
    )
}