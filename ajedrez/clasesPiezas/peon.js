class peon {
    id = "";
    color = "";
    movimientoY = [1];
    movimientoX = [0];

    constructor(id, color) {
        this.id = id;
        this.color = color;
    }

    setId(id) {
        this.id = id;
    }

    getColor() {
        return this.color;
    }

    getPosiblesMovimientos(ajedrez) {
        let movimientos = [];
        let id1 = parseInt(this.id[0]); 
        let id0 = parseInt(this.id[1]); 
        let direction = this.color == "blanco" ? 1 : -1;

        let x = id0;
        let y = id1 + this.movimientoY[0] * direction;

        if (y >= 0 && y < 8 && ajedrez[y][x] == null) {
            movimientos.push([y, x]);
        }

        if ((this.color == "blanco" && id1 === 1) || (this.color == "negro" && id1 == 6)) {
            let y2 = id1 + 2 * this.movimientoY[0] * direction;

            if (
                y2 >= 0 &&
                y2 < 8 &&
                ajedrez[y][x] == null &&
                ajedrez[y2][x] == null
            ) {
                movimientos.push([y2, x]);
            }
        }

        for (let dx of [-1, 1]) {
            let xDiag = id0 + dx;
            let yDiag = id1 + this.movimientoY[0] * direction;

            if (xDiag >= 0 &&xDiag < 8 &&yDiag >= 0 &&yDiag < 8 &&ajedrez[yDiag][xDiag] != null &&ajedrez[yDiag][xDiag].getColor() != this.color) {
                movimientos.push([yDiag, xDiag]);
            }
        }

        return movimientos;
    }
}

export default peon;
