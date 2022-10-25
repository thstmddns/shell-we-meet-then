package com.ssafy.shallwemeetthen.domain.group.dto;

import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AddGroupRequestDto {
    private String name;
    private LocalDateTime openDateTime;
    private String nickname;
}
