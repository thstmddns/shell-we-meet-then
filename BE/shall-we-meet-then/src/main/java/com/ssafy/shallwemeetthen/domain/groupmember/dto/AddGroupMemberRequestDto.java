package com.ssafy.shallwemeetthen.domain.groupmember.dto;

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

    public AddGroupMemberRequestDto(Long groupSeq, String nickname, String invitationCode) {
        this.groupSeq = groupSeq;
        this.nickname = nickname;
        this.invitationCode = invitationCode;
    }
}
