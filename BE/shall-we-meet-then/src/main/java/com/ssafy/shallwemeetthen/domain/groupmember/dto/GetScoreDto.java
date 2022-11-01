package com.ssafy.shallwemeetthen.domain.groupmember.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class GetScoreDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Request {

        private Long groupSeq;

        public Request(Long groupSeq) {
            this.groupSeq = groupSeq;
        }
    }

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Response {

        private int score;

        public Response(int score) {
            this.score = score;
        }
    }
}
