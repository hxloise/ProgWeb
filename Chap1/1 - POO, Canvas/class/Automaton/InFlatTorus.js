import Automaton from "../Automaton.js";
import { moduloEuclidian } from "../../lib/math.mjs";

export default class InFlatTorus extends Automaton {
    constructor({ rows = 60, cols = 60, tileSize = 14, prob = 0.1, liveColor = '#F55902', deathColor = 'black', birth, survival } = {}) {
        super({ rows, cols, tileSize, prob, liveColor, deathColor, birth, survival });
    }
    countNeighbor({ row, col }) {
        // Retournera le nombre de cellules vivantes dans le voisinage de Moore d'une cellule.
        let counter = 0;

        let rowEnd = row + 1;
        let rowStart = row - 1;

        let colEnd = col + 1;
        let colStart = col - 1;


        // fait le tour de toutes les cellules voisines
        for (let row = rowStart; row <= rowEnd; row++) {
            for (let col = colStart; col <= colEnd; col++) {
                // compte les cellules voisines vivantes
                if (this.matrix[moduloEuclidian(row, this.rows)][moduloEuclidian(col, this.cols)] == 1) counter++;

            }
        }
        if (this.matrix[row][col]) counter--;

        return counter;
    }
}