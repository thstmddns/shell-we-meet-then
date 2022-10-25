package com.ssafy.shallwemeetthen.domain.common.service;

import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupRequestDto;
import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupResponseDto;
import com.ssafy.shallwemeetthen.domain.group.service.GroupService;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.AddGroupMemberRequestDto;
import com.ssafy.shallwemeetthen.domain.groupmember.service.GroupMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class CommonGroupService {

    private final GroupService groupService;
    private final GroupMemberService groupMemberService;

    public AddGroupResponseDto addGroup(AddGroupRequestDto addGroupRequestDto){

        AddGroupResponseDto addGroupResponseDto = groupService.addGroup(addGroupRequestDto);
        groupMemberService.addGroupMember(new AddGroupMemberRequestDto(addGroupRequestDto.getNickname()));

        return addGroupResponseDto;
    }
}
