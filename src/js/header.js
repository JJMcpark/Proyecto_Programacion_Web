document.addEventListener("DOMContentLoaded", function() {

    let headerPath = '/src/header.html';

    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        });
});