class Reina {
    id = "";
    color = "";
    movimientoY = [1, 1, -1, -1, 0, 0, 1, -1];  
    movimientoX = [1, -1, 1, -1, 1, -1, 0, 0];  

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

        for (let i = 0; i < 8; i++) {
            for (let j = 1; j < 8; j++) {
                let newX = x + this.movimientoX[i] * j;
                let newY = y + this.movimientoY[i] * j;

                if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                    if (ajedrez[newY][newX] === null || ajedrez[newY][newX].getColor() !== this.color) {
                        movimientos.push([newY, newX]);
                    }
                    if (ajedrez[newY][newX] !== null) {
                        break;
                    }
                } else {
                    break; 
                }
            }
        }

        return movimientos;
    }
}

export default Reina;
