package com.ssafy.shallwemeetthen.domain.group.dto;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AddCommonGroupResponseDto {
    private String name;
    private LocalDateTime openDateTime;
    private String nickname;

    public AddCommonGroupResponseDto(String name, LocalDateTime openDateTime, String nickname) {
        this.name = name;
        this.openDateTime = openDateTime;
        this.nickname = nickname;
    }
}
