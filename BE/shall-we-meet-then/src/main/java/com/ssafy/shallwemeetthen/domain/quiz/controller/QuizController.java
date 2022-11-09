package com.ssafy.shallwemeetthen.domain.quiz.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class QuizController {

    @GetMapping("/quiz")
    public ResponseEntity<?> quiz(@RequestBody){

        return new ResponseEntity<>()
    }
}
