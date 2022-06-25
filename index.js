const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');

const opciones = {
    color_linea: 'black',
    grosor_linea: '1',
    cantidad_puntos: 4,
    dibujar_cangulos: true,
    dibujar_distancias: true,
    dibujar_cordenadas: true,

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
let puntos_orinales = [] //el array con todos lo puntos que tnemos como  obejitivos a calcular

if (canvas.getContext) {
    dibujarCuadricula()

    canvas.addEventListener("mousedown", mousePrecionado)


} else {
    console.error('el canvas no cargo!!!')
}

function mousePrecionado(evento) {

    puntos_orinales.push({ x: evento.offsetX, y: evento.offsetY })
    dibujarPunto(evento.offsetX, evento.offsetY)


    if (puntos_orinales.length >= opciones.cantidad_puntos) {

        let puntos = []
        for (let i = 0; i < puntos_orinales.length; i++) {
            const element = puntos_orinales[i];
            puntos.push(element)
        }
        puntos.push(puntos[0])//añadimos el primer punto como el ultio pra poder cerar  la figura

        dibujarFigura(puntos)

        if (opciones.dibujar_cordenadas) {
            dibujarCordenadas(puntos)
        }
        let angulos
        if (opciones.dibujar_cangulos) {
            const pendientes = calcularPendiente(puntos)
            angulos = calcularAngulos(pendientes)
            dibujarAngulos(puntos, angulos)
        }
        let distancias
        if (opciones.dibujar_distancias) {
            distancias = DistanciaEntrePuntos(puntos)
            dibujarDistancias(distancias, puntos)
        }

        coleccion.push({ cordenadas: puntos_orinales, angulos: angulos, distancias: distancias })
        puntos_orinales = []
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


    for (let i = 0; i < puntos.length - 1; i++) {
        dibujarLinea(puntos[i].x, puntos[i].y, puntos[i + 1].x, puntos[i + 1].y, opciones.color_linea, opciones.grosor_linea)

    }

}
function dibujarCordenadas(puntos) {
    ctx.lineWidth = '.6'
    for (let i = 0; i < puntos.length; i++) {
        ctx.strokeText(`${String.fromCharCode(65 + i)}(${puntos[i].x}, ${puntos[i].y})`, puntos[i].x - 10, puntos[i].y - 10)

    }

}
function calcularAngulos(pendientes) {
    const angulos = []
    let pendientes_modificada = []
    for (let i = 0; i < pendientes.length; i++) {
        const element = pendientes[i];
        pendientes_modificada.push(element)
    }
    pendientes_modificada.push(pendientes[0])//añadimos el primer punto como el ultio pra poder cerar  la figura

    for (let i = 0; i < pendientes_modificada.length - 1; i++) {
        
        const m = ((pendientes_modificada[i + 1] - pendientes_modificada[i])/ (1 + pendientes_modificada[i + 1] * pendientes_modificada[i]))
        angulos.push(Math.abs(Math.atan(m)*180/Math.PI))
    }
    console.log(pendientes)
    console.log(angulos)
    return angulos

}
function DistanciaEntrePuntos(puntos) {

    let distancias = []
    //2 2 d (x x ) (y y )     2 1 2 1
    for (let i = 0; i < puntos.length - 1; i++) {
        distancias.push(Math.sqrt(Math.pow(puntos[i + 1].x - puntos[i].x, 2) + Math.pow(puntos[i + 1].y - puntos[i].y, 2)))

    }
    return distancias
    console.log(distancias, puntos)
}

function dibujarDistancias(distancias, puntos) {

    console.log(distancias)

    ctx.lineWidth = '.6'
    for (let i = 0; i < puntos.length - 1; i++) {
        ctx.strokeText(`${String.fromCharCode(97 + i)} ${parseInt(distancias[i])}`, (puntos[i].x + puntos[i + 1].x) / 2, (puntos[i].y + puntos[i + 1].y) / 2)
    }
}

function calcularPendiente(puntos) {
    const pendientes = []
    for (let i = 0; i < puntos.length - 1; i++) {
        pendientes.push((puntos[i + 1].y - puntos[i].y) / (puntos[i + 1].x - puntos[i].x))
    }

    return pendientes
}

function dibujarAngulos(puntos, angulos){

    ctx.lineWidth = '.6'
    for (let i = 0; i < puntos.length - 1; i++) {
        ctx.strokeText(`${String.fromCharCode(579 + i)} ${(angulos[i]).toFixed(1)}॰`, puntos[i].x - 10 , puntos[i].y + 10 )
        
    }
}