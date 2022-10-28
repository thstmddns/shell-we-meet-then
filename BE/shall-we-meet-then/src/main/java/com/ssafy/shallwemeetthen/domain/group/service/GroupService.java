package com.ssafy.shallwemeetthen.domain.group.service;


import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupRequestDto;
import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupResponseDto;
import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.repository.GroupRepository;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
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


    public AddGroupResponseDto addGroup(AddGroupRequestDto addgrouprequestDto) {

        String invitationCode = UUID.randomUUID().toString();
        Groups groups = Groups.builder()
                .name(addgrouprequestDto.getName())
                .invitationCode(invitationCode)
                .openDateTime(addgrouprequestDto.getOpenDateTime())
                .headcount(0)
                .agree(N)
                .build();

        groupRepository.save(groups);
        return new AddGroupResponseDto(invitationCode);
    }
//명범님 엔티티에는 있지만 dto(요청)에는 없는 건 어떻게 받아오나요?
}