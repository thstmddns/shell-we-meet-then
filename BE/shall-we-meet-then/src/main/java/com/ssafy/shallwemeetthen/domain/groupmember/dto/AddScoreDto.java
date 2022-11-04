package com.ssafy.shallwemeetthen.domain.groupmember.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class AddScoreDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Request {

        private Long groupSeq;

        private int score;

        public Request(Long groupSeq, int score) {
            this.groupSeq = groupSeq;
            this.score = score;
        }
    }
}
