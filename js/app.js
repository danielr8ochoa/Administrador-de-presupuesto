// Variables y selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');

// Event1000os

eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
}
// Classes
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        console.log(this.gastos);
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        // Extrayendo los valores
        const { presupuesto, restante } = cantidad;

        //Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;

    }
    imprimirAlerta(mensaje, tipo) {
        // Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error
        divMensaje.textContent = mensaje;

        // Insertar en el HTML
        document.querySelector('.primario').insertBefore( divMensaje, formulario);

        // Quitar del HTML

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
    agregarGastoListado(gastos) {
        // Elimina el HTML previo
        this.limpiarHTML();

        // Iterar sobre los gastos
        gastos.forEach( gasto => {
            const { cantidad, nombre, id } = gasto;

            // Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id;
            
            // Agregar el HTML del gasto
            nuevoGasto.innerHTML = `${nombre} <span class = "badge badge-primary badge-pill"> ${cantidad}</span>`;

            // Botón para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.textContent = 'Eliminar';
            btnBorrar.classList.add('btn', 'btn-danger', 'borrrar-gasto');

            nuevoGasto.appendChild(btnBorrar);

            // Agregar al HTML
            gastoListado.append(nuevoGasto);
        });
    }
    limpiarHTML() {
        while (gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }
}

// Instanciar

const ui = new UI();
let presupuesto;


// Funciones
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt('¿Cuál es tu presupuesto');

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0) {
        window.location.reload();

    } else {

    }

    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto( presupuesto );
}

// Añade gastos
function agregarGasto(e) {
    e.preventDefault();

    // Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    // Validar
    if (nombre === '' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son obligatorios', 'error');
        return;
    } else if ( cantidad <= 0 || isNaN(cantidad) ) {
        ui.imprimirAlerta('Cantidad no válida', 'error')
        return;
    }

    // Generar un objeto con el gasto
    const gasto = { nombre, cantidad, id: Date.now() }

    // Añade un neuvo gasto
    presupuesto.nuevoGasto( gasto );

    // Mensaje de registro exitoso
    ui.imprimirAlerta('Gasto agregado correctamente');

    // Imprimir los gastos
    const { gastos } = presupuesto;
    ui.agregarGastoListado(gastos);

    // Reinicia el formulario
    formulario.reset();
}