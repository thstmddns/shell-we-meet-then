package com.ssafy.shallwemeetthen.domain.groupboard.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetMemberBoardCountRequestDto {

    private Long groupSeq;

    public GetMemberBoardCountRequestDto(Long groupSeq) {
        this.groupSeq = groupSeq;
    }
}
