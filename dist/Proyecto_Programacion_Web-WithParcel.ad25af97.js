document.addEventListener("DOMContentLoaded", function() {
    let modalsPath = 'auth.html';
    if (!window.location.pathname.endsWith('index.html')) modalsPath = '../auth.html';
    fetch(modalsPath).then((response)=>response.text()).then((data)=>{
        document.body.insertAdjacentHTML('beforeend', data);
    });
});
function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'flex';
}
function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
}
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'flex';
}
function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

//# sourceMappingURL=Proyecto_Programacion_Web-WithParcel.ad25af97.js.map
