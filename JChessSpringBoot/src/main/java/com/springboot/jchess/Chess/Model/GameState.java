package com.springboot.jchess.Chess.Model;

public class GameState {

        private String[][] board; // 2D array representing the chessboard
        private String currentPlayer; // "white" or "black"

        // Constructors, Getters, and Setters
        public GameState(String[][] board, String currentPlayer) {
            this.board = board;
            this.currentPlayer = currentPlayer;
        }

        public String[][] getBoard() {
            return board;
        }

        public void setBoard(String[][] board) {
            this.board = board;
        }

        public String getCurrentPlayer() {
            return currentPlayer;

        }

        public void setCurrentPlayer(String currentPlayer) {
            this.currentPlayer = currentPlayer;
        }
    }
