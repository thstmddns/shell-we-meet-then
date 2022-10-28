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
    private Long seq;
    private String name;
    private LocalDateTime openDateTime;

    @Builder
    public AddGroupRequestDto(Long seq, String name, LocalDateTime openDateTime) {
        this.seq = seq;
        this.name = name;
        this.openDateTime = openDateTime;
    }
}
