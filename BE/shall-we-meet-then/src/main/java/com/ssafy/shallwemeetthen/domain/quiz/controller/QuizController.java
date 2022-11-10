package com.ssafy.shallwemeetthen.domain.quiz.controller;

import com.ssafy.shallwemeetthen.domain.groupboard.dto.ArticleSearchCondition;
import com.ssafy.shallwemeetthen.domain.quiz.service.QuizGetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class QuizController {

    private final QuizGetService quizGetService;

    @GetMapping("/quiz")
    public ResponseEntity<?> quiz(@ModelAttribute ArticleSearchCondition articleSearchCondition){
        return new ResponseEntity<>(quizGetService.quiz(articleSearchCondition), HttpStatus.OK);
    }
}
