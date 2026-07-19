// ── 1. REFERENCIAS AL DOM USANDO TUS PROPIOS IDs ──
const formulario = document.getElementById('formulario-prospecto');
const inputNombre = document.getElementById('campo-nombre');
const inputCategoria = document.getElementById('campo-categoria');
const inputDescripcion = document.getElementById('campo-descripcion');
const contenedorLista = document.getElementById('contenedor-lista');
const contadorTotal = document.getElementById('contador-total');
const mensajeAlerta = document.getElementById('mensaje-alerta');
const textoAlerta = document.getElementById('texto-alerta');
const spinnerCarga = document.getElementById('spinner-carga');

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

// ── 3. ASIGNACIÓN DE EVENTOS EN TIEMPO REAL ──
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

// ── 4. ALERTAS MEJORADAS CON COMPONENTES DE BOOTSTRAP (SEMANA 8) ──
function mostrarAlertaGlobal(tipo, mensaje) {
    mensajeAlerta.classList.remove('d-none', 'alert-success', 'alert-danger');
    
    if (tipo === 'exito') {
        mensajeAlerta.classList.add('alert-success');
    } else {
        mensajeAlerta.classList.add('alert-danger');
    }
    
    textoAlerta.textContent = mensaje;
    
    setTimeout(() => {
        mensajeAlerta.classList.add('d-none');
    }, 4000);
}

function actualizarContador() {
    contadorTotal.textContent = prospectos.length;
}

// ── 5. RENDERIZADO DINÁMICO REPETITIVO (CONSERVADO DE SEMANA 7) ──
function renderListaProspectos() {
    contenedorLista.innerHTML = "";

    if (prospectos.length === 0) {
        inicializarMensajeVacio();
        return;
    }

    prospectos.forEach(function(prospecto) {
        let colorBorde = "border-primary"; 
        let colorBadge = "bg-info";

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

        contenedorLista.innerHTML += tarjetaHtml;
    });
}

function eliminarProspecto(idBuscar) {
    prospectos = prospectos.filter(p => p.id !== idBuscar);
    actualizarContador();
    renderListaProspectos(); 
}

// ── 6. EVENTO SUBMIT CON SPINNER DE CARGA INCORPORADO (SEMANA 8) ──
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    if (!validarFormularioCompleto()) {
        mostrarAlertaGlobal('error', '⚠ Verifique los campos obligatorios en rojo.');
        return;
    }

    // Encendemos el Spinner de carga simulado exigido en las instrucciones
    spinnerCarga.classList.remove('d-none');

    // Simulamos un retraso de procesamiento de 800ms para que el spinner sea visible
    setTimeout(() => {
        // Ocultamos el spinner tras el proceso
        spinnerCarga.classList.add('d-none');

        const nuevoProspecto = {
            id: idAutoincremental++,
            nombre: inputNombre.value.trim(),
            categoria: inputCategoria.value,
            descripcion: inputDescripcion.value.trim()
        };

        prospectos.push(nuevoProspecto);
        renderListaProspectos();
        
        mostrarAlertaGlobal('exito', '✔ Prospecto comercial procesado y guardado dinámicamente.');
        formulario.reset();
        
        [inputNombre, inputCategoria, inputDescripcion].forEach(el => el.classList.remove('is-valid', 'is-invalid'));
        actualizarContador();
    }, 800);
});

// Lanzamiento inicial
inicializarMensajeVacio();