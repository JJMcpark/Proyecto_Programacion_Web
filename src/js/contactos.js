class ContactosComponent {
    constructor() {
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const container = document.getElementById('contactos-container');
        if (!container) return;

        container.innerHTML = `
            <section class="contactos-section">
                <div class="container">
                    <h2 class="contactos-title">Contáctanos</h2>
                    <p class="contactos-subtitle">¿Tienes dudas o quieres más información? ¡Escríbenos!</p>
                    
                    <div class="contactos-content">
                        <div class="contactos-form-container">
                            <form class="contactos-form" id="contactos-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="nombre">Nombre</label>
                                        <input type="text" id="nombre" name="nombre" placeholder="Tu nombre completo" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Correo Electrónico</label>
                                        <input type="email" id="email" name="email" placeholder="tu@email.com" required>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="telefono">Teléfono (opcional)</label>
                                    <input type="tel" id="telefono" name="telefono" placeholder="+51 999 999 999">
                                </div>
                                <div class="form-group">
                                    <label for="mensaje">Mensaje</label>
                                    <textarea id="mensaje" name="mensaje" placeholder="Cuéntanos cómo podemos ayudarte..." rows="5" required></textarea>
                                </div>
                                <button type="submit" class="btn-enviar">
                                    <span class="btn-text">⚡ Enviar Mensaje</span>
                                    <span class="btn-loading" style="display: none;">
                                        <i class="fas fa-spinner fa-spin"></i> Enviando...
                                    </span>
                                </button>
                            </form>
                            
                            <!-- Mensaje de éxito -->
                            <div class="success-message" id="success-message" style="display: none;">
                                <div class="success-content">
                                    <i class="fas fa-check-circle"></i>
                                    <h3>¡Mensaje Enviado!</h3>
                                    <p>Gracias por contactarnos. Te responderemos pronto.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="contactos-info">
                            <div class="info-card">
                                <div class="info-icon">📍</div>
                                <h3>Ubicación</h3>
                                <p>Av. Principal 123<br>Lima, Perú</p>
                                <a href="https://maps.google.com" target="_blank" class="info-link">Ver en Maps</a>
                            </div>
                            <div class="info-card">
                                <div class="info-icon">📞</div>
                                <h3>Teléfono</h3>
                                <p>+51 999 999 999</p>
                                <a href="tel:+51999999999" class="info-link">Llamar ahora</a>
                            </div>
                            <div class="info-card">
                                <div class="info-icon">✉️</div>
                                <h3>Email</h3>
                                <p>info@gymsolution.com</p>
                                <a href="mailto:info@gymsolution.com" class="info-link">Enviar email</a>
                            </div>
                            <div class="info-card">
                                <div class="info-icon">🕒</div>
                                <h3>Horarios</h3>
                                <p>Lun - Vie: 6:00 - 22:00<br>Sáb - Dom: 8:00 - 20:00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
        this.addStyles();
    }

    attachEventListeners() {
        const form = document.getElementById('contactos-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }

        const inputs = document.querySelectorAll('.contactos-form input, .contactos-form textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
            input.addEventListener('input', this.clearErrors.bind(this));
        });
    }

    validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        field.classList.remove('error');
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();

        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    isValid = false;
                    message = 'Por favor ingresa un email válido';
                }
                break;
            case 'tel':
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
                if (value && !phoneRegex.test(value)) {
                    isValid = false;
                    message = 'Por favor ingresa un teléfono válido';
                }
                break;
        }

        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            field.parentElement.appendChild(errorDiv);
        }

        return isValid;
    }

    clearErrors(e) {
        const field = e.target;
        field.classList.remove('error');
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('.btn-enviar');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        // Validar todos los campos
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.classList.add('error');
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Por favor completa todos los campos requeridos', 'error');
            return;
        }

        // Mostrar estado de carga
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-flex';

        try {
            // Simular envío (aquí integrarías con tu backend)
            await this.simulateSubmit(new FormData(form));
            
            // Mostrar mensaje de éxito
            this.showSuccessMessage();
            form.reset();
            
        } catch (error) {
            this.showNotification('Error al enviar el mensaje. Inténtalo de nuevo.', 'error');
        } finally {
            // Restaurar botón
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }

    async simulateSubmit(formData) {
        // Simular delay de envío
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Datos del formulario:', Object.fromEntries(formData));
                resolve();
            }, 2000);
        });
    }

    showSuccessMessage() {
        const form = document.querySelector('.contactos-form');
        const successMessage = document.getElementById('success-message');
        
        form.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            form.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    }

    showNotification(message, type = 'info') {
        // Crear notificación toast
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Mostrar con animación
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    addStyles() {
        if (document.getElementById('contactos-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'contactos-styles';
        styles.textContent = `
            .contactos-section {
                background: var(--gris-claro, #f8f9fa);
                padding: 80px 20px;
            }

            .contactos-title {
                text-align: center;
                color: var(--amarillo, #ffd700);
                font-size: 2.5rem;
                margin-bottom: 15px;
            }

            .contactos-subtitle {
                text-align: center;
                color: var(--gris-oscuro, #666);
                font-size: 1.2rem;
                margin-bottom: 50px;
            }

            .contactos-content {
                max-width: 1200px;
                margin: 0 auto;
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 60px;
                align-items: start;
            }

            .contactos-form {
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }

            .form-row {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }

            .form-group {
                margin-bottom: 25px;
            }

            .form-group label {
                display: block;
                margin-bottom: 8px;
                color: var(--gris-oscuro, #333);
                font-weight: 600;
            }

            .form-group input,
            .form-group textarea {
                width: 100%;
                padding: 15px;
                border: 2px solid #e1e5e9;
                border-radius: 10px;
                font-size: 1rem;
                transition: all 0.3s ease;
                font-family: inherit;
            }

            .form-group input:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: var(--morado, #6c5ce7);
                box-shadow: 0 0 0 3px rgba(108, 92, 231, 0.1);
            }

            .form-group input.error,
            .form-group textarea.error {
                border-color: #e74c3c;
            }

            .error-message {
                color: #e74c3c;
                font-size: 0.9rem;
                margin-top: 5px;
            }

            .btn-enviar {
                width: 100%;
                background: linear-gradient(135deg, var(--morado, #6c5ce7) 0%, var(--amarillo, #ffd700) 100%);
                color: white;
                padding: 18px 30px;
                border: none;
                border-radius: 50px;
                font-size: 1.1rem;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
            }

            .btn-enviar:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            }

            .btn-enviar:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }

            .btn-loading {
                display: none;
                align-items: center;
                gap: 8px;
            }

            .success-message {
                background: white;
                padding: 40px;
                border-radius: 20px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                text-align: center;
            }

            .success-content i {
                font-size: 4rem;
                color: #27ae60;
                margin-bottom: 20px;
            }

            .success-content h3 {
                color: var(--morado, #6c5ce7);
                font-size: 1.8rem;
                margin-bottom: 15px;
            }

            .success-content p {
                color: var(--gris-oscuro, #666);
                font-size: 1.1rem;
            }

            .contactos-info {
                display: grid;
                gap: 30px;
            }

            .info-card {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.08);
                text-align: center;
                transition: transform 0.3s ease;
            }

            .info-card:hover {
                transform: translateY(-5px);
            }

            .info-icon {
                font-size: 2.5rem;
                margin-bottom: 15px;
            }

            .info-card h3 {
                color: var(--morado, #6c5ce7);
                font-size: 1.3rem;
                margin-bottom: 10px;
            }

            .info-card p {
                color: var(--gris-oscuro, #666);
                margin-bottom: 15px;
                line-height: 1.5;
            }

            .info-link {
                color: var(--amarillo, #ffd700);
                text-decoration: none;
                font-weight: 600;
                font-size: 0.9rem;
                transition: color 0.3s ease;
            }

            .info-link:hover {
                color: var(--morado, #6c5ce7);
            }

            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                padding: 15px 20px;
                border-radius: 10px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 1000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            }

            .notification.show {
                transform: translateX(0);
            }

            .notification.error {
                border-left: 4px solid #e74c3c;
                color: #e74c3c;
            }

            .notification.info {
                border-left: 4px solid var(--morado, #6c5ce7);
                color: var(--morado, #6c5ce7);
            }

            @media (max-width: 768px) {
                .contactos-content {
                    grid-template-columns: 1fr;
                    gap: 40px;
                }

                .form-row {
                    grid-template-columns: 1fr;
                }

                .contactos-form {
                    padding: 30px 20px;
                }

                .notification {
                    right: 10px;
                    left: 10px;
                    transform: translateY(-100px);
                }

                .notification.show {
                    transform: translateY(0);
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
}

// Inicializar el componente cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new ContactosComponent();
});