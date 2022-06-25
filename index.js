const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

const opciones = {
    color_linea: 'black',
    grosor_linea: '1',
    cantidad_puntos: 3,
    dibujar_cangulos: true,
    dibujar_distancias: false,
    dibujar_cordenadas: false,

}

const canvas_propiedades = {//propiedades del canvas de acceso rapido 
    ancho: canvas.width,
    largo: canvas.height,
    cuadricula: 10
}
const propiedades = {
    ancho: 10,
    largo: 10,
    color: 'black',
    grosor_cuadricula: '0.3'
}
let coleccion = []//el array con todos los objetos del objeto que calculamos
let puntos = [] //el array con todos lo puntos que tnemos como  obejitivos a calcular

if (canvas.getContext) {
    dibujarCuadricula()

    canvas.addEventListener("mousedown", mousePrecionado)


} else {
    console.error('el canvas no cargo!!!')
}

function mousePrecionado(evento) {

    puntos.push({ x: evento.offsetX, y: evento.offsetY })
    dibujarPunto(evento.offsetX, evento.offsetY)


    if (puntos.length >= opciones.cantidad_puntos) {
        dibujarFigura(puntos)

        if (opciones.dibujar_cordenadas) {
            dibujarCordenadas(puntos)
        }
        let angulos
        if (opciones.dibujar_cangulos) {
            angulos = calcularAngulos(puntos)
        }
        let distancias 
        if(opciones.dibujar_distancias){
            distancias = DistanciaEntrePuntos(puntos)
            dibujarDistancias(distancias, puntos)
        }

        coleccion.push({ cordenadas: puntos, angulos: angulos , distancias: distancias})
        puntos = []
    }


}

function dibujarCuadrados(color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, propiedades.ancho, propiedades.largo);

}

function dibujarCuadricula() {
    const ancho = parseInt(canvas_propiedades.ancho / canvas_propiedades.cuadricula)
    const largo = parseInt(canvas_propiedades.largo / canvas_propiedades.cuadricula)

    for (let i = 0; i < ancho + 1; i++) {
        dibujarLinea(canvas_propiedades.cuadricula * i, 0, canvas_propiedades.cuadricula * i, canvas_propiedades.largo)
    }
    for (let i = 0; i < largo + 1; i++) {
        dibujarLinea(0, canvas_propiedades.cuadricula * i, canvas_propiedades.ancho, canvas_propiedades.cuadricula * i)

    }
}

function dibujarLinea(x_inicial, y_inicial, x_finial, y_final, color = propiedades.color, grosor = propiedades.grosor_cuadricula) {

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = grosor;
    ctx.moveTo(x_inicial, y_inicial);
    ctx.lineTo(x_finial, y_final);
    ctx.stroke();
    ctx.closePath();

}

function dibujarPunto(x, y, color = propiedades.color, grosor = '3') {
    dibujarLinea(x - 1, y - 1, x + 1, y + 1, color, grosor)
}

function dibujarFigura(puntos) {

    //tengo que crear un nueva referencia para la variable puntos_adaptados
    let puntos_adaptados = []
    for (let i = 0; i < puntos.length; i++) {
        const element = puntos[i];
        puntos_adaptados.push(element)
    }

    puntos_adaptados.push(puntos_adaptados[0])//añadimos el primer punto como el ultio pra poder cerar  la figura


    for (let i = 0; i < puntos_adaptados.length - 1; i++) {
        dibujarLinea(puntos_adaptados[i].x, puntos_adaptados[i].y, puntos_adaptados[i + 1].x, puntos_adaptados[i + 1].y, opciones.color_linea, opciones.grosor_linea)

    }

}
function dibujarCordenadas(puntos) {
    ctx.lineWidth = '.6'
    for (let i = 0; i < puntos.length; i++) {
        ctx.strokeText(`${String.fromCharCode(65 + i)}(${puntos[i].x}, ${puntos[i].y})`, puntos[i].x - 10, puntos[i].y - 10)

    }

}
function calcularAngulos(puntos) {
    DistanciaEntrePuntos(puntos)
}
function DistanciaEntrePuntos(puntos) {
    let puntos_adaptados = []
    for (let i = 0; i < puntos.length; i++) {
        const element = puntos[i];
        puntos_adaptados.push(element)
    }
    puntos_adaptados.push(puntos_adaptados[0])//añadimos el primer punto como el ultio pra poder cerar  la figura

    let distancias = []
    //2 2 d (x x ) (y y )     2 1 2 1
    for (let i = 0; i < puntos_adaptados.length - 1; i++) {
        distancias.push(Math.sqrt(Math.pow(puntos_adaptados[i + 1].x - puntos_adaptados[i].x , 2) + Math.pow(puntos_adaptados[i + 1].y - puntos_adaptados[i].y , 2)))

    }
    return distancias
    console.log(distancias, puntos_adaptados)
}

function dibujarDistancias(distancias, puntos){
    let puntos_adaptados = []
    for (let i = 0; i < puntos.length; i++) {
        const element = puntos[i];
        puntos_adaptados.push(element)
    }

    puntos_adaptados.push(puntos_adaptados[0])//añadimos el primer punto como el ultio pra poder cerar  la figura

    console.log(distancias)

    ctx.lineWidth = '.6'
    for (let i = 0; i < puntos_adaptados.length - 1; i++) {
        ctx.strokeText(`${String.fromCharCode(97 + i)} ${parseInt(distancias[i])}`, (puntos_adaptados[i].x + puntos_adaptados[i + 1].x )/2, (puntos_adaptados[i].y + puntos_adaptados[i + 1].y)/2)
        console.log('hola')
    }
}

function calcularPendiente(){
    
}