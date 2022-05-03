export interface ErgastRace {
    raceId: number;
    year: number;
    round: number;
    circuitId: number;
    name: string;
    date: string;
    time: string;
    url: string;
    fp1_date: string;
    fp1_time: string;
    fp2_date: string;
    fp2_time: string;
    fp3_date: string;
    fp3_time: string;
    quali_date: string;
    quali_time: string;
    sprint_date: string;
    sprint_time: string;
}

export interface ErgastCircuit {
    circuitId: number;
    circuitRef: string;
    name: string;
    location: string;
    country: string;
    lat: string;
    lng: string;
    alt: number;
    url: string;
}
