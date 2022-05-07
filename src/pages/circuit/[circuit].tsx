import * as React from 'react';
import { useRouter } from 'next/router';
import Map from '../../components/Map';
import { getCircuit } from '../../lib/circuits';

export default function CircuitPage() {
    const router = useRouter();
    const circuitId = parseInt((Array.isArray(router.query.circuit) ? router.query.circuit[0] : router.query.circuit || '0'), 10);

    if (!circuitId) {
        return <p>Undefined circuit id</p>;
    }

    const circuit = getCircuit(circuitId);

    if (!circuit) {
        return <p>Unknown circuit by id "{circuitId}"</p>;
    }

    return (
        <>
            <h2>{circuit.name}</h2>
            <h3>{circuit.location}, {circuit.country}</h3>
            <p>Wikipedia: <a href={circuit.url}>{circuit.url}</a></p>
            <Map
                lat={parseFloat(circuit.lat)}
                lon={parseFloat(circuit.lng)}
            />
        </>
    );
}
