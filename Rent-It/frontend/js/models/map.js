import { getData, saveDataToLS, getDataFromLS } from './data.js';
import { updateFeatures } from './update-features.js';

export const marker = new mapboxgl.Marker({
    draggable: true
});

// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYXZtYXJrb3Y5MyIsImEiOiJjanR5NHVndmExaXUzNDVydHFrdGJicnF5In0.ZHYnVRlDWTGeEve-aAxQBQ';
export const map = new mapboxgl.Map({
    container: document.getElementsByClassName('map-container')[0],
    style: 'mapbox://styles/mapbox/light-v10',
    center: [27.566667, 53.9],
    zoom: 10.9
});

export function mapLogic() {
    map.on('load', () => {
        map.resize();
        // Add a new source from JSON data
        // getData() is a Promise, it returns the data and puts it below
        getData().then(result => {
            map.addSource('data', {
                type: 'geojson',
                data: result, // Data from the Promise goes here
                cluster: true,
                clusterMaxZoom: 14, // Max zoom to cluster points on
                clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
            });
            // Add layer of features
            map.addLayer({
                id: 'clusters',
                type: 'circle',
                source: 'data',
                filter: ['has', 'point_count'],
                paint: {
                    // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                    'circle-color': [
                        'step',
                        ['get', 'point_count'],
                        '#F1C40F',
                        5,
                        '#E67E22',
                        10,
                        '#D35400'
                        ],
                    'circle-radius': [
                        'step',
                        ['get', 'point_count'],
                        20,
                        5,
                        30,
                        10,
                        40
                    ],
                    'circle-stroke-width': 4,
                    'circle-stroke-color': '#fff'
                }
            });
            // Add layer of clustered features
            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'data',
                filter: ['has', 'point_count'],
                layout: {
                    'text-field': '{point_count_abbreviated}',
                    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                    'text-size': 12
                }
            });
            // Add layer of unclustered features
            map.addLayer({
                id: 'unclustered-point',
                type: 'circle',
                source: 'data',
                filter: ['!', ['has', 'point_count']],
                paint: {
                    'circle-color': '#ed8345',
                    'circle-radius': 6,
                    'circle-stroke-width': 4,
                    'circle-stroke-color': '#fff'
                }
            });
            // inspect a cluster on click
            map.on('click', 'clusters', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                const clusterId = features[0].properties.cluster_id;
                map.getSource('data').getClusterExpansionZoom(
                clusterId,
                (err, zoom) => {
                    if (err) return;
                    
                    map.easeTo({
                        center: features[0].geometry.coordinates,
                        zoom: zoom
                        });
                    }
                );
            });
            // Display popup on click
            map.on('click', 'unclustered-point', (e) => {
                const id = e.features[0].properties.id;
                const coordinates = e.features[0].geometry.coordinates.slice();
                const prise = e.features[0].properties.prise;
                const rooms = e.features[0].properties.rooms;
                const metro = e.features[0].properties.metro;
                const housenumber = e.features[0].properties.housenumber;
                const streetname = e.features[0].properties.streetname;
                const locality = e.features[0].properties.locality;
                const postcode = e.features[0].properties.postcode;
                const city = e.features[0].properties.city;
                const country = e.features[0].properties.country;
                const phone = e.features[0].properties.phone;
                const owner = e.features[0].properties.owner;
                
                // Ensure that if the map is zoomed out such that
                // multiple copies of the feature are visible, the
                // popup appears over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }
                
                // Draw popup
                let popup = new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(`
                <div class="popup-container">
                    <div class="popup-info">
                        <span class="material-icons">payments</span><span>Prise, USD: </span><span class="popup-bold"> ${prise}</span>
                    </div>
                    <div class="popup-info">
                        <span class="material-icons">other_houses</span><span>Rooms: </span><span class="popup-bold"> ${rooms}</span>
                    </div>
                    <div class="popup-info">
                        <span class="material-icons">subway</span><span>Close to metro: </span><span class="popup-bold"> ${metro}</span>
                    </div>
                    <button class="btn btn-info-feature"><span class="material-icons">open_in_new</span>More info</button>
                </div>
                `)
                .addTo(map);
    
                // More info button in popup
                let buttonInfo = document.getElementsByClassName('btn-info-feature')[0];
                buttonInfo.addEventListener('click', () => {
                    window.location.href = '../info.html?' + id;
                });
            });
            
            map.on('mouseenter', 'clusters', () => {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'clusters', () => {
                map.getCanvas().style.cursor = '';
            });
        });
    });
};

