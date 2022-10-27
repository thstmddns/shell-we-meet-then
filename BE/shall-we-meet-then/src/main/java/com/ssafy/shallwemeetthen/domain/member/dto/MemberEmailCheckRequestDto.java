package com.ssafy.shallwemeetthen.domain.member.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberEmailCheckRequestDto {

    private String code;

}
