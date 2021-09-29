var buttonLoad = document.getElementById('button_load');

// Clear localStorage on page load
window.onload = function() {
    localStorage.clear();
}

// Clicking on the button
buttonLoad.onclick = function() {
    // Display the main block with user info
    document.getElementsByClassName('main-block')[0].style.display = 'flex';
    // Clear HTML for tabs and info block
    document.getElementsByClassName('users-tabs')[0].innerHTML = "";
    document.getElementsByClassName('info-block')[0].innerHTML = "";

    // Function for building the users info and tabs
    var buildInfo = function() {
        for (var i = 0; i < userList.length; i++) {
            // Gathering information
            var userAvatar = document.createElement('img');
            userAvatar.src = userList[i].avatar;
    
            var userEmail = document.createElement('p');
            userEmail.innerHTML = 'Email: ' + userList[i].email;
    
            var userFirstName = document.createElement('p');
            userFirstName.innerHTML = 'First name: ' + userList[i].first_name;
    
            var userLastName = document.createElement('p');
            userLastName.innerHTML = 'Last name: ' + userList[i].last_name;

            // Building information tabs
            var info = document.createElement('div');
            info.className = 'tabcontent';
            info.id = 'user' + (i + 1);
    
            var infoBlock = document.getElementsByClassName('info-block');
            infoBlock[0].append(info);
    
            var avatarContainer = document.createElement('div');
            avatarContainer.className = 'user-avatar';
            info.append(avatarContainer);
            avatarContainer.append(userAvatar);
    
            var infoContainer = document.createElement('div');
            infoContainer.className = 'user-info';
            info.append(infoContainer);
            infoContainer.append(userFirstName, userLastName, userEmail);
    
            // Create button
            var buttonUser = document.createElement('button');
            buttonUser.className = 'tablinks';
            buttonUser.id = i + 1;
            buttonUser.innerHTML = 'Пользователь ' + (i + 1);
            buttonUser.addEventListener('click', openInfo, false);
    
            var usersTabs = document.getElementsByClassName('users-tabs');
            usersTabs[0].append(buttonUser);
    
            // Make user 1 selected by default
            if (i === 0) {
                info.style.display = 'flex';
                buttonUser.className = 'tablinks active';
            }

        }
    }

    // Check if there is already data in localStorage
    var userList = [];

    if (localStorage.getItem('UserList') != null) {
        // If exists - use it to display users info
        console.log('The userList data is in localStorage already!');
        userList = JSON.parse(localStorage.getItem('UserList') );

        buildInfo();
    } else {
        // If not - get data with XML request
        console.log('The userList data is not in localStorage! Sending XML request.');
        var xhr = new XMLHttpRequest();
        //xhr.open('GET', 'https://reqres.in/api/users?page=2', true); // успешный запрос (код 200) - попадем в onload
        xhr.open('GET', 'https://reqres.in/api2/users?page=2'); // неуспешный запрос - несуществующая страница (код 404) - попадем в onload
        //xhr.open('GET', 'https://reqres1.in/api/users?page=2'); // неуспешный запрос - несуществующий домен (код 0) - попадем в onerror

        xhr.send();

        xhr.onload = function() {
            var statusType = Math.round(this.status / 100);
            if(statusType !=2) errorInfo(this.status);
        };

        xhr.onerror = function() {
            errorInfo(this.status);
        }

        xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;

            userList = JSON.parse(this.response).data;
            localStorage.setItem('UserList', JSON.stringify(userList) );

            buildInfo();
        }
    }
}

// Function to display a relevant tab by clicking the button
var openInfo = function(evt) {
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById('user' + this.id).style.display = "flex";
    evt.currentTarget.className += " active";
}

// Function for displaying error message on the page
var errorInfo = function(code) {
    var pageContent = document.getElementsByClassName('page-content')[0];

    var errorContainer = document.createElement('div');
    errorContainer.className = 'error-container';
    errorContainer.innerHTML = '<button class="button-close"><span class="material-icons">close</span></button><div class="error-text"><p>Oops! Something went wrong.</p><p>Error code:</p><p>' + code + '</p></div>'

    pageContent.append(errorContainer);

    // Close on "X" button
    var buttonClose = document.getElementsByClassName('button-close')[0];
    buttonClose.onclick = function() {
        errorContainer.remove();
    }

    // Close on click outside the window
    window.onclick = function() {
        errorContainer.remove();
    }

    errorContainer.onclick = function(event) {
        event.stopPropagation();
    }
}