class Caballo {
    id = "";
    color = "";
    movimientoY = [2, 2, -2, -2, 1, 1, -1, -1];
    movimientoX = [1, -1, 1, -1, 2, -2, 2, -2];

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
        let x = parseInt(this.id[1]);
        let y = parseInt(this.id[0]);

        for (let i = 0; i < this.movimientoY.length; i++) {
            let newX = x + this.movimientoX[i];
            let newY = y + this.movimientoY[i];

            if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                if (ajedrez[newY][newX] == null || ajedrez[newY][newX].getColor() != this.color) {
                    movimientos.push([newY, newX]);
                }
            }
        }

        return movimientos;
    }
}

export default Caballo;
