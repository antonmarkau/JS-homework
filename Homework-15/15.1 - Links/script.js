var linkYouTube = '<a href="https://www.youtube.com/">YouTube</a>';
var linkTwitter = '<a href="https://twitter.com/">Twitter</a>';
var linkSteam = '<a href="https://store.steampowered.com/">Steam</a>';
var linkTwitch = '<a href="https://www.twitch.tv/">Twitch</a>';

var newParagraph1 = document.createElement('p');
var newParagraph2 = document.createElement('p');

var emptyContainer = document.getElementById('emptyContainer');

newParagraph1.innerHTML = 'Watch videos on ' + linkYouTube + ' and share your thoughts on ' + linkTwitter + '.';
newParagraph2.innerHTML = 'Watch streamers on ' + linkTwitch + ' and buy games on ' + linkSteam + '.';

emptyContainer.appendChild(newParagraph1);
emptyContainer.appendChild(newParagraph2);

// Делаем действия со ссылками первого абзаца
var buttons = document.getElementsByTagName('BUTTON');

for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];

    button.addEventListener('click', function() {
        var firstParahraph = emptyContainer.firstChild;
        var links = Array.from(firstParahraph.childNodes).filter(function(element) {
            return element.tagName == 'A';
        });
        for (var i = 0; i < links.length; i++) {
            links[i].className = 'ColorCyan FontWeightBold';
        }
    });
}

// Действия по нажатию на второй абзац и ссылки в нём
var secondParagraph = emptyContainer.lastChild;

secondParagraph.onclick = function(event) {
    event.preventDefault();
    var target = event.target;



    if (target.tagName === 'A') {
        var linkLS = localStorage.getItem(target.innerHTML);

        if(linkLS) {
            var linkPath = JSON.parse(localStorage.getItem(target.innerHTML));
            alert(linkPath['path']);
        } else {
            localStorage.setItem(target.innerHTML, JSON.stringify({path: target.href}));
            target.href = '#';
            alert('The link have been saved.');
        }
    }
}

// Чистим localStorage при загрузке страницы
window.onload = function() {
    localStorage.clear();
}