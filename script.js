// 1. Esperamos a que la página cargue por completo
window.onload = function() {
    
    // Variables para capturar los elementos del HTML
    let formulario = document.getElementById("formulario-prospecto");
    let contenedorLista = document.getElementById("contenedor-lista");
    let contadorTotal = document.getElementById("contador-total");
    let mensajeAlerta = document.getElementById("mensaje-alerta");
    
    // Variable global para llevar el conteo de registros
    let totalClientes = 0;

    // 2. Escuchamos cuando el usuario da click en el botón de enviar (submit)
    formulario.addEventListener("submit", function(evento) {
        
        // Evitamos que la página se recargue automáticamente
        evento.preventDefault();

        // Obtenemos los valores que escribió el usuario en los campos
        let nombre = document.getElementById("campo-nombre").value.trim();
        let categoria = document.getElementById("campo-categoria").value;
        let descripcion = document.getElementById("campo-descripcion").value.trim();

        // 3. Validación: Comprobar que ningún campo esté vacío
        if (nombre === "" || categoria === "" || descripcion === "") {
            // Si hay un campo vacío, mostramos un mensaje de error usando Bootstrap
            mensajeAlerta.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error: Por favor, llena todos los campos del formulario.
                </div>
            `;
            return; // Detiene el código para que no se registre nada vacío
        }

        // Si la validación pasa, limpiamos cualquier alerta anterior
        mensajeAlerta.innerHTML = "";

        // 4. Creamos una nueva tarjeta (card) dinámicamente usando createElement
        let nuevaTarjeta = document.createElement("div");
        nuevaTarjeta.className = "card p-3 mb-3 border-start border-primary border-4 shadow-sm";

        // Diseñamos el contenido interno de la tarjeta con los datos ingresados
        nuevaTarjeta.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h5 class="mb-1 text-primary">${nombre}</h5>
                    <span class="badge bg-secondary mb-2">${categoria}</span>
                    <p class="mb-0 text-muted small">${descripcion}</p>
                </div>
                <button class="btn btn-sm btn-danger btn-eliminar">Eliminar</button>
            </div>
        `;

        // 5. Agregamos la funcionalidad de eliminar al botón que acabamos de crear
        let botonEliminar = nuevaTarjeta.querySelector(".btn-eliminar");
        botonEliminar.addEventListener("click", function() {
            nuevaTarjeta.remove(); // Remueve la tarjeta visualmente
            
            // Restamos 1 al contador global y lo actualizamos en la pantalla
            totalClientes = totalClientes - 1;
            contadorTotal.innerText = totalClientes;
        });

        // 6. Insertamos la nueva tarjeta dentro de nuestro listado usando appendChild
        contenedorLista.appendChild(nuevaTarjeta);

        // 7. Sumamos 1 al contador global y lo actualizamos en la pantalla
        totalClientes = totalClientes + 1;
        contadorTotal.innerText = totalClientes;

        // Limpiamos los campos del formulario para que quede listo para el siguiente registro
        formulario.reset();
    });
};