package com.ssafy.shallwemeetthen.domain.groupboard.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetTotalCountResponseDto {

    private Long groupMemberSeq;

    private String nickname;

    private Long articleCount;

    public GetTotalCountResponseDto(Long groupMemberSeq, String nickname, Long articleCount) {
        this.groupMemberSeq = groupMemberSeq;
        this.nickname = nickname;
        this.articleCount = articleCount;
    }
}
