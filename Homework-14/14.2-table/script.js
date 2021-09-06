var table = document.getElementById('tableId');
var tbody = document.getElementById('tbodyId');

table.onclick = function(event) {
    var target = event.target;

    if (target.className === 'addRow') {
        var existingRow = tbody.getElementsByTagName('tr')[0];
        var newRow = document.createElement('tr');
        newRow.innerHTML = '<tr><td></td><td></td><td></td></tr>';

        tbody.insertBefore(newRow, existingRow);
    }

    if (target.className != 'addRow' && target.tagName === 'TD') {
        var input = document.createElement('input');

        var value = target.innerHTML;
        target.innerHTML = '';

        target.appendChild(input);
        input.value = value;
        input.focus();

        input.addEventListener('blur', function(event) {
            var value = input.value;
            target.removeChild(input);
            target.innerHTML = value;
        });

        input.addEventListener('keydown', function(event) {
            if (event.keyCode === 13) {
                input.blur();
            }
        });
    }
}