package com.ssafy.shallwemeetthen.domain.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class MemberFindPasswordRequestDto {

    @NotBlank
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;

    public MemberFindPasswordRequestDto(String email) {
        this.email = email;
    }
}
