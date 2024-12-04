package com.springboot.jchess.Chess.Service;

import com.springboot.jchess.Chess.Model.GameState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class GameServiceTest {
    private GameService gameService;

    @BeforeEach
    public void setUp() {
        gameService = new GameService();
    }

    @Test
    public void testInitialPlayerTurn() {
        String initialPlayer = gameService.getGameState().getCurrentPlayer();
        assertEquals("white", initialPlayer, "The game should start with the white player's turn.");
    }

    @Test
    public void testPlayerTurnSwitching() {
        // Perform a move
        gameService.makeMove(1, 0, 2, 0); // Move pawn from [1,0] to [2,0]
        String currentPlayerAfterMove = gameService.getGameState().getCurrentPlayer();
        assertEquals("black", currentPlayerAfterMove, "After white's turn, it should be black's turn.");

        // Perform another move
        gameService.makeMove(6, 0, 5, 0); // Move black pawn from [6,0] to [5,0]
        String nextPlayerAfterMove = gameService.getGameState().getCurrentPlayer();
        assertEquals("white", nextPlayerAfterMove, "After black's turn, it should be white's turn.");
    }
}
