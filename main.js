import peon from './clasesPiezas/peon.js';
import torre from './clasesPiezas/torre.js';
import rey from './clasesPiezas/rey.js';
import reina from './clasesPiezas/reina.js';
import caballo from './clasesPiezas/caballo.js';
import alfil from './clasesPiezas/alfil.js';

window.addEventListener("load", cargarPiezas);

let ajedrez = Array.from(Array(8), () => new Array(8).fill(null));
let turno = "blanco"; 

for (let i = 0; i < 8; i++) {
    ajedrez[1][i] = new peon("1"+i, "blanco");
    ajedrez[6][i] = new peon("6" +i, "negro");
}

let posiblesCasillas = [];

for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        posiblesCasillas.push(i.toString() + j.toString());
    }
}

ajedrez[0][0] = new torre("00", "blanco");
ajedrez[0][7] = new torre("07", "blanco");
ajedrez[7][0] = new torre("70", "negro");
ajedrez[7][7] = new torre("77", "negro");

ajedrez[0][1] = new caballo("01", "blanco");
ajedrez[0][6] = new caballo("06", "blanco");
ajedrez[7][1] = new caballo("71", "negro");
ajedrez[7][6] = new caballo("76", "negro");

ajedrez[0][2] = new alfil("02", "blanco");
ajedrez[0][5] = new alfil("05", "blanco");
ajedrez[7][2] = new alfil("72", "negro");
ajedrez[7][5] = new alfil("75", "negro");

ajedrez[0][3] = new reina("03", "blanco");
ajedrez[7][4] = new reina("74", "negro");

ajedrez[0][4] = new rey("04", "blanco");
ajedrez[7][3] = new rey("73", "negro");

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
        table.rows[1].cells[i].appendChild(peon1);

        let peon2 = document.createElement("img");
        peon2.setAttribute("clase", "peon2");
        peon2.setAttribute("src", "piezas/peon.png");
        table.rows[6].cells[i].appendChild(peon2);

        let piezas1 = ["torre", "caballo", "alfil", "reina", "rey", "alfil", "caballo", "torre"];
        let piezas2 = ["torre", "caballo", "alfil", "rey", "reina", "alfil", "caballo", "torre"];

        let pieza1 = document.createElement("img");
        pieza1.setAttribute("clase", piezas1[i]);
        pieza1.setAttribute("src", "piezas/" + piezas1[i] + ".png");
        table.rows[0].cells[i].appendChild(pieza1);

        let pieza2 = document.createElement("img");
        pieza2.setAttribute("clase", piezas2[i]);
        pieza2.setAttribute("src", "piezas/" + piezas2[i] + ".png");
        table.rows[7].cells[i].appendChild(pieza2);
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
    let mov = pieza.getPosiblesMovimientos(ajedrez);
    console.log(mov);
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

function updateTurno() {
    document.getElementById("turno").textContent = "Turno de: "+turno.toUpperCase();
}
