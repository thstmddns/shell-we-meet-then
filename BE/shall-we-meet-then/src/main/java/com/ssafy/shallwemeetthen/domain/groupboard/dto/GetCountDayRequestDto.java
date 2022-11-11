package com.ssafy.shallwemeetthen.domain.groupboard.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetCountDayRequestDto {

    private Long groupSeq;

    public GetCountDayRequestDto(Long groupSeq) {
        this.groupSeq = groupSeq;
    }
}
