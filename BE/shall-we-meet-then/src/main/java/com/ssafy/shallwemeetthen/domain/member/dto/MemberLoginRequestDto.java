package com.ssafy.shallwemeetthen.domain.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class MemberLoginRequestDto {

    @NotBlank
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;

    @NotBlank
    @Size(min=4,max=12,message = "비밀번호 형식에 맞지 않습니다.")
    private String password;

    @Builder
    public MemberLoginRequestDto(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
