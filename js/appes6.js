// 2 Classes

// Cotizador Seguro Constructor
// Seleccionando una marca de automovil y un año que me genere un costo de seguro
class Seguro{
    // Metodo 1
    constructor(marca, anio, tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }
    // Metodo 2
    cotizarSeguro(){
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
    
        cantidad -= ((diferencia * 3)* cantidad) / 100;
    
        if(this.tipo === 'basico'){
            cantidad *= 1.30;
        }else{
            cantidad *= 1.50;
        }
        
        return cantidad;
    
    }
}

class Interfaz{ // Clase con sus 2 metodos de mostrar mensaje sy mostrar Resultados
    mostrarMensaje(mensaje, tipo){

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
    mostrarResultado(seguro, total){
        const resultado = document.getElementById('resultado');
        let marca; 
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
    const interfaz = new Interfaz(); // instancia

    // Revisamos que campos no esten vacios-validacion
    if(marcaSeleccionada == '' || anioSeleccionado == '' || tipo == ''){
        // Interfaz imprime error. Falta rellenar datos
        interfaz.mostrarMensaje('Faltan datos, revisar el formulario y probar de nuevo', 'error'); // 2 parametros
    }else{
        // Limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }
        // Interfaz rellenada de seguro. Todo correcto
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo); 
        const cantidad = seguro.cotizarSeguro();
        interfaz.mostrarResultado(seguro, cantidad); 
        interfaz.mostrarMensaje('Cotizando...', 'exito');
    }
    
});

const max = new Date().getFullYear(), 
    min = max - 20; 
const selectAnios = document.getElementById('anio');

for(let i = max; i >= min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option); 
}
