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
    // Recuperamos la cantidad guardada o empezamos en 0 si es la primera vez
    let cantidadProductos = parseInt(localStorage.getItem('carritoCantidad')) || 0;
    
    const contadorElemento = document.getElementById('cart-count');
    const contadorTabla = document.getElementById('cart-table-qty');

    // Actualizar los textos de los contadores si existen en la página actual
    if (contadorElemento) contadorElemento.textContent = cantidadProductos;
    if (contadorTabla) contadorTabla.textContent = cantidadProductos;

    // Escuchar clics en los botones de agregar al carrito
    const botonesAgregar = document.querySelectorAll('.card .button, .article .button');
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();
            cantidadProductos++;
            
            // Guardamos en el navegador para que no se borre al cambiar de página
            localStorage.setItem('carritoCantidad', cantidadProductos);
            
            if (contadorElemento) contadorElemento.textContent = cantidadProductos;
            if (contadorTabla) contadorTabla.textContent = cantidadProductos;
        });
    });

    // Botón para vaciar el carrito (Útil para la página de carrito)
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
            e.preventDefault(); // Detener el envío automático
            
            const nombre = document.getElementById('form-nombre').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const mensaje = document.getElementById('form-mensaje').value.trim();
            const errorElemento = document.getElementById('form-error');

            // Limpiar errores previos
            errorElemento.classList.add('is-hidden');
            errorElemento.textContent = "";

            // Validación de campos vacíos
            if (nombre === "" || email === "" || mensaje === "") {
                errorElemento.classList.remove('is-hidden');
                errorElemento.textContent = "Por favor, completa todos los campos obligatorios.";
                return;
            }

            // Validación básica de estructura de correo electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errorElemento.classList.remove('is-hidden');
                errorElemento.textContent = "Por favor, introduce un correo electrónico válido.";
                return;
            }

            // Si todo está correcto, abrir el modal de éxito (Requerimiento de Modal en Rúbrica)
            const modalExito = document.getElementById('modal-success');
            if (modalExito) {
                modalExito.classList.add('is-active');
                formulario.reset(); // Limpiar el formulario
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
});

// ==========================================
    // 5. EFECTO DE NAVEGACIÓN DESLIZANTE AUTOMÁTICO
    // ==========================================
    const menuStart = document.querySelector('.navbar-start');
    const indicador = document.querySelector('.nav-sliding-indicator');
    const linksMenu = document.querySelectorAll('.navbar-start .navbar-item');

    // Solo se ejecuta en pantallas grandes (Computadoras)
    if (menuStart && indicador && window.innerWidth >= 1024) {
        
        // Función inteligente que mide el texto y cambia la posición de la cápsula
        const moverCapsula = (elemento) => {
            indicador.style.left = `${elemento.offsetLeft}px`;
            indicador.style.width = `${elemento.offsetWidth}px`;
            indicador.style.opacity = '1';
        };

        // Detecta cuál es la página activa por defecto (Inicio) y coloca el brillo encima
        const linkActivo = document.querySelector('.navbar-start .navbar-item.is-active');
        if (linkActivo) {
            moverCapsula(linkActivo);
        }

        // Cuando pasas el mouse por encima de cualquier opción, la cápsula viaja de forma elástica
        linksMenu.forEach(link => {
            link.addEventListener('mouseenter', () => moverCapsula(link));
        });

        // Cuando el mouse sale por completo de la barra, regresa a iluminar la opción activa
        menuStart.addEventListener('mouseleave', () => {
            if (linkActivo) {
                moverCapsula(linkActivo);
            } else {
                indicador.style.opacity = '0';
            }
        });
    }