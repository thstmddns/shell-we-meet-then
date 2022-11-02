package com.ssafy.shallwemeetthen.domain.groupboard.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetTotalCountRequestDto {

    private Long groupSeq;

    public GetTotalCountRequestDto(Long groupSeq) {
        this.groupSeq = groupSeq;
    }
}
