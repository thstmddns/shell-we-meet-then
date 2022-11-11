package com.ssafy.shallwemeetthen.domain.groupboard.dto;

import com.ssafy.shallwemeetthen.domain.groupmember.dto.GroupMemberResponseDto;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetMemberBoardCountResponseDto {

    private GroupMemberResponseDto groupMember;

    private Long count;

    public GetMemberBoardCountResponseDto(GroupMember groupMember, Long count) {
        this.groupMember = new GroupMemberResponseDto(groupMember);
        this.count = count;
    }
}
