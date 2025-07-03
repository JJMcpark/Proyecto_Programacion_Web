document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-bienvenida');
    const botonCerrar = document.getElementById('cerrar-modal');
    const botonEntendido = document.getElementById('boton-entendido');

    modal.style.display = 'flex';

    botonCerrar.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    botonEntendido.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});