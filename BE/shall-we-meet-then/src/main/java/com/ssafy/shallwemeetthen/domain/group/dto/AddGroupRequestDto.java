package com.ssafy.shallwemeetthen.domain.group.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AddGroupRequestDto {
    private String name;
    private LocalDateTime openDateTime;

    @Builder
    public AddGroupRequestDto(String name, LocalDateTime openDateTime) {
        this.name = name;
        this.openDateTime = openDateTime;
    }
}
