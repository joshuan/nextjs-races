import React, { useEffect } from 'react';

interface MapProps {
    lat: number;
    lon: number;
}

interface YGeoObject {

}

interface YMap {
    geoObjects: {
        add(YGeoObject): void;
    }
}

interface YMaps {
    ready(cb: () => void): void;
    Map(id: string, config: object): YMap;
    GeoObject(config: object): YGeoObject;
}

export default function Map({ lat, lon }: MapProps) {
    let circuitMap;

    useEffect(() => {
        const ymaps = window && window.ymaps as (YMaps | undefined);

        ymaps && ymaps.ready(() => {
            circuitMap = new ymaps.Map('map', {
                center: [ lat, lon],
                zoom: 15,
                type: 'yandex#satellite',
            });

            circuitMap.geoObjects.add(new ymaps.GeoObject({
                geometry: {
                    type: "Point",
                    coordinates: [ lat, lon ],
                }
            }));
        });
    }, [lat, lon]);

    return (
        <div id="map" style={{ width: '100%', height: '400px'}} />
    );
}