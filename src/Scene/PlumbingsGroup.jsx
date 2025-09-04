import Plumbing from "../Components/Plumbing";

export default function PlumbingsGroup({ showPlumbings, plumbings, defaults }) {
    if (!showPlumbings || !plumbings) return null;
    return (
        <>
            {plumbings.map((p, i) => (
                <Plumbing key={i} {...p} defaults={defaults} />
            ))}
        </>
    );
}