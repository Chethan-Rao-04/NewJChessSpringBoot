package com.springboot.jchess.Chess.Controller;

import com.springboot.jchess.Chess.Model.GameState;
import com.springboot.jchess.Chess.Service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;



    @RestController
    @RequestMapping("/api/game")
    public class GameController {

        @Autowired
        private GameService gameService;

        @GetMapping("/state")
        public GameState getGameState() {
            return gameService.getGameState();
        }

        @PostMapping("/move")
        public GameState makeMove(@RequestParam int fromX, @RequestParam int fromY,
                                  @RequestParam int toX, @RequestParam int toY) {
            gameService.makeMove(fromX, fromY, toX, toY);
            return gameService.getGameState();
        }
    }

