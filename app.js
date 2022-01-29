"use strict";

/**
 * Methods about the game
 */
class Game {
    constructor() {
        this.rows = document.querySelectorAll(".game-table .row");
        this.columns = document.querySelectorAll(".game-table .column");
        this.current_player_text = document.querySelector("#current_player");
        this.result_text = document.querySelector("#result");
        this.previous_player = null;
        this.current_player = null;
        this.game_state = [[1,2,3], [4,5,6], [7,8,9]];
        this.play_again_button = document.querySelector("#play_again");
    }

    /**
     * Start the game
     */
    start() {
        this.current_player = "X";
        this.updateCurrentPlayerText();

        this.columns.forEach((column) => {
            column.addEventListener("click", this.handleColumnClick);
        });

        this.play_again_button.addEventListener("click", () => {
            this.resetTheGame();
            this.start();
        })
    }

    /**
     * Handle clicks of columns
     * @param {object} event Event object for perform actions of clicked column
     */
    handleColumnClick = (event) => {
        const clicked_column = event.target;
        const clicked_row = clicked_column.parentElement;
        const clicked_column_index = clicked_column.getAttribute("id");
        const clicked_row_index = clicked_row.getAttribute("id");

        clicked_column.classList.add("clicked");

        clicked_column.innerText = this.current_player;

        this.updateGameState(clicked_row_index, clicked_column_index);

        this.moveGameToNextMove();
    }

    /**
     * Update current player status
     */
    updateCurrentPlayerText() {
        this.current_player_text.innerText = `Current player: ${this.current_player}`;
    }

    /**
     * Update game state by the clicked row and column index
     * @param {number} row_index Index of clicked row
     * @param {number} column_index Index of clicked column
     */
    updateGameState(row_index, column_index) {
        this.game_state[row_index][column_index] = this.current_player;
    }

    /**
     * Check game is over
     */
    checkIsGameOver() {
        const game_state = this.game_state;

        const winner_patterns = {
            1: [[0,0], [0,1], [0,2]],
            2: [[1,0], [1,1], [1,2]],
            3: [[2,0], [2,1], [2,2]],
            4: [[0,0], [1,0], [2,0]],
            5: [[0,1], [1,1], [2,1]],
            6: [[0,2], [1,2], [2,2]],
            7: [[0,0], [1,1], [2,2]],
            8: [[0,2], [1,1], [2,0]]
        }

        for (const key in winner_patterns) {
            const pattern_row_0 = winner_patterns[key][0][0];
            const pattern_column_0 = winner_patterns[key][0][1];

            const pattern_row_1 = winner_patterns[key][1][0];
            const pattern_column_1 = winner_patterns[key][1][1];

            const pattern_row_2 = winner_patterns[key][2][0];
            const pattern_column_2 = winner_patterns[key][2][1];

            const game_state_item_1 = game_state[pattern_row_0][pattern_column_0];
            const game_state_item_2 = game_state[pattern_row_1][pattern_column_1];
            const game_state_item_3 = game_state[pattern_row_2][pattern_column_2];

            if (game_state_item_1 === game_state_item_2 && game_state_item_1  === game_state_item_3) {
                this.showTheResult(this.previous_player);
                break;
            }
        }
    }

    /**
     * Display winner player on the screen
     * @param {string} winner Player type for display who is the winner 
     */
    showTheResult(winner) {
        this.result_text.innerText = `Result: Player ${winner} won`;
        this.current_player_text.innerText = "Current player: -";
    }

    /**
     * Reset the game
     */
    resetTheGame() {
        this.previous_player = null;
        this.current_player = null;
        this.game_state = [[1,2,3], [4,5,6], [7,8,9]];

        this.columns.forEach((column) => {
            column.innerText = "";
            column.classList.remove("clicked");
        });

        this.current_player_text.innerText = "Current player: -";
        this.result_text.innerText = "Result: -";
    }

    /**
     * Move game to next move
     */
    moveGameToNextMove() {
        this.previous_player = this.current_player;
        this.current_player = this.current_player === "X" ? "O" : "X";

        this.updateCurrentPlayerText();

        this.checkIsGameOver();
    }
}

const game = new Game();

game.start();