document.addEventListener("DOMContentLoaded", function() {
    
    let footerPath = '/src/footer.html';
    
    fetch(footerPath)
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
        });
});