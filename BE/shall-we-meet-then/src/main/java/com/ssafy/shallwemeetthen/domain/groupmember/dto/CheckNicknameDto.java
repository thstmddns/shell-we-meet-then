package com.ssafy.shallwemeetthen.domain.groupmember.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class CheckNicknameDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Request {

        private Long groupSeq;

        private String nickname;

        public Request(Long groupSeq, String nickname) {
            this.groupSeq = groupSeq;
            this.nickname = nickname;
        }
    }
}
