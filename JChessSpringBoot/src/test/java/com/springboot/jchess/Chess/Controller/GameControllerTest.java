package com.springboot.jchess.Chess.Controller;

import com.springboot.jchess.Chess.Controller.GameController;
import com.springboot.jchess.Chess.Model.GameState;
import com.springboot.jchess.Chess.Service.GameService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class GameControllerTest {

    @Autowired
    private GameController gameController;  // Spring will inject the dependency

    @Autowired
    private GameService gameService;  // Spring will inject the GameService


//
//    @Test
//    public void testGetGameState() {
//        assertNotNull(gameController, "GameController should not be null.");
//        assertNotNull(gameService, "GameService should be injected correctly.");
//
//        // Test that GameState is retrieved correctly
//        GameState gameState = gameController.getGameState();
//        assertNotNull(gameState, "Game state should not be null.");
//        assertEquals("white", gameState.getCurrentPlayer(), "Game should start with white's turn.");
//        System.out.println(gameState.getCurrentPlayer());
//   }
////
    @Test
    public void testMakeMove() {

        GameState result = gameController.makeMove(1, 0, 2, 0);  // Test a valid move
        assertNotNull(result, "Move should be valid");
        assertEquals("black",result.getCurrentPlayer());
        System.out.println(result.getCurrentPlayer());
//        assertEquals("black", gameController.getGameState().getCurrentPlayer(), "Player turn should switch to black.");
 }
}
