// ==========================================
// LÓGICA GLOBAL (FUNCIONES INTERACTIVAS DESDE EL HTML)
// ==========================================

/**
 * FUNCIÓN DE GIRO DE TARJETA (3D CARD FLIP)
 * Controla el efecto tridimensional en la pantalla de Login y Registro.
 */
function flip(event) {
    if (event) event.preventDefault(); // Evita que la página recargue o salte
    const tarjeta = document.getElementById('card');
    if (tarjeta) {
        tarjeta.classList.toggle('flipped'); // Alterna la rotación de 180 grados definida en el CSS
    }
}

// ==========================================
// LÓGICA CUANDO EL CONTENIDO HTML YA CARGÓ
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. LÓGICA DEL CARRITO CON LOCALSTORAGE (Funcionalidad Adicional)
    // ==========================================
    let cantidadProductos = parseInt(localStorage.getItem('carritoCantidad')) || 0;
    
    const contadorElemento = document.getElementById('cart-count');
    const contadorTabla = document.getElementById('cart-table-qty');

    if (contadorElemento) contadorElemento.textContent = cantidadProductos;
    if (contadorTabla) contadorTabla.textContent = cantidadProductos;

    const botonesAgregar = document.querySelectorAll('.card .button, .article .button');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            cantidadProductos++;
            
            localStorage.setItem('carritoCantidad', cantidadProductos);
            
            if (contadorElemento) contadorElemento.textContent = cantidadProductos;
            if (contadorTabla) contadorTabla.textContent = cantidadProductos;
        });
    });

    const btnVaciar = document.getElementById('btn-clear-cart');
    if (btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            cantidadProductos = 0;
            localStorage.setItem('carritoCantidad', 0);
            if (contadorElemento) contadorElemento.textContent = 0;
            if (contadorTabla) contadorTabla.textContent = 0;
        });
    }

    // ==========================================
    // 2. MENÚ RESPONSIVO (BURGER DE BULMA)
    // ==========================================
    const botonBurger = document.querySelector('.navbar-burger');
    const menuNavegacion = document.getElementById('navbarMain');

    if (botonBurger && menuNavegacion) {
        botonBurger.addEventListener('click', () => {
            botonBurger.classList.toggle('is-active');
            menuNavegacion.classList.toggle('is-active');
        });
    }

    // ==========================================
    // 3. VALIDACIÓN DE FORMULARIO (Requerimiento de Rúbrica)
    // ==========================================
    const formulario = document.getElementById('contacto-form');
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            const nombre = document.getElementById('form-nombre').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const mensaje = document.getElementById('form-mensaje').value.trim();
            const errorElemento = document.getElementById('form-error');

            errorElemento.classList.add('is-hidden');
            errorElemento.textContent = "";

            if (nombre === "" || email === "" || mensaje === "") {
                errorElemento.classList.remove('is-hidden');
                errorElemento.textContent = "Por favor, completa todos los campos obligatorios.";
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorElemento.classList.remove('is-hidden');
                errorElemento.textContent = "Por favor, introduce un correo electrónico válido.";
                return;
            }

            const modalExito = document.getElementById('modal-success');
            if (modalExito) {
                modalExito.classList.add('is-active');
                formulario.reset(); 
            }
        });
    }

    // ==========================================
    // 4. LÓGICA PARA CERRAR MODALES
    // ==========================================
    const cerrarModales = document.querySelectorAll('.modal-close, .close-modal-btn, .modal-background');
    cerrarModales.forEach(elemento => {
        elemento.addEventListener('click', () => {
            const modales = document.querySelectorAll('.modal');
            modales.forEach(modal => modal.classList.remove('is-active'));
        });
    });

    // ==========================================
    // 5. EFECTO DE NAVEGACIÓN DESLIZANTE AUTOMÁTICO (CON RECALCULO DE TAMAÑO)
    // ==========================================
    const menuStart = document.querySelector('.navbar-start');
    const indicador = document.querySelector('.nav-sliding-indicator');
    const linksMenu = document.querySelectorAll('.navbar-start .navbar-item');

    if (menuStart && indicador) {
        const moverCapsula = (elemento) => {
            if (window.innerWidth >= 1024) {
                indicador.style.left = `${elemento.offsetLeft}px`;
                indicador.style.width = `${elemento.offsetWidth}px`;
                indicador.style.opacity = '1';
            }
        };

        const actualizarPosicionActual = () => {
            const linkActivo = document.querySelector('.navbar-start .navbar-item.is-active');
            if (linkActivo && window.innerWidth >= 1024) {
                moverCapsula(linkActivo);
            } else {
                indicador.style.opacity = '0'; // Ocultar si pasa a formato móvil
            }
        };

        // Inicializar posición
        actualizarPosicionActual();

        linksMenu.forEach(link => {
            link.addEventListener('mouseenter', () => moverCapsula(link));
        });

        menuStart.addEventListener('mouseleave', () => {
            actualizarPosicionActual();
        });

        // OPTIMIZACIÓN RESPONSIVA: Recalcula la posición si la pantalla cambia de tamaño o se gira el dispositivo
        window.addEventListener('resize', () => {
            actualizarPosicionActual();
        });
    }

    // ==========================================
    // 6. INTERACCIÓN Y FILTRADO REAL DEL BUSCADOR
    // ==========================================
    const buscadorInput = document.querySelector('.custom-search-input');
    const buscadorBtn = document.querySelector('.custom-search-btn');

    if (buscadorInput) {
        const filtrarProductos = () => {
            const query = buscadorInput.value.toLowerCase().trim();
            const tarjetas = document.querySelectorAll('.product-3d-card');

            tarjetas.forEach(tarjeta => {
                const tituloElemento = tarjeta.querySelector('.title, p.title, h3.title');
                
                if (tituloElemento) {
                    const textoTitulo = tituloElemento.textContent.toLowerCase();
                    const columnaContenedora = tarjeta.closest('.column');

                    if (columnaContenedora) {
                        if (textoTitulo.includes(query)) {
                            columnaContenedora.style.display = ""; 
                        } else {
                            columnaContenedora.style.display = "none"; 
                        }
                    }
                }
            });
        };

        buscadorInput.addEventListener('input', filtrarProductos);

        if (buscadorBtn) {
            buscadorBtn.addEventListener('click', (e) => {
                e.preventDefault();
                filtrarProductos();
            });
        }
    }
});