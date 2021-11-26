import { map, marker} from './map.js';
import { reverseGeocoding } from './reverse-geocoding.js';

// Add feature logic
export function addFeature() {
    // Create a marker
    let mapCenter = map.getCenter();
    marker
    .setLngLat([mapCenter.lng, mapCenter.lat])
    .addTo(map);
    localStorage.setItem('marker-coordinates', JSON.stringify(marker.getLngLat()));

    // Move marker to click position
    map.on('click', (e) => {
        setMarkerPosition(e.lngLat);
    });

    // Move marker to dragged position
    marker.on('dragend', (e) => {
        setMarkerPosition(e.target._lngLat);
    });
    
    // Set marker position and write coordinates to LS
    function setMarkerPosition(coords) {
        marker.setLngLat([coords.lng, coords.lat]);
        localStorage.setItem('marker-coordinates', JSON.stringify(marker.getLngLat()));
        reverseGeocoding(coords.lng, coords.lat);
    }
};