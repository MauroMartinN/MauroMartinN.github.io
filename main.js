import peon from './clasesPiezas/peon.js';
import torre from './clasesPiezas/torre.js';
import rey from './clasesPiezas/rey.js';
import reina from './clasesPiezas/reina.js';
import caballo from './clasesPiezas/caballo.js';
import alfil from './clasesPiezas/alfil.js';

const chess = new Chess();

window.addEventListener("load", cargarPiezas);

async function postChessApi(data = {}) {
    const response = await fetch("https://chess-api.com/v1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
    return response.json();
}

let ajedrez = Array.from(Array(8), () => new Array(8).fill(null));
let turno = "blanco"; 
let listaMovimientos=[];


function agregarMovimiento(origen, destino) {
    let x=["a","b","c","d","e","f","g","h"];
    let y1=[1,2,3,4];
    let y2=[8,7,6,5];

    let origenTransformado = origen;
    for (let i = 0; i < y1.length; i++) {
        if (y1[i] == parseInt(origen[0]) + 1)
            origenTransformado = x[origen[1]] + y2[i];
        if (y2[i] == parseInt(origen[0]) + 1)
            origenTransformado = x[origen[1]] + y1[i];
    }

    let destinoTransformado = destino;
    for (let i = 0; i < y2.length; i++) {
        if (y1[i] == parseInt(destino[0]) + 1)
            destinoTransformado = x[destino[1]] + y2[i];
        if (y2[i] == parseInt(destino[0]) + 1)
            destinoTransformado = x[destino[1]] + y1[i];
    }

    origen=origenTransformado;
    destino=destinoTransformado;
    
    listaMovimientos.push({
        origen: origen,
        destino: destino,
    });

    chess.move({ from: origen, to: destino });
}

function mostrarMovimientos() {
    let movimientosDiv = document.querySelector(".moves-list");
    movimientosDiv.innerHTML="";
    listaMovimientos.forEach((movimiento) => {
        let li = document.createElement("li");
        li.textContent = movimiento.origen + movimiento.destino;
        movimientosDiv.appendChild(li);
    });
}

for (let i = 0; i < 8; i++) {
    ajedrez[6][i] = new peon("6" + i, "blanco");
    ajedrez[1][i] = new peon("1" + i, "negro");
}

let posiblesCasillas = [];

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        posiblesCasillas.push(i.toString() + j.toString());
    }
}

ajedrez[7][0] = new torre("70", "blanco");
ajedrez[7][7] = new torre("77", "blanco");
ajedrez[0][0] = new torre("00", "negro");
ajedrez[0][7] = new torre("07", "negro");

ajedrez[7][1] = new caballo("71", "blanco");
ajedrez[7][6] = new caballo("76", "blanco");
ajedrez[0][1] = new caballo("01", "negro");
ajedrez[0][6] = new caballo("06", "negro");

ajedrez[7][2] = new alfil("72", "blanco");
ajedrez[7][5] = new alfil("75", "blanco");
ajedrez[0][2] = new alfil("02", "negro");
ajedrez[0][5] = new alfil("05", "negro");

ajedrez[7][3] = new reina("73", "blanco");
ajedrez[0][4] = new reina("03", "negro");

ajedrez[7][4] = new rey("74", "blanco");
ajedrez[0][3] = new rey("04", "negro");

function cargarPiezas() {
    let table = document.getElementById("table");
    for (let i = 0; i < 8; i++) {
        let vacio1 = document.createElement("img");
        vacio1.setAttribute("clase", "vacio");
        vacio1.setAttribute("src", "piezas/base.png");
        table.rows[2].cells[i].appendChild(vacio1);

        let vacio2 = document.createElement("img");
        vacio2.setAttribute("clase", "vacio");
        vacio2.setAttribute("src", "piezas/base.png");
        table.rows[3].cells[i].appendChild(vacio2);

        let vacio3 = document.createElement("img");
        vacio3.setAttribute("clase", "vacio");
        vacio3.setAttribute("src", "piezas/base.png");
        table.rows[4].cells[i].appendChild(vacio3);

        let vacio4 = document.createElement("img");
        vacio4.setAttribute("clase", "vacio");
        vacio4.setAttribute("src", "piezas/base.png");
        table.rows[5].cells[i].appendChild(vacio4);

        let peon1 = document.createElement("img");
        peon1.setAttribute("clase", "peon1");
        peon1.setAttribute("src", "piezas/peon.png");
        table.rows[6].cells[i].appendChild(peon1);

        let peon2 = document.createElement("img");
        peon2.setAttribute("clase", "peon2");
        peon2.setAttribute("src", "piezas/peon.png");
        table.rows[1].cells[i].appendChild(peon2);

        let piezas1 = ["torre", "caballo", "alfil", "reina", "rey", "alfil", "caballo", "torre"];
        let piezas2 = ["torre", "caballo", "alfil", "reina", "rey", "alfil", "caballo", "torre"];

        let pieza1 = document.createElement("img");
        pieza1.setAttribute("clase", piezas1[i]);
        pieza1.setAttribute("src", "piezas/" + piezas1[i] + ".png");
        table.rows[7].cells[i].appendChild(pieza1);

        let pieza2 = document.createElement("img");
        pieza2.setAttribute("clase", piezas2[i]);
        pieza2.setAttribute("src", "piezas/" + piezas2[i] + ".png");
        table.rows[0].cells[i].appendChild(pieza2);
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let img = table.rows[i].cells[j].querySelector("img");
            if (img) {
                img.setAttribute('id', (i).toString() + (j).toString());
            }
        }
    }
    addEventListeners();
}

let moverHandler = function() {
    mover(this);
};

function addEventListeners() {
    document.querySelectorAll("img").forEach(img => {
        if (img.getAttribute("clase") != "vacio" &&  ajedrez[parseInt(img.id[0])][parseInt(img.id[1])].getColor()==turno) {
            img.addEventListener("click", moverHandler);
        }
    });
}

function mover(img) {
    let id = img.id;
    let x = parseInt(id[0]);
    let y = parseInt(id[1]);

    let pieza = ajedrez[x][y];
    let mov=[];
    if (turno=="blanco") {
        mov = pieza.getPosiblesMovimientos(ajedrez);
    }
    else {
        return
        mov = pieza.getPosiblesMovimientos(ajedrez);
    }
    if (mov.length == 0) {
        return;
    }

    let casillasM = [];
    
    mov.forEach(casilla => {
        let casillaX = parseInt(casilla[1]);
        let casillaY = parseInt(casilla[0]);
        casillasM.push((casillaY).toString() + (casillaX).toString());
    });

    let arrayGrises = [];
    arrayGrises = mov;

    casillasM.forEach(casilla => {
        document.getElementById(casilla).style.filter = "brightness(0.5)";
    });

    mover2(img, casillasM);
}

let globalImg = [];
let globalArrayGrises = [];

let moverHandler2 = function () {
    let img = globalImg;
    let arrayGrises = globalArrayGrises;
    mover3(this, img, arrayGrises);
};

function mover2(img, arrayGrises) {
    document.querySelectorAll("img").forEach(element => {
        element.removeEventListener("click", moverHandler); 
        element.removeEventListener("click", moverHandler2); 
        if (arrayGrises.includes(element.id)) {
            element.addEventListener("click", moverHandler2); 
            globalImg = img;
            globalArrayGrises = arrayGrises;
        }
    });
}

function mover3(element, img, arrayGrises) {
    let id = element.id;
    let x = parseInt(id[0]);
    let y = parseInt(id[1]);
    let oldId = img.id;
    let oldX = parseInt(oldId[0]);
    let oldY = parseInt(oldId[1]);
    let pieza = ajedrez[oldX][oldY];
    ajedrez[oldX][oldY] = null;
    ajedrez[x][y] = pieza;

    agregarMovimiento(oldId,id);

    let src = img.getAttribute("src");
    let clase = img.getAttribute("clase");
    let oldImg = document.getElementById(oldId);

    if (element.getAttribute("src") == "piezas/rey.png") alert("Gane el jugador " + turno);

    oldImg.setAttribute("src", "piezas/base.png");
    oldImg.setAttribute("clase", "vacio");
    element.setAttribute("src", src);
    element.setAttribute("clase", clase);
    ajedrez[x][y].setId(id);

    arrayGrises.forEach(id => {
        document.getElementById(id).style.filter = "";
        document.getElementById(id).removeEventListener("click", moverHandler2);
    });

    turno = (turno === "blanco") ? "negro" : "blanco";
    updateTurno();
    
    addEventListeners();
}

function mover4 (origen, destino) {
    mostrarMovimientos();
    let piezaO=document.getElementById(origen);
}

function updateTurno() {
    document.getElementById("turno").textContent = "Turno de: "+turno.toUpperCase();
    mostrarMovimientos();
    let fen1 = chess.fen();
    let movimiento="";
    postChessApi({ fen: fen1 }).then((data) => {
        if (data.type=="error") {
            let indiceEnPassant = fen1.length - 5;
            let indiceEnPassant0 = indiceEnPassant-1
            let fenModificado = fen1.substring(0, indiceEnPassant0) + '-' + fen1.substring(indiceEnPassant + 1);
            postChessApi({ fen: fenModificado }).then((data) => {
                movimiento=data.move;
                console.log(data)
            });
        }
        else {
            console.log(data);
            movimiento=data.move;
        }
    });
    if (turno == "negro") {
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (!movimiento) {
                alert("Ganan Negras");
                return;
            }
            let posI = movimiento[0] + movimiento[1];
            let posF = movimiento[2] + movimiento[3];

            let x = ["a", "b", "c", "d", "e", "f", "g", "h"];
            let y1 = [1, 2, 3, 4];
            let y2 = [8, 7, 6, 5];

            let origenTransformado = "";
            for (let i = 0; i < y1.length; i++) {
                if (y1[i] == parseInt(posI[1])) {
                    origenTransformado = y2[i]-1+""+x.indexOf(posI[0]);
                } else if (y2[i] == parseInt(posI[1])) {
                    origenTransformado = y1[i]-1+""+x.indexOf(posI[0]);
                }
            }

            let destinoTransformado = "";
            for (let i = 0; i < y2.length; i++) {
                if (y1[i] == parseInt(posF[1])) {
                    destinoTransformado = y2[i]-1+""+x.indexOf(posF[0]);
                } else if (y2[i] == parseInt(posF[1])) {
                    destinoTransformado = y1[i]-1+""+x.indexOf(posF[0]);
                }
            }


            let nueva=document.getElementById(destinoTransformado);
            let vieja=document.getElementById(origenTransformado);
            let arrayVacio=[];
            mover3(nueva, vieja, arrayVacio)
        })();
    }
}

let fen = chess.fen();
postChessApi({ fen: fen }).then((data) => {
    // console.log(data)
});
