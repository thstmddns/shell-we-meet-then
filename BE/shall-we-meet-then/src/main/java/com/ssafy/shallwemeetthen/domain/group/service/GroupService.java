package com.ssafy.shallwemeetthen.domain.group.service;


import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupRequestDto;
import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupResponseDto;
import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class


GroupService {
    private final GroupRepository groupRepository;


    public AddGroupResponseDto addGroup(AddGroupRequestDto addgrouprequestDto) {
        String invitationCode = UUID.randomUUID().toString();
        Groups groups = Groups.builder()
                .name(addgrouprequestDto.getName())
                .openDateTime(addgrouprequestDto.getOpenDateTime())
                .invitationCode(invitationCode)
                .build();

        groupRepository.save(groups);

        return new AddGroupResponseDto(invitationCode);
    }

}