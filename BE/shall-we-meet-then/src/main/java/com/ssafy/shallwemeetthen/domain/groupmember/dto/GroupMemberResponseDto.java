package com.ssafy.shallwemeetthen.domain.groupmember.dto;

import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class GroupMemberResponseDto {
    private Long seq;
    private String nickname;

    public GroupMemberResponseDto(GroupMember groupMember) {
        this.seq = groupMember.getSeq();
        this.nickname = groupMember.getNickname();
    }
}