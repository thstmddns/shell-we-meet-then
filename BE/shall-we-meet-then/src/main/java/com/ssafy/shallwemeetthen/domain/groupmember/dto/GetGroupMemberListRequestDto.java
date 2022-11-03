package com.ssafy.shallwemeetthen.domain.groupmember.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetGroupMemberListRequestDto {
    private Long memberSeq;

    public GetGroupMemberListRequestDto(Long memberSeq) {
        this.memberSeq = memberSeq;
    }
}

