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

function inicializarMensajeVacio() {
    if (prospectos.length === 0) {
        contenedorLista.innerHTML = `<div id="mensaje-vacio" class="text-center text-muted p-4 bg-white rounded border shadow-sm">No hay clientes registrados aún en el sistema.</div>`;
    }
}

// ── 2. FUNCIONES DE VALIDACIÓN DINÁMICA (CONSERVADAS DE SEMANA 6) ──
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

function validar苳escripcion() {
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
    const descripcionValida = validar苳escripcion();
    return nombreValido && categoriaValida && descripcionValida;
}

// ── 3. ASIGNACIÓN DE EVENTOS EN TIEMPO REAL ──
inputNombre.addEventListener('blur', validarNombre);
inputNombre.addEventListener('input', function() {
    if (inputNombre.classList.contains('is-invalid')) validarNombre();
});

inputCategoria.addEventListener('change', validarCategoria);
inputCategoria.addEventListener('blur', validarCategoria);

inputDescripcion.addEventListener('blur', validar苳escripcion);
inputDescripcion.addEventListener('input', function() {
    if (inputDescripcion.classList.contains('is-invalid')) validar苳escripcion();
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

// ── 5. RENDERIZADO DINÁMICO REPETITIVO (REQUERIMIENTO SEMANA 7) ──
function renderizarListaProspectos() {
    // Limpiamos el contenedor para evitar repeticiones manuales de bloques HTML
    contenedorLista.innerHTML = "";

    // Verificación de estado de la aplicación
    if (prospectos.length === 0) {
        inicializarMensajeVacio();
        return;
    }

    // Estructura repetitiva exigida: recorremos cada objeto del arreglo
    prospectos.forEach(function(prospecto) {
        let colorBorde = "border-primary"; // Por defecto
        let colorBadge = "bg-info";

        // Estructura condicional exigida: cambiamos los estilos según el estado/tipo de datos
        if (prospecto.categoria === "Cliente VIP") {
            colorBorde = "border-warning";
            colorBadge = "bg-warning text-dark";
        } else if (prospecto.categoria === "Cliente Frecuente") {
            colorBorde = "border-success";
            colorBadge = "bg-success text-white";
        } else {
            colorBorde = "border-primary";
            colorBadge = "bg-primary text-white";
        }

        // Generación del bloque del componente dinámico en texto
        const tarjetaHtml = `
            <div class="card mb-3 shadow-sm border-start ${colorBorde} border-4" id="prospecto-${prospecto.id}">
                <div class="card-body">
                    <span class="badge ${colorBadge} mb-2">${prospecto.categoria}</span>
                    <h5 class="card-title">${prospecto.nombre}</h5>
                    <p class="card-text text-muted small">${prospecto.descripcion}</p>
                    <button class="btn btn-outline-danger btn-sm w-100 mt-2" onclick="eliminarProspecto(${prospecto.id})">
                        🗑 Eliminar Registro
                    </button>
                </div>
            </div>
        `;

        // Se concatena al contenedor de la lista sin repetir bloques fijos de código
        contenedorLista.innerHTML += tarjetaHtml;
    });
}

// Función encargada de borrar un elemento del arreglo y redibujar
function eliminarProspecto(idBuscar) {
    prospectos = prospectos.filter(p => p.id !== idBuscar);
    actualizarContador();
    renderizarListaProspectos(); // Volvemos a dibujar de forma limpia
}

// ── 6. EVENTO SUBMIT (CAPTURA NUEVOS DATOS) ──
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    if (!validarFormularioCompleto()) {
        mostrarAlertaGlobal('error', '⚠ Verifique los campos obligatorios en rojo.');
        return;
    }

    // Empaquetamos la información del formulario en el objeto
    const nuevoProspecto = {
        id: idAutoincremental++,
        nombre: inputNombre.value.trim(),
        categoria: inputCategoria.value,
        descripcion: inputDescripcion.value.trim()
    };

    // Almacenamos en memoria
    prospectos.push(nuevoProspecto);
    
    // Renderizado dinámico general
    renderizarListaProspectos();
    
    mostrarAlertaGlobal('exito', '✔ Prospecto comercial guardado dinámicamente.');
    formulario.reset();
    
    // Remueve las clases verdes/rojas tras limpiar el formulario
    [inputNombre, inputCategoria, inputDescripcion].forEach(el => el.classList.remove('is-valid', 'is-invalid'));
    actualizarContador();
});

// Lanzamiento inicial
inicializarMensajeVacio();