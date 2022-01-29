class Game {
    constructor() {
        this.rows = document.querySelectorAll(".game-table .row");
        this.columns = document.querySelectorAll(".game-table .column");
    }
}

const game = new Game();