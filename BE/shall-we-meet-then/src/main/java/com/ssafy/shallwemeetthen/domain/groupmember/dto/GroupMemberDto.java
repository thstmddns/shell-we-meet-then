package com.ssafy.shallwemeetthen.domain.groupmember.dto;

import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import lombok.*;

public class GroupMemberDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Response {
        private Long groupMemberSeq;

        private String nickname;

        private AgreeState agree;

        private int score;

        public Response(GroupMember groupMember) {
            this.groupMemberSeq = groupMember.getSeq();
            this.nickname = groupMember.getNickname();
            this.agree = groupMember.getAgree();
            this.score = groupMember.getScore();
        }
    }
}
