
class torre {
    id = "";
    color = "";
    movimientoY = [1, -1, 0, 0];
    movimientoX = [0, 0, 1, -1];

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
        let id0 = parseInt(this.id[0]); 
        let id1 = parseInt(this.id[1]); 

        for (let j = 0; j < this.movimientoY.length; j++) {
            for (let i = 1; i < 8; i++) {
                let x = id0 + this.movimientoX[j] * i;
                let y = id1 + this.movimientoY[j] * i;

                if (x < 0 || x >= 8 || y < 0 || y >= 8) break;

                if (ajedrez[x][y] != null) {
                    if (ajedrez[x][y].getColor() !== this.color) {
                        movimientos.push([x, y]); 
                    }
                    break; 
                }

                movimientos.push([x,y]);
            }
        }

        return movimientos;
    }

    comprobarOcupacion(x, y, ajedrez, movimientos) {
        let id0 = parseInt(this.id[0]);
        let id1 = parseInt(this.id[1]);
        if (id0 + x < 0 || id0 + x >= 8 || id1 + y < 0 || id1 + y >= 8) return false;
        if (ajedrez[id0 + x][id1 + y] != null) {
            if (ajedrez[id0 + x][id1 + y].getColor() !== this.color) {
                movimientos.push([y, x]);
            }
            return false;
        }
        return true;
    }
}

export default torre;
