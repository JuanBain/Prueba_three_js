import Windows from '../Components/Windows'

export default function WindowsGroup({ showWindows, windows, defaults }) {
    if (!showWindows || !windows) return null
    return (
        <>
            {windows.map((w, i) => (
                <Windows
                    key={i}
                    {...w}
                    center={w.center ?? [0, 0, 0]}
                    size={w.size ?? [1, 1, 0.1]}
                    material={w.material ?? defaults?.windowMaterial}
                />
            ))}
        </>
    )
}