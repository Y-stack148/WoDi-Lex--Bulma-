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
    // 5. EFECTO DE NAVEGACIÓN DESLIZANTE AUTOMÁTICO (CORREGIDO: Ahora dentro del DOMContentLoaded)
    // ==========================================
    const menuStart = document.querySelector('.navbar-start');
    const indicador = document.querySelector('.nav-sliding-indicator');
    const linksMenu = document.querySelectorAll('.navbar-start .navbar-item');

    if (menuStart && indicador && window.innerWidth >= 1024) {
        
        const moverCapsula = (elemento) => {
            indicador.style.left = `${elemento.offsetLeft}px`;
            indicador.style.width = `${elemento.offsetWidth}px`;
            indicador.style.opacity = '1';
        };

        const linkActivo = document.querySelector('.navbar-start .navbar-item.is-active');
        if (linkActivo) {
            moverCapsula(linkActivo);
        }

        linksMenu.forEach(link => {
            link.addEventListener('mouseenter', () => moverCapsula(link));
        });

        menuStart.addEventListener('mouseleave', () => {
            if (linkActivo) {
                moverCapsula(linkActivo);
            } else {
                indicador.style.opacity = '0';
            }
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

        // Escucha en tiempo real cada letra presionada
        buscadorInput.addEventListener('input', filtrarProductos);

        // Soporte por si presionan clic en la lupa
        if (buscadorBtn) {
            buscadorBtn.addEventListener('click', (e) => {
                e.preventDefault();
                filtrarProductos();
            });
        }
    }
});