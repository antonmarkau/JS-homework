import { addFeature } from './add-feature.js';
import { updateFeatures } from './update-features.js';
import { saveFeature } from './data.js';
import { marker } from './map.js';
import { applyFilter, clearFilter } from './filter.js';
import { logIn, register, setUserInfo } from './accounts.js';
import { userId, userName } from './accounts.js';

export function setActions() {
    let userInfo = {
        'userid': '',
        'username': '',
        'password': ''
    };
    
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
                updateAddButon();
            })
        }
    } catch {
    
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
                disableAddButon();
                //removeModalWindow();
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
                            updateAddButon();
                            //removeModalWindow();
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
                                    updateAddButon();
                                    //removeModalWindow();
                                } else {
                                    let commentText = document.getElementsByClassName('comment')[0];
                                    commentText.innerHTML = 'Incorrect username or password.';
                                    commentText.style.color = '#C0392B';
                                }
                            });
                        } else {
                            let commentText = document.getElementsByClassName('comment')[0];
                            commentText.innerHTML = 'User already exists.';
                            commentText.style.color = '#C0392B';
                        }
                    })
                }
            });
        }
        // Close on click outside
        window.addEventListener('click', (e) => {
            const modalWindow = document.getElementsByClassName('modal-window')[0];
            try {
                if (modalWindow.contains(e.target) || accountInfo.contains(e.target)) {

                } else {
                    removeModalWindow();
                }
            } catch {

            }
        });

        function removeModalWindow() {
            const modalWindow = document.getElementsByClassName('modal-window')[0];
            try {
                modalWindow.remove();
            } catch {

            }
        }
    });

    // Button add
    let buttonAdd = document.getElementsByClassName('btn-add-feature')[0];
    buttonAdd.addEventListener('click', () => {
        addFeature();
        document.getElementsByClassName('side-panel-filter')[0].style.display = 'none';
        document.getElementsByClassName('side-panel-addition')[0].style.display = 'flex';
    });
    function disableAddButon() {
        buttonAdd.disabled = true;
        buttonAdd.setAttribute('title', 'Log in to add a rent');
    };
    function updateAddButon() {
        if (userId != '') {
            buttonAdd.disabled = false;
            buttonAdd.removeAttribute('title');
        };
    };

    // Button save
    let buttonSave = document.getElementsByClassName('btn-save-feature')[0];
    buttonSave.addEventListener('click', () => {
        document.getElementsByClassName('info-please')[0].innerHTML = 'Please fill in the information in the feilds above.';
        document.getElementsByClassName('info-please')[0].style.color = '#000';
        // Check inputs
        const phoneCheck = /^(((\+)?375(-)?)|8(-)?0)(25|29|33|44|17)(-)?([0-9]{3})(-)?([0-9]{2})(-)?([0-9]{2})$/;
        const nameCheck = /^([а-яА-Яa-zA-Z]{2,20})(\s([а-яА-Яa-zA-Z]{2,20}))?(\s([а-яА-Яa-zA-Z]{2,20}))?$/;
        if (
            document.getElementById('prise').value != '' && // Empty prise
            document.getElementById('rooms').value != '' && // Empty rooms
            document.getElementById('address-streetname').value != '' && // Empty street
            document.getElementById('address-housenumber').value != '' && // Empty house
            document.getElementById('address-streetname').value != '' && // Empty street
            document.getElementById('address-locality').value != '' && // Empty locality
            document.getElementById('address-city').value != '' && // Empty city
            document.getElementById('address-country').value != '' && // Empty country
            nameCheck.test(document.getElementById('name').value) && // Incorrect name
            phoneCheck.test(document.getElementById('phone').value) // Wrong phone
        ) {
            saveFeature();
            updateFeatures();
            marker.remove();
            let inputs = document.getElementsByTagName('input');
            for (let i = 0; i<inputs.length; i++) {
                inputs[i].value = '';
            }

            let checkmark = document.getElementById('metro');
            checkmark.checked = false;

            document.getElementsByClassName('side-panel-filter')[0].style.display = 'flex';
            document.getElementsByClassName('side-panel-addition')[0].style.display = 'none';
        } else {
            document.getElementsByClassName('info-please')[0].innerHTML = 'One or more fields are filled incocrrectly. Please check.';
            document.getElementsByClassName('info-please')[0].style.color = '#C0392B';
        }
    });

    // Button cancel
    let buttonAddCancel = document.getElementsByClassName('btn-add-feature-cancel')[0];
    buttonAddCancel.addEventListener('click', () => {
        document.getElementsByClassName('info-please')[0].innerHTML = 'Please fill in the information in the feilds above.';
        document.getElementsByClassName('info-please')[0].style.color = '#000';
        marker.remove();
        let inputs = document.getElementsByTagName('input');
        for (let i = 0; i<inputs.length; i++) {
            inputs[i].value = '';
        }

        let checkmark = document.getElementById('metro');
        checkmark.checked = false;

        document.getElementsByClassName('side-panel-filter')[0].style.display = 'flex';
        document.getElementsByClassName('side-panel-addition')[0].style.display = 'none';
    });

    // Button apply filter
    let buttonApplyFilter = document.getElementsByClassName('btn-apply-filter')[0];
    buttonApplyFilter.addEventListener('click', (e) => {
        applyFilter(e);
    });

    // Button clear filter
    let buttonClearFilter = document.getElementsByClassName('btn-clear-filter')[0];
    buttonClearFilter.addEventListener('click', (e) => {
        clearFilter(e);
    });
}