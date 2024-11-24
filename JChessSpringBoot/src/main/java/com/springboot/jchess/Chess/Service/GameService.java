package com.springboot.jchess.Chess.Service;
import com.springboot.jchess.Chess.Model.GameState;
import org.springframework.stereotype.Service;

@Service
    public class GameService {
        private GameState gameState;

        public GameService() {
            // Initialize a new game
            String[][] initialBoard = initializeBoard();
            this.gameState = new GameState(initialBoard, "white");
        }

        private String[][] initializeBoard() {
            return new String[][] {
                    {"R", "N", "B", "Q", "K", "B", "N", "R"},
                    {"P", "P", "P", "P", "P", "P", "P", "P"},
                    {"", "", "", "", "", "", "", ""},
                    {"", "", "", "", "", "", "", ""},
                    {"", "", "", "", "", "", "", ""},
                    {"", "", "", "", "", "", "", ""},
                    {"P", "P", "P", "P", "P", "P", "P", "P"},
                    {"R", "N", "B", "Q", "K", "B", "N", "R"}
            };
        }

        public GameState getGameState() {
            return gameState;
        }

        public void makeMove(int fromX, int fromY, int toX, int toY) {
            // Logic for moving pieces
            String piece = gameState.getBoard()[fromX][fromY];
            gameState.getBoard()[fromX][fromY] = "";
            gameState.getBoard()[toX][toY] = piece;

            // Switch player
            gameState.setCurrentPlayer(gameState.getCurrentPlayer().equals("white") ? "black" : "white");
        }
    }

