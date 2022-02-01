"use strict";

/**
 * Methods about the game
 */
class Game {
    constructor() {
        this.game_table = document.querySelector(".game-table");
        this.rows = document.querySelectorAll(".game-table .row");
        this.columns = document.querySelectorAll(".game-table .column");
        this.current_player_text = document.querySelector("#current_player");
        this.result_text = document.querySelector("#result");
        this.previous_player = null;
        this.current_player = null;
        this.game_state = [[1,2,3], [4,5,6], [7,8,9]];
        this.is_game_over = null;
        this.counter = null;
        this.play_again_button = document.querySelector("#play_again");
    }

    /**
     * Start the game
     */
    start() {
        this.current_player = "X";
        this.is_game_over = false;
        this.counter = 0;
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
        this.counter ++;
        const clicked_column = event.target;
        const clicked_row = clicked_column.parentElement;
        const clicked_column_index = clicked_column.getAttribute("id");
        const clicked_row_index = clicked_row.getAttribute("id");

        clicked_column.classList.add("disabled");

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
     * Update game state by the disabled row and column index
     * @param {number} row_index Index of disabled row
     * @param {number} column_index Index of disabled column
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
                this.finishTheGame("win", this.previous_player);
                this.is_game_over = true;
                break;
            }

            this.counter === 9 && this.finishTheGame("draw");
        }
    }

    /**
     * Display winner player on the screen
     * @param {string} finish_type How game is ended
     * @param {string} winner Player type for display who is the winner      
     */
    finishTheGame(finish_type, winner) {
        const finish = {
            win: (winner) => {
                this.result_text.innerText = `Result: Player ${winner} won`;
            },
            draw: () => {
                this.result_text.innerText = "Result: Draw !";
            }
        }

        this.game_table.classList.add("disabled");
        this.current_player_text.innerText = "Current player: -";
        finish[finish_type](winner);
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
            column.classList.remove("disabled");
        });

        this.game_table.classList.remove("disabled");

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