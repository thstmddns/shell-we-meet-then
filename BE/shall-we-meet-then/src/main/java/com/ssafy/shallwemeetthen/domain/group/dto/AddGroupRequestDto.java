package com.ssafy.shallwemeetthen.domain.group.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AddGroupRequestDto {
    private String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime openDateTime;

    @Builder
    public AddGroupRequestDto(Long seq, String name, LocalDateTime openDateTime) {
        this.name = name;
        this.openDateTime = openDateTime;
    }
}
