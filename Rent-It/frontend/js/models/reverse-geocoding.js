// Get address of coordinates
export function reverseGeocoding(lng, lat) {
    let reverseGeocodedFeatures = [];
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+lng+','+lat+'.json?types=address&language=en&access_token=pk.eyJ1IjoiYXZtYXJrb3Y5MyIsImEiOiJjanR5NHVndmExaXUzNDVydHFrdGJicnF5In0.ZHYnVRlDWTGeEve-aAxQBQ');
    xhr.onload = () => {
        reverseGeocodedFeatures = (JSON.parse(xhr.response).features[0]);

        const inputStreetName = document.getElementById('address-streetname'),
            inputHouseNumber = document.getElementById('address-housenumber'),
            inputLocality = document.getElementById('address-locality'),
            inputPostcode = document.getElementById('address-postcode'),
            inputCity = document.getElementById('address-city'),
            inputCountry = document.getElementById('address-country');

            inputHouseNumber.value = reverseGeocodedFeatures.address;
            inputStreetName.value = reverseGeocodedFeatures.text;

        const matches = {
            'postcode': inputPostcode,
            'locality': inputLocality,
            'place': inputCity,
            'country': inputCountry
        };

        console.log(reverseGeocodedFeatures.context);
        for (let i = 0; i < reverseGeocodedFeatures.context.length; i++) {
            if(reverseGeocodedFeatures.context[i].id.includes(Object.keys(matches)[i])) {
                console.log(Object.keys(matches)[i]);
                console.log(matches[Object.keys(matches)[i]]);
                matches[Object.keys(matches)[i]].value = reverseGeocodedFeatures.context[i].text;
            }
        }
    }
    xhr.send();
}