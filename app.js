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

    /**
     * Start the game
     */
    start() {
        this.current_player = "X";
        this.updateCurrentPlayer("X");

        this.columns.forEach((column) => {
            column.addEventListener("click", this.handleColumnClick);
        });
    }

    /**
     * Handle clicks of columns
     * @param {object} event Event object for perform actions of clicked column
     */
    handleColumnClick = (event) => {
        const clicked_column = event.target;

        clicked_column.innerText = this.current_player;

        this.current_player = this.current_player === "X" ? "O" : "X";

        this.updateCurrentPlayer(this.current_player);
    }

    updateCurrentPlayer(current_player) {
        this.current_player_text.innerText = `Current player: ${current_player}`;
    }
}

const game = new Game();

game.start();