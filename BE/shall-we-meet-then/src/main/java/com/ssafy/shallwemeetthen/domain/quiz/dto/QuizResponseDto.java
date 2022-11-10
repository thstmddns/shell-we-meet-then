package com.ssafy.shallwemeetthen.domain.quiz.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class QuizResponseDto {
    String question;

    String correctAnswer;

    String answer1;

    String answer2;

    String answer3;

    String answer4;

    String existPicture;

    String boardSeq;

    String subject;


    @Builder
    public QuizResponseDto(String question, String correctAnswer, String answer1, String answer2, String answer3, String answer4, String existPicture, String boardSeq, String subject) {
        this.question = question;
        this.correctAnswer = correctAnswer;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.existPicture = existPicture;
        this.boardSeq = boardSeq;
        this.subject = subject;
    }
}
