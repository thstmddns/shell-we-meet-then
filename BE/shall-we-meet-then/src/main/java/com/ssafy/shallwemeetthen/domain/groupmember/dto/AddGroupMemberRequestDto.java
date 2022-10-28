package com.ssafy.shallwemeetthen.domain.groupmember.dto;

import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddGroupMemberRequestDto {

    private Long groupSeq;
    private String nickname;

    private String invitationCode;
    private AgreeState agree;


    public AddGroupMemberRequestDto(Long groupSeq, String nickname, String invitationCode, AgreeState agree) {
        this.groupSeq = groupSeq;
        this.nickname = nickname;
        this.invitationCode = invitationCode;
        this.agree = agree;
    }
}
