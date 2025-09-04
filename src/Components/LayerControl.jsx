import React from 'react'

export default function LayerControl({ k, label, state, dispatch }) {
    const { show, opacity } = state
    return (
        <label style={{ display: 'block', marginBottom: 8 }}>
            <input
                type="checkbox"
                checked={show}
                onChange={(e) =>
                    dispatch({ type: 'setShow', key: k, value: e.target.checked })
                }
                style={{ marginRight: 8 }}
            />
            {show ? `Hide ${label}` : `Show ${label}`}

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                <span style={{ minWidth: 60 }}>Opacity</span>
                <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={opacity}
                    onChange={(e) => {
                        const v = Number(e.target.value)
                        if (v !== opacity) {
                            dispatch({ type: 'setOpacity', key: k, value: v })
                        }
                    }}
                    style={{ marginLeft: 8 }}
                />
                <span style={{ marginLeft: 8 }}>{Math.round(opacity * 100)}%</span>
            </div>
        </label>
    )
}