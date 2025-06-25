document.addEventListener("DOMContentLoaded", function() {
    let headerPath = '/src/header.html';
    fetch(headerPath).then((response)=>response.text()).then((data)=>{
        document.body.insertAdjacentHTML('afterbegin', data);
    });
});

//# sourceMappingURL=Proyecto_Programacion_Web.7afa73b1.js.map
