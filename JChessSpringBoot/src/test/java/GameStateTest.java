import com.springboot.jchess.Chess.Model.GameState;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class GameStateTest {

    private GameState gameState;
    private String[][] initialBoard;

    @BeforeEach
    public void setUp() {
        initialBoard = new String[][]{
                {"R", "N", "B", "Q", "K", "B", "N", "R"},
                {"P", "P", "P", "P", "P", "P", "P", "P"},
                {"", "", "", "", "", "", "", ""},
                {"", "", "", "", "", "", "", ""},
                {"", "", "", "", "", "", "", ""},
                {"", "", "", "", "", "", "", ""},
                {"P", "P", "P", "P", "P", "P", "P", "P"},
                {"R", "N", "B", "Q", "K", "B", "N", "R"}
        };
        gameState = new GameState(initialBoard, "white");
    }

    @Test
    public void testInitialGameState() {
        assertArrayEquals(initialBoard, gameState.getBoard(), "Initial board setup should match");
        assertEquals("white", gameState.getCurrentPlayer(), "Initial player should be white");
    }

    @Test
    public void testSetBoard() {
        String[][] newBoard = new String[][]{
                {"R", "N", "B", "Q", "K", "B", "N", "R"},
                {"", "P", "P", "P", "P", "P", "P", "P"},
                {"P", "", "", "", "", "", "", ""},
                {"", "", "", "", "", "", "", ""},
                {"", "", "", "", "", "", "", ""},
                {"", "", "", "", "", "", "", ""},
                {"P", "P", "P", "P", "", "P", "P", "P"},
                {"R", "N", "B", "Q", "K", "B", "N", "R"}
        };

        gameState.setBoard(newBoard);
        assertArrayEquals(newBoard, gameState.getBoard(), "Board should as the new board after setting");
    }

    @Test
    public void testSetCurrentPlayer() {
        gameState.setCurrentPlayer("black");
        assertEquals("black", gameState.getCurrentPlayer(), "Current player should be black after update");
    }
}