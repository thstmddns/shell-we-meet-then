package com.ssafy.shallwemeetthen.domain.groupboard.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class GetCountDto {

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
        private Long articleCount;

        public Response(Long articleCount) {
            this.articleCount = articleCount;
        }
    }
}
