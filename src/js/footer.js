document.addEventListener("DOMContentLoaded", function() {
    
    let footerPath = 'footer.html';
    if (!window.location.pathname.endsWith('index.html')) {
        footerPath = '../footer.html';
    }
    
    fetch(footerPath)
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
});