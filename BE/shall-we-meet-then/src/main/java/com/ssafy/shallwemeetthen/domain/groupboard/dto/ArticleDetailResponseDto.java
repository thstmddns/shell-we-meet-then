package com.ssafy.shallwemeetthen.domain.groupboard.dto;

import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.GroupMemberDto;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ArticleDetailResponseDto {

    private Long boardSeq;

    private GroupMemberDto.Response groupMember;

    private String content;

    private List<Integer> imageSeqs;

    public ArticleDetailResponseDto(GroupBoard groupBoard, List<Integer> imageSeqs) {
        this.boardSeq = groupBoard.getSeq();
        this.groupMember = new GroupMemberDto.Response(groupBoard.getGroupMember());
        this.content = groupBoard.getContent();
        this.imageSeqs = imageSeqs;
    }
}
