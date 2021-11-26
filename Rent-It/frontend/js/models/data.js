import { userId } from './accounts.js';

// Get the data from the server
export function getData() {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/api/features');
        xhr.onload = () => {
            resolve(JSON.parse(xhr.response));
            //saveDataToLS(data);
	    }
	    xhr.send();
    });
}

// Get feature by id from the server
export function getFeature(id) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://localhost:3000/api/feature/${id}`);
        xhr.onload = () => {
            resolve(JSON.parse(xhr.response));
        }
        xhr.send();
    });
};

// Save feature logic
export function saveFeature() {
    // Prepare the feature
    const feature = {
        "type": "Feature", 
        "properties": { 
            "id": Math.random().toString(36).substr(2, 9), 
            "userid": userId,
            "prise": document.getElementById('prise').value,
            "rooms": document.getElementById('rooms').value,
            "metro": document.getElementById('metro').checked ? 'Yes' : 'No',
            "housenumber": document.getElementById('address-housenumber').value,
            "streetname": document.getElementById('address-streetname').value,
            "locality": document.getElementById('address-locality').value,
            "postcode": document.getElementById('address-postcode').value,
            "city": document.getElementById('address-city').value,
            "country": document.getElementById('address-country').value,
            "owner": document.getElementById('name').value,
            "phone": document.getElementById('phone').value,
        }, 
        "geometry": {
            "type": "Point", 
            "coordinates": [ 
                JSON.parse(localStorage.getItem('marker-coordinates')).lng, 
                JSON.parse(localStorage.getItem('marker-coordinates')).lat, 
                0.0 
            ] 
        }
    };

    // Upload the feature to the server
    uploadFeature(feature);
    function uploadFeature(feature) {
        // Add feature to Local Storage
        // let tempData = getDataFromLS();
        // tempData.features.push(feature);
        // localStorage.setItem('data',JSON.stringify(tempData));

        // Post feature to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/api/feature');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => JSON.parse(xhr.response);
        xhr.send(JSON.stringify(feature));
    }

    // Upload photos to the server
    uploadPhotos(feature.properties.id);
    function uploadPhotos(id) {
        let fileInput = document.getElementById('img-to-upload');
        let files = fileInput.files;
        let formData = new FormData()
        formData.append('id', id);
    
        if (files.length != 0) {
            for (let i = 0; i < files.length; i++) {
                formData.append('img', files[i]);
            }
    
            let request = new XMLHttpRequest();
            request.open("POST", "http://localhost:3000/api/photos/upload");
            request.send(formData);
        }
    };
};

// Get photos from the server
export function getFiles(id) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://localhost:3000/api/public/uploads/${id}`);
        xhr.onload = () => {
            resolve(JSON.parse(xhr.response));
        }
        xhr.send();
    });
};

// Save data to LS
export function saveDataToLS(data) {
    localStorage.setItem('data',JSON.stringify(data));
}

// Get data from LS
export function getDataFromLS() {
    return JSON.parse(localStorage.getItem('data'));
}