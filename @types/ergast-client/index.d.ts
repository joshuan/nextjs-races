declare module 'ergast-client' {
    export interface Location {
        lat: number;
        long: number;
        locality: string;
        country: string;
    }

    export interface Circuit {
        circuitId: string;
        url: string;
        circuitName: string;
        location: Location;
    }

    export interface Race {
        season: number;
        round: number;
        url: string;
        raceName: string;
        circuit: Circuit;
        date: string;
        time: string;
    }

    export interface Season {
        races: Race[];
    }

    class ErgastClient {
        getSeason(year: number, cb: (err: Error, season: Season) => void): void;
    }

    export default ErgastClient;
}
