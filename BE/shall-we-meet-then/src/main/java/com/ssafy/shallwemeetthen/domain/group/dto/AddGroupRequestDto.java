package com.ssafy.shallwemeetthen.domain.group.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AddGroupRequestDto {
    private Long seq;
    @Size(min = 2, max = 30, message = "그룹 네임은 2글자 미만, 30자 초과할 수 없습니다.")
    private String name;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime openDateTime;

    //그룹 생성
    @Builder
    public AddGroupRequestDto(Long seq, String name, LocalDateTime openDateTime) {
        this.seq = seq;
        this.name = name;
        this.openDateTime = openDateTime;
    }
}
