package com.ssafy.shallwemeetthen.domain.group.service;


import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupRequestDto;
import com.ssafy.shallwemeetthen.domain.group.dto.GroupResponseDto;
import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

import static com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState.N;

@Service
@Transactional
@RequiredArgsConstructor
public class


GroupService {
    private final GroupRepository groupRepository;

    public GroupResponseDto addGroup(AddGroupRequestDto addgrouprequestDto) {

        String invitationCode = UUID.randomUUID().toString();
        Groups groups = Groups.builder()
                .name(addgrouprequestDto.getName())
                .invitationCode(invitationCode)
                .openDateTime(addgrouprequestDto.getOpenDateTime())
                .headcount(0)
                .agree(N)
                .build();


        groupRepository.save(groups);

        return new GroupResponseDto(groups);
    }

}