package com.ssafy.shallwemeetthen.domain.groupmember.dto;

import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddGroupMemberRequestDto {

    private String nickname;

    private String invitationCode;


    public AddGroupMemberRequestDto(String nickname, String invitationCode) {
        this.nickname = nickname;
        this.invitationCode = invitationCode;
    }
}
