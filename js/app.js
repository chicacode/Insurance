// 2 Classes

// Cotizador Seguro Constructor
// Seleccionando una marca de automovil y un año que me genere un costo de seguro
function Seguro(marca, anio, tipo){
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function(){
   // en este prototipo recibe la informacion que nos pasa la const cantidad
    /*
    Se creará una tabla con información del seguro
    1 = americano 1.15;
    2 = asiatico 1.05;
    3 = europeo 1.35;
    */
    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1': 
            cantidad = base * 1.15;
            break;
        case '2': 
            cantidad = base * 1.05;
            break;
        case '3': 
            cantidad = base * 1.35;
            break;
    }

    // Leer el año
    const diferencia = new Date().getFullYear() - this.anio;
    // Conforma más antiguo sea el auto se le reducirá un 3% el valor del seguro

    cantidad -= ((diferencia * 3)* cantidad) / 100;

    /*
    Si el seguro es básico se multiplica por 30% mas
    Si el seguro es completo se multiplica por 50% más
    */

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }
    
    return cantidad;

}

// Todo lo que se muestra
function Interfaz(){}// Es un Objeto
    // Mensaje que se imprime de error

    Interfaz.prototype.mostrarMensaje = function(mensaje, tipo){
        // Esta funcion se puede reutilizar en otro componente 
        // pasandole un mensaje diferente cada vez
        const div = document.createElement('div');
        if(tipo === 'error'){
            div.classList.add('mensaje', 'error');
        }else{
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function(){
            // Para que desaparezca el mensaje de error
            document.querySelector('.mensaje').remove();
        }, 3000);
    }
    Interfaz.prototype.mostrarResultado = function(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca; // con este switch me muestra la marca en valor real
        switch(seguro.marca){
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
    // Crear un div con resultados
        const div = document.createElement('div');

    // Insertar la información de resultado
        div.innerHTML = `
            <p class='header'> Tu resumen:</p>
            <p> Marca: ${marca}</p>
            <p> Año: ${seguro.anio}</p>
            <p> Tipo: ${seguro.tipo}</p>
            <p> Total: $ ${total}</p>
        `;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';

        setTimeout(function(){
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 3000);

    }

// EventListeners
const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    // Recogemos los valores del formulario
    // Leer la marca seleccionada del Select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // Leer el año seleccionado en un select
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // Lee el valor del radioButton
    const tipo = document.querySelector('input[name="tipo"]:checked').value; // con querySelectot los datos se pueden recoger como css3 o jquery
    console.log(tipo);

    // Creamos instancia de Interfaz

    // Si lo deja en blanco -> mostramos error
    // Si agrega los campos mostramos instancia de lo que ha hecho

    const interfaz = new Interfaz(); // instancia

    // Revisamos que campos no esten vacios-validacion
    if(marcaSeleccionada == '' || anioSeleccionado == '' || tipo == ''){
        // Interfaz imprime error. Falta rellenar datos
        interfaz.mostrarMensaje('Faltan datos, revisar el formulario y probar de nuevo', 'error'); // 2 parametros
    }else{
        // Limpiar resultados anteriores
        // Me limpia el div de resultados
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }
        // Interfaz rellenada de seguro. Todo correcto
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo); // Se hace una nueva instancia de seguro y se reciben los datos que vienen del construcctor
        // Cotizar Seguro con prototype

        const cantidad = seguro.cotizarSeguro();
        interfaz.mostrarResultado(seguro, cantidad); // En el parametro seguro se recibe toda la información del auto: marca, año y tipo
        interfaz.mostrarMensaje('Cotizando...', 'exito');
    }
    
});
// Queremos generar un lista de años para poder seleccionar cual corresponde al auto
// escribir un codigo que me genere la lista de años en JS
const max = new Date().getFullYear(), // EL maximo es el año actual no podemos asegurar autos del futuro
    min = max - 20; // Por politicas  un año minimo de seguro ejem 20 años

// Generar años por un select
const selectAnios = document.getElementById('anio');

// Esa lista de años creada la iteramos
// for que recorra los options
for(let i = max; i >= min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option); // el select de html se le añade el option creado dinamicamente
}
