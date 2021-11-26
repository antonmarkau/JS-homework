import { getDataFromLS } from './data.js'
import { map} from './map.js';
import { getData } from './data.js';

// Apply filter
export function applyFilter(e) {
    e.preventDefault();

    getData().then(result => {
        let currentData = result;

        // Get values for filter
        const minPrise = document.getElementById('prise-min').value,
            maxPrise = document.getElementById('prise-max').value,
            minRooms = document.getElementById('rooms-min').value,
            maxRooms = document.getElementById('rooms-max').value,
            metro = document.getElementById('filter-metro').checked ? 'Yes' : 'No';
    
        // Get all the data to filter it later
        let filteredData = currentData;

        // Filter by min prise
        filteredData.features = currentData.features.filter(function (e) {
            if (minPrise != ''){
                return parseInt(e.properties.prise) >= minPrise;
            } else {
                return e.properties.prise;
            }
        });
        // Filter by max prise
        filteredData.features = currentData.features.filter(function (e) {
            if (maxPrise != ''){
                return parseInt(e.properties.prise) <= maxPrise;
            } else {
                return e.properties.prise;
            }
        });
        // Filter by min rooms prise
        filteredData.features = currentData.features.filter(function (e) {
            if (minRooms != ''){
                return parseInt(e.properties.rooms) >= minRooms;
            } else {
                return e.properties.rooms;
            }
        });
        // Filter by max rooms prise
        filteredData.features = currentData.features.filter(function (e) {
            if (maxRooms != ''){
                return parseInt(e.properties.rooms) <= maxRooms;
            } else {
                return e.properties.rooms;
            }
        });
        // Filter by metro
        filteredData.features = currentData.features.filter(function (e) {
            return e.properties.metro == metro;
        });

        // Display filtered features
        map.getSource('data').setData(filteredData);
    });
};

// Clear filter
export function clearFilter(e) {
    e.preventDefault();

    getData().then(result => {
        let currentData = result;

        map.getSource('data').setData(currentData);
        let inputs = document.getElementsByTagName('input');
        for (let i = 0; i<inputs.length; i++) {
            inputs[i].value = '';
        }
        let checkmark = document.getElementById('filter-metro');
        checkmark.checked = false;
    });
};