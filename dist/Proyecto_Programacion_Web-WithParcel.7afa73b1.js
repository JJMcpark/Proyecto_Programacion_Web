document.addEventListener("DOMContentLoaded", function() {
    let headerPath = 'header.html';
    if (!window.location.pathname.endsWith('index.html')) headerPath = '../header.html';
    fetch(headerPath).then((response)=>response.text()).then((data)=>{
        document.body.insertAdjacentHTML('afterbegin', data);
    });
});

//# sourceMappingURL=Proyecto_Programacion_Web-WithParcel.7afa73b1.js.map
