package com.ssafy.shallwemeetthen.domain.groupboard.dto;

import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.GroupMemberDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


public class ArticleDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Response {

        private Long boardSeq;

        private GroupMemberDto.Response groupMember;

        private String content;

        private boolean hasImage;

        private boolean hasVideo;

        public Response(GroupBoard groupBoard) {
            this.boardSeq = groupBoard.getSeq();
            this.groupMember = new GroupMemberDto.Response(groupBoard.getGroupMember());
            this.content = groupBoard.getContent();
            this.hasImage = groupBoard.getThumbnailImageUuidName() != null;
            this.hasVideo = groupBoard.getVideoUuidName() != null;
        }
    }
}
