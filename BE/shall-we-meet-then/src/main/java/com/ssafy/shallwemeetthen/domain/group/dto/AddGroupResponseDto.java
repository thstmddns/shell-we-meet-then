package com.ssafy.shallwemeetthen.domain.group.dto;


import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddGroupResponseDto {

    private String invitationCode;

    @Builder
    public AddGroupResponseDto(String invitationCode) {
        this.invitationCode = invitationCode;
    }
}
