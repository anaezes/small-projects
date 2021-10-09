class GameOfLife {
  constructor() {
    this.cell_size = 5;
    this.dead_color = "#181818";
    this.alive_color = "#ff756b";
    this.cells_in_column = Math.floor(canvas.width / this.cell_size);
    this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
    this.active_array = [];
    this.inative_array = [];
  }

    gameSetup = () => {
      this.arrayInitialization();
    };

    runGame = () => {
      this.updateLifeCycle();
      this.fillArray();
    };

    arrayInitialization = () => {
         for (let i = 0; i < this.cells_in_rows; i++) {
            this.active_array[i] = [];
            for (let j = 0; j < this.cells_in_column; j++) {
                this.active_array[i][j] = 0;
            }
        } 
        this.inative_array = this.active_array;
    }

    arrayRandomize = () => {
      for (let i = 0; i < this.cells_in_rows; i++) {
        for (let j = 0; j < this.cells_in_column; j++) {
            this.active_array[i][j] = (Math.random() > 0.5) ? 1 : 0;
        }
      }
    };

    fillArray = () => {
      for (let i = 0; i < this.cells_in_rows; i++) {
        for (let j = 0; j < this.cells_in_column; j++) {
          const elem = this.active_array[i][j];
          const color = elem === 1 ? this.alive_color : this.dead_color;
          ctx.fillStyle = color;
          ctx.fillRect(
            j * this.cell_size,
            i * this.cell_size,
            this.cell_size,
            this.cell_size
          );
        }
      }
    };

    getCellValueHelper = (row, col) => {
        try {
          return this.active_array[row][col];
        } catch {
          return 0;
        }
    };

    countNeighbours = (row, col) => {
      let total_neighbours = 0;
      total_neighbours += this.getCellValueHelper(row - 1, col - 1);
      total_neighbours += this.getCellValueHelper(row - 1, col);
      total_neighbours += this.getCellValueHelper(row - 1, col + 1);
      total_neighbours += this.getCellValueHelper(row, col - 1);
      total_neighbours += this.getCellValueHelper(row, col + 1);
      total_neighbours += this.getCellValueHelper(row + 1, col - 1);
      total_neighbours += this.getCellValueHelper(row + 1, col);
      total_neighbours += this.getCellValueHelper(row + 1, col + 1);
      return total_neighbours;
    };

    updateCellValue = (row, col) => {
      const total = this.countNeighbours(row, col);

      // cell with more than 4 or less then 3 neighbours dies. 1 => 0; 0 => 0
      if (total > 4 || total < 3) return 0;

      // dead cell with 3 neighbours becomes alive. 0 => 1
      else if (this.active_array[row][col] === 0 && total === 3) return 1;

      // or returning its status back. 0 => 0; 1 => 1
      else return this.active_array[row][col];
    };

    updateLifeCycle = () => {
      for (let i = 0; i < this.cells_in_rows; i++) {
        for (let j = 0; j < this.cells_in_column; j++) {
          this.inative_array[i][j] = this.updateCellValue(i, j);
        }
      }
      this.active_array = this.inative_array;
    };
}
