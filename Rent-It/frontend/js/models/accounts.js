export let userId = '';
export let userName = '';

// Log in
export function logIn(username, password) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', `http://localhost:3000/api/get-user/${username}&${password}`);
        xhr.onload = () => resolve(JSON.parse(xhr.response));
	    xhr.send();
    });
};

// Register
export function register(username, password) {
    return new Promise(resolve => {
        // Prepare user credentials
        let userCredentials = {
            "userid": Math.random().toString(36).substr(2, 9),
            "username": username,
            "password": password
        }
        // Upload user credentials to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/api/new-user');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => resolve(JSON.parse(xhr.response));
        xhr.send(JSON.stringify(userCredentials));
    });
};

// Set user info
export function setUserInfo(userid, username) {
        userId = userid;
        userName = username;
}