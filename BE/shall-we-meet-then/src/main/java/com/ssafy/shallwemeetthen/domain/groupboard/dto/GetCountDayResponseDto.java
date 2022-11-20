package com.ssafy.shallwemeetthen.domain.groupboard.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.GroupMemberResponseDto;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GetCountDayResponseDto {

    private GroupMemberResponseDto groupMember;

    private Long count;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd", timezone = "Asia/Seoul")
    private LocalDateTime createDate;

    public GetCountDayResponseDto(GroupMember groupMember, Long count, LocalDateTime createDate) {
        this.groupMember = new GroupMemberResponseDto(groupMember);
        this.count = count;
        this.createDate = createDate;
    }
}
