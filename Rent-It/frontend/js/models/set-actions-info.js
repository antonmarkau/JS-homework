import { logIn, register, setUserInfo } from './accounts.js';
import { userId, userName } from './accounts.js';
import { getFiles } from './data.js';
import { getFeature } from './data.js';

export function setActionsInfo() {
    // Get feature id from URL
    const url = window.location.search;
    const id = url.replace('?','');
    let featureUserId;

    // Prepare userInfo
    let userInfo = {
        'userid': '',
        'username': '',
        'password': ''
    };
    
    // Try to get userInfo from Local Storage
    try {
        userInfo = JSON.parse(localStorage.getItem('userinfo'));
        if (Object.keys(userInfo).length > 0) {
            logIn(userInfo.username, userInfo.password).then(result => {
                setUserInfo(result.accounts[0].userid, result.accounts[0].username);
                userInfo = {
                    'userid': result.accounts[0].userid,
                    'username': result.accounts[0].username,
                    'password': result.accounts[0].password
                };
                document.getElementsByClassName('username-header')[0].innerHTML = userName;
                
            })
        }
    } catch {
        // No user info in Local Storage
    }

    // Button account
    let accountInfo = document.getElementsByClassName('account-info')[0];
    accountInfo.addEventListener('click', () => {
        removeModalWindow();
        const pageContainer = document.getElementsByClassName('page-container')[0];
        if (userId != '') { // If logged in
            pageContainer.insertAdjacentHTML('afterbegin', `
            <div class="modal-window">
                <span>You are logged in as ${userName}.</span>
                <button class="btn btn-logout">Log out</button>
            </div>
            `);
            // Button log out
            let buttonLogOut = document.getElementsByClassName('btn-logout')[0];
            buttonLogOut.addEventListener('click', () => {
                document.getElementsByClassName('username-header')[0].innerHTML = 'Log in';
                document.getElementsByClassName('modal-window')[0].remove();
                setUserInfo('', '');
                localStorage.setItem('userinfo', JSON.stringify({}));
                hideRemoveButton();
            });
        } else { // If logged out
            pageContainer.insertAdjacentHTML('afterbegin', `
            <div class="modal-window">
                <div class="input-login">
                    <span class="material-icons">person</span>
                    <input id="username" placeholder="username">
                </div>
                <div class="input-login">
                    <span class="material-icons">lock</span>
                    <input id="password" placeholder="password" type="password">
                </div>
                <span class="comment">Login or register a new account.</span>
                <button class="btn btn-login">Log in</button>
                <button class="btn btn-register">Register</button>
            </div>
            `);
            let commentText = document.getElementsByClassName('comment')[0];
            commentText.style.color = '#000';
            // Button log in
            let buttonLogIn = document.getElementsByClassName('btn-login')[0];
            buttonLogIn.addEventListener('click', () => {
                let username = document.getElementById('username').value;
                let password = document.getElementById('password').value;
                // Check for empty inputs
                if (username.trim() == '' || password.trim() == '') {
                    commentText.innerHTML = 'Fields should not be empty.';
                    commentText.style.color = commentText.style.color = '#C0392B';
                } else {
                    logIn(username, password).then(result => {
                        if (Object.keys(result).length > 0) {
                            setUserInfo(result.accounts[0].userid, result.accounts[0].username);
                            document.getElementsByClassName('username-header')[0].innerHTML = userName;
                            document.getElementsByClassName('modal-window')[0].remove();
                            userInfo = {
                                'userid': result.accounts[0].userid,
                                'username': result.accounts[0].username,
                                'password': result.accounts[0].password
                            };
                            localStorage.setItem('userinfo', JSON.stringify(userInfo));
                            addRemoveButton(featureUserId);
                        } else {
                            let commentText = document.getElementsByClassName('comment')[0];
                            commentText.innerHTML = 'Incorrect username or password.';
                            commentText.style.color = '#C0392B';
                        }
                    });
                }
            });
            // Button register
            let buttonRegister = document.getElementsByClassName('btn-register')[0];
            buttonRegister.addEventListener('click', () => {
                let username = document.getElementById('username').value;
                let password = document.getElementById('password').value;
                // Check for empty inputs
                if (username.trim() == '' || password.trim() == '') {
                    commentText.innerHTML = 'Fields should not be empty.';
                    commentText.style.color = commentText.style.color = '#C0392B';
                } else {
                    register(username, password).then(result => {
                        if (Object.keys(result).length > 0) {
                            logIn(username, password);
                            document.getElementsByClassName('username-header')[0].innerHTML = userName;
                            document.getElementsByClassName('modal-window').remove;
                            removeModalWindow();
                            addRemoveButton(featureUserId);
                        } else {
                            let commentText = document.getElementsByClassName('comment')[0];
                            commentText.innerHTML = 'User already exists.';
                            commentText.style.color = '#C0392B';
                        }
                    })
                }
            });
        }
        // Close modal window on click outside
        window.addEventListener('click', (e) => {
            const modalWindow = document.getElementsByClassName('modal-window')[0];
            try {
                if (modalWindow.contains(e.target) || accountInfo.contains(e.target)) {
                    // Click is inside of modal window or account button
                } else {
                    removeModalWindow();
                }
            } catch {
                // Modal window doesn't exist
            }
        });

        function removeModalWindow() {
            const modalWindow = document.getElementsByClassName('modal-window')[0];
            try {
                modalWindow.remove();
            } catch {
                // Modal window doesn't exist
            }
        }
    });

    function hideRemoveButton() {
        try {
            document.getElementsByClassName('btn-remove-feature')[0].remove();
        } catch {
            // Button doesn't exist
        }
    };
    function addRemoveButton(featureUserId) {
        const buttonsContainer = document.getElementsByClassName('btns-container')[0];
        if (userId == featureUserId) {
            buttonsContainer.insertAdjacentHTML('afterbegin',`
            <button class="btn btn-remove-feature"><span class="material-icons">delete_forever</span>Remove</button>
            `);
            // Remove button
            let buttonRemove = document.getElementsByClassName('btn-remove-feature')[0];
            buttonRemove.addEventListener('click', () => {
                removeFeature(id);
                function removeFeature(id) {
                    return new Promise(resolve => {
                        const xhr = new XMLHttpRequest();
                        xhr.open('DELETE', `http://localhost:3000/api/feature/${id}`);
                        xhr.onload = () => resolve();
                        xhr.send();
                    });
                }
                document.getElementsByClassName('content-container-view')[0].innerHTML = `
                <div class="info-removed">
                    <p class="material-icons">delete_forever</p>
                    <p>This rent was removed. Noting to see here.</p>
                    <button class="btn btn-go-back"><span class="material-icons">undo</span>Go back</button>
                </div>
                `;

                // Go back button
                let buttonGoBack = document.getElementsByClassName('btn-go-back')[0];
                buttonGoBack.addEventListener('click', () => {
                    window.location.href = '../index.html?';
                });
            });
        }
    };

    // Go back button
    let buttonGoBack = document.getElementsByClassName('btn-go-back')[0];
    buttonGoBack.addEventListener('click', () => {
        window.location.href = '../index.html?';
    });

    // Get feature information based on id
    let feature = {};
    let coordinates = {};
    let coordinatesLat;
    let coordinatesLng;

    getFeature(id).then(result => {
        feature = result.features[0];
        featureUserId = feature.properties.userid;
        coordinates = feature.geometry.coordinates;
        coordinatesLat = coordinates[0];
        coordinatesLng = coordinates[1];

        drawMap();
        addRemoveButton(featureUserId);

        document.getElementsByClassName('feature-info-address-main')[0].innerHTML = feature.properties.streetname + ' ' + feature.properties.housenumber;
        document.getElementsByClassName('feature-info-address-additional')[0].innerHTML = feature.properties.locality + ', ' + feature.properties.postcode + ', ' + feature.properties.city + ', ' + feature.properties.country;
        document.getElementsByClassName('feature-info-prise')[0].innerHTML = feature.properties.prise + ' USD per month';
        document.getElementsByClassName('feature-info-rooms')[0].innerHTML = 'Rooms: ' + feature.properties.rooms;
        document.getElementsByClassName('feature-info-metro')[0].innerHTML = 'Close to metro station: ' + feature.properties.metro;
        document.getElementsByClassName('feature-info-owner')[0].innerHTML = 'Owner name: ' + feature.properties.owner;
        document.getElementsByClassName('feature-info-phone')[0].innerHTML = 'Phone: ' + feature.properties.phone;
    });

    function drawMap() {
        // Draw map
        const marker = new mapboxgl.Marker({
            draggable: false
        });

        // TO MAKE THE MAP APPEAR YOU MUST
        // ADD YOUR ACCESS TOKEN FROM
        // https://account.mapbox.com
        mapboxgl.accessToken = 'pk.eyJ1IjoiYXZtYXJrb3Y5MyIsImEiOiJjanR5NHVndmExaXUzNDVydHFrdGJicnF5In0.ZHYnVRlDWTGeEve-aAxQBQ';
        const map = new mapboxgl.Map({
            container: document.getElementsByClassName('map-container-view')[0],
            style: 'mapbox://styles/mapbox/light-v10',
            center: [coordinatesLat, coordinatesLng],
            zoom: 17
        });

        map.on('idle',function(){
            map.resize()
        });

        let mapCenter = map.getCenter();
        marker
        .setLngLat([mapCenter.lng, mapCenter.lat])
        .addTo(map);
    }

    // Get list of files from the server
    getFiles(id).then(result => {
        let filesList = result;
        // Get file names
        try {
            // Trying
            // Get files into the image container
            // Slider was shamelessly stolen from https://www.w3schools.com/howto/howto_js_slideshow.asp
            let imgContainer = document.getElementsByClassName('img-container')[0];
            imgContainer.innerHTML = '';
            if (filesList.length != 0) {
                for (let i = 0; i < filesList.length; i++) {
                    imgContainer.innerHTML += `
                        <div class="mySlides fade">
                            <div class="numbertext">${i + 1} / ${filesList.length}</div>
                            <img src="http://localhost:3000/uploads/${id}/${filesList[i]}">
                        </div>
                    `;
                }
                imgContainer.innerHTML += `
                    <a id="btn-prev" class="prev">&#10094;</a>
                    <a id="btn-next" class="next">&#10095;</a>
                `;

                var slideIndex = 1;
                showSlides(slideIndex);

                // Next/previous controls
                function plusSlides(n) {
                    showSlides(slideIndex += n);
                }

                let btnPrev = document.getElementById('btn-prev');
                btnPrev.addEventListener('click', () => {
                    showSlides(slideIndex += -1);
                });

                let btnNext = document.getElementById('btn-next');
                btnNext.addEventListener('click', () => {
                    showSlides(slideIndex += 1);
                });

                // Thumbnail image controls
                function currentSlide(n) {
                    showSlides(slideIndex = n);
                }

                function showSlides(n) {
                    var i;
                    var slides = document.getElementsByClassName("mySlides");
                    if (n > slides.length) {slideIndex = 1}
                    if (n < 1) {slideIndex = slides.length}
                    for (i = 0; i < slides.length; i++) {
                        slides[i].style.display = "none";
                    }
                    slides[slideIndex-1].style.display = "block";
                }
            }
        } catch {
            // No photos
        }
    });
}