package com.ssafy.shallwemeetthen.domain.member.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)

public class MemberModifyPasswordRequestDto {

    @NotBlank
    @Email(message = "이메일 형식에 맞지 않습니다.")
    private String email;

    @NotBlank
    @Size(min=4,max=12,message = "비밀번호 형식에 맞지 않습니다.")
    private String nextPassword;

    @NotBlank
    private String uuid;

    public MemberModifyPasswordRequestDto(String email, String nextPassword, String uuid) {
        this.email = email;
        this.nextPassword = nextPassword;
        this.uuid = uuid;
    }
}
