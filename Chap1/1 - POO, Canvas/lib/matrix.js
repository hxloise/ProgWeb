//création d'une grille avec le nombre de ligne et de colonne entrées en paramètres. 
export function generate(rows, cols, defaultVal = 0) {

    //mat est un nouvel objet tableau, qui a la taille du nombre de ligne souhaité.
    const mat = new Array(rows);


    //pour chaque ligne on ajoute un tableau avec le nombre de colonne souhaité. Colonne est synoynme de 
    for(let row = 0; row < rows; row ++){

        //pour chaque case (chaque ligne de tableau), on déclare un nouveau tableau, son nb de case et le nombre de colonne qu'on souhaite
        mat[row] = new Array(cols);

        for (let col = 0; col < cols; col++) {
            mat[row][col] = defaultVal ; //toutes les cases sont initialisées à l'état morte
        }
    }

    //fonction qui retourne un tableau à deux dimensions, remplis avec des cases à 0. 
    return mat; 
}

export function clone(matrix) {
    const rows = matrix.length;
    if (rows == 0) return [];
    const cols = matrix[0].length;
    const clone = new Array(rows);
    for (let row = 0; row < rows; row++) {
      clone[row] = new Array(cols);
      for (let col = 0; col < cols; col++) {
        clone[row][col] = matrix[row][col];
      }
    }
    return clone;
  }
