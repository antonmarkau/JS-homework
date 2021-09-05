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
var button = document.getElementById('button');

button.onclick = function() {
    var firstParahraph = emptyContainer.firstChild;
    var links = firstParahraph.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].style.color = 'cyan';
        links[i].style.fontWeight = 'bold';
    }
}

// Действия по нажатию на второй абзац и ссылки в нём
var secondParagraph = emptyContainer.lastChild;

secondParagraph.onclick = function(event) {
    var target = event.target;

    if (target.tagName === 'A') {
        //target.preventDefault(); // Не смог заставить это работать, сделал отмену перехода поссылке через return false;
        alert(target.href);
        return false;
    }
}