import { map} from './map.js';
import { getData } from './data.js';

// Update features on the map
export function updateFeatures() {
    getData().then(result => {
        map.getSource('data').setData(result);
    })
}