"use strict";

/**
 * Methods about the game
 */
class Game {
    constructor() {
        this.rows = document.querySelectorAll(".game-table .row");
        this.columns = document.querySelectorAll(".game-table .column");
        this.current_player_text = document.querySelector("#current_player");
        this.current_player = null;
        this.result = null;
    }

    start() {
        this.current_player = "X";
        this.current_player_text.innerText = `Current player: ${this.current_player}`;

        this.columns.forEach((column) => {
            column.addEventListener("click", this.handleColumnClick);
        });
    }

    handleColumnClick = (event) => {
        const clicked_column = event.target;

        clicked_column.innerText = this.current_player;

        this.current_player = this.current_player === "X" ? "O" : "X";

        this.current_player_text.innerText = `Current player: ${this.current_player}`;
    }
}

const game = new Game();

game.start();