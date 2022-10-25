package com.ssafy.shallwemeetthen.domain.groupmember.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddGroupMemberRequestDto {
    private String nickname;

    public AddGroupMemberRequestDto(String nickname) {
        this.nickname = nickname;
    }
}
