import { generate, clone } from "../lib/matrix.js";

export default class Automaton {
    constructor({ rows = 60, cols = 60, tileSize = 14, prob = 0.1, liveColor = '#F55902', deathColor = 'black', birth = new Set([3]), survival = new Set([2,3]) } = {}) {
        this.rows = rows;
        this.cols = cols;
        this.tileSize = tileSize;
        this.liveColor = liveColor;
        this.deathColor = deathColor;
        this.birth = birth;
        this.survival = survival;
        this.randomize(prob);
    }

    randomize(prob = 0.1) {
        this.matrix = generate(this.rows, this.cols, 0);
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.matrix[row][col] = Math.random() < prob ? 1 : 0; // plus de grands que de petits nombres qui vont être tirés, donc moins de 1 que de 0 
            }
        }
    }


    draw(ctx) {
        // ctx.fillStyle = '#DE0914'; 
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                //met la couleur si la cellule est en vie (1) ou non !
                ctx.fillStyle = this.matrix[row][col] == 0 ? this.deathColor : this.liveColor;
                //méthode fillRect: rectangle (x,y,largeur,hauteur). Les 2 derniers param définissent la marge. 
                //méthode qui utilise un point de départ en x et y et la taille qu'il a, donc jusqu'ou il va n'est 
                //pas définit en param, ça sera en fonction de la taille.
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'black';
                ctx.fillRect(col * this.tileSize + 1, row * this.tileSize + 1, this.tileSize - 1, this.tileSize - 1);
            }
        }
    }

    countNeighbor({row, col}) {
        // Retournera le nombre de cellules vivantes dans le voisinage de Moore d'une cellule.
        let counter = 0;

        // vérifie si le x des cellules voisines n'est pas hors de l'écran (hors du tableau)
        let rowEnd = row + 1;
        if (rowEnd >= this.rows) rowEnd = row;
        let rowStart = row - 1;
        if (rowStart < 0) rowStart = 0;

        // vérifie si le y des cellules voisines n'est pas hors de l'écran (hors du tableau)
        let colEnd = col + 1;
        if (colEnd >= this.cols) colEnd = col;
        let colStart = col - 1;
        if (colStart < 0) colStart = 0;

        // fait le tour de toutes les cellules voisines
        for (let row = rowStart; row <= rowEnd; row++) {
            for (let col = colStart; col <= colEnd; col++) {

                // compte les cellules voisines vivantes
                if (this.matrix[row][col] == 1) {
                    counter++;

                }
            }
        }
        if (this.matrix[row][col]) counter--; 
        return counter;
    }

    ChangeCellState() {
        const Clone = clone(this.matrix);
        //calculer le nombre de cellules voisines vivantes de la cellule x,y
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const counter = this.countNeighbor({row,col});
                // compte les cellules voisines vivantes
                if (this.matrix[row][col] == 0 && this.birth.has(counter)) {
                    Clone[row][col] = 1;
                } else if (this.matrix[row][col] == 1 && !this.survival.has(counter)) {
                    Clone[row][col] = 0;
                }  
            }
        }
        this.matrix = Clone; 
    }
}