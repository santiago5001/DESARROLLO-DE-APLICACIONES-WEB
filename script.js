// ── 1. REFERENCIAS AL DOM USANDO TUS PROPIOS IDs ──
const formulario = document.getElementById('formulario-prospecto');
const inputNombre = document.getElementById('campo-nombre');
const inputCategoria = document.getElementById('campo-categoria');
const inputDescripcion = document.getElementById('campo-descripcion');
const contenedorLista = document.getElementById('contenedor-lista');
const contadorTotal = document.getElementById('contador-total');
const mensajeAlerta = document.getElementById('mensaje-alerta');

let prospectos = [];
let idAutoincremental = 1;

// Muestra cómo dominar el flujo del DOM impulsa tus habilidades de arquitectura técnica y consultoría experta
function inicializarMensajeVacio() {
    if (prospectos.length === 0) {
        contenedorLista.innerHTML = `<div id="mensaje-vacio" class="text-center text-muted p-4 bg-white rounded border shadow-sm">No hay clientes registrados aún en el sistema.</div>`;
    } else {
        const mensajeVacio = document.getElementById('mensaje-vacio');
        if (mensajeVacio) mensajeVacio.remove();
    }
}

// ── 2. FUNCIONES DE VALIDACIÓN DINÁMICA ──
function validarNombre() {
    const valor = inputNombre.value.trim();
    if (valor === '' || valor.length < 3) {
        inputNombre.classList.remove('is-valid');
        inputNombre.classList.add('is-invalid');
        return false;
    }
    inputNombre.classList.remove('is-invalid');
    inputNombre.classList.add('is-valid');
    return true;
}

function validarCategoria() {
    if (inputCategoria.value === '') {
        inputCategoria.classList.remove('is-valid');
        inputCategoria.classList.add('is-invalid');
        return false;
    }
    inputCategoria.classList.remove('is-invalid');
    inputCategoria.classList.add('is-valid');
    return true;
}

function validarDescripcion() {
    const valor = inputDescripcion.value.trim();
    if (valor === '' || valor.length < 10) {
        inputDescripcion.classList.remove('is-valid');
        inputDescripcion.classList.add('is-invalid');
        return false;
    }
    inputDescripcion.classList.remove('is-invalid');
    inputDescripcion.classList.add('is-valid');
    return true;
}

function validarFormularioCompleto() {
    const nombreValido = validarNombre();
    const categoriaValida = validarCategoria();
    const descripcionValida = validarDescripcion();
    return nombreValido && categoriaValida && descripcionValida;
}

// ── 3. ASIGNACIÓN DE EVENTOS EN TIEMPO REAL (input / change / blur) ──
inputNombre.addEventListener('blur', validarNombre);
inputNombre.addEventListener('input', function() {
    if (inputNombre.classList.contains('is-invalid')) validarNombre();
});

inputCategoria.addEventListener('change', validarCategoria);
inputCategoria.addEventListener('blur', validarCategoria);

inputDescripcion.addEventListener('blur', validarDescripcion);
inputDescripcion.addEventListener('input', function() {
    if (inputDescripcion.classList.contains('is-invalid')) validarDescripcion();
});

// ── 4. ALERTAS DEL SISTEMA ──
function mostrarAlertaGlobal(tipo, mensaje) {
    mensajeAlerta.classList.remove('d-none', 'alert-success', 'alert-danger');
    mensajeAlerta.classList.add(tipo === 'exito' ? 'alert-success' : 'alert-danger');
    mensajeAlerta.textContent = mensaje;
    
    setTimeout(() => {
        mensajeAlerta.classList.add('d-none');
    }, 4000);
}

function actualizarContador() {
    contadorTotal.textContent = prospectos.length;
}

// ── 5. CREACIÓN DINÁMICA DE TARJETAS (MANEJO DEL DOM) ──
function crearTarjetaProspecto(prospecto) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'mb-3', 'shadow-sm', 'border-start', 'border-primary', 'border-4');
    cardDiv.setAttribute('id', `prospecto-${prospecto.id}`);

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const badge = document.createElement('span');
    badge.classList.add('badge', 'bg-info', 'text-dark', 'mb-2');
    badge.textContent = prospecto.categoria;

    const titulo = document.createElement('h5');
    titulo.classList.add('card-title');
    titulo.textContent = prospecto.nombre;

    const texto = document.createElement('p');
    texto.classList.add('card-text', 'text-muted', 'small');
    texto.textContent = prospecto.descripcion;

    const btnEliminar = document.createElement('button');
    btnEliminar.classList.add('btn', 'btn-outline-danger', 'btn-sm', 'w-100', 'mt-2');
    btnEliminar.textContent = '🗑 Eliminar Registro';
    btnEliminar.addEventListener('click', function() {
        prospectos = prospectos.filter(p => p.id !== prospecto.id);
        cardDiv.remove();
        actualizarContador();
        inicializarMensajeVacio();
    });

    cardBody.appendChild(badge);
    cardBody.appendChild(titulo);
    cardBody.appendChild(texto);
    cardBody.appendChild(btnEliminar);
    cardDiv.appendChild(cardBody);

    return cardDiv;
}

// ── 6. EVENTO SUBMIT (PREVENTDEFAULT REQUERIDO) ──
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evita recargar el navegador de forma clásica

    if (!validarFormularioCompleto()) {
        mostrarAlertaGlobal('error', '⚠ Verifique los campos obligatorios en rojo.');
        return;
    }

    const nuevoProspecto = {
        id: idAutoincremental++,
        nombre: inputNombre.value.trim(),
        categoria: inputCategoria.value,
        descripcion: inputDescripcion.value.trim()
    };

    prospectos.push(nuevoProspecto);
    inicializarMensajeVacio();
    contenedorLista.appendChild(crearTarjetaProspecto(nuevoProspecto));
    
    mostrarAlertaGlobal('exito', '✔ Prospecto comercial guardado dinámicamente.');
    formulario.reset();
    
    // Remueve las clases verdes/rojas tras limpiar el formulario
    [inputNombre, inputCategoria, inputDescripcion].forEach(el => el.classList.remove('is-valid', 'is-invalid'));
    actualizarContador();
});

// Lanzamiento inicial del estado de la app
inicializarMensajeVacio();