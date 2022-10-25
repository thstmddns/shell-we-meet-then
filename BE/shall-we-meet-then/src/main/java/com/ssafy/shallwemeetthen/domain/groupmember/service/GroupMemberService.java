package com.ssafy.shallwemeetthen.domain.groupmember.service;

import com.ssafy.shallwemeetthen.domain.groupmember.dto.AddGroupMemberRequestDto;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import com.ssafy.shallwemeetthen.domain.groupmember.repository.GroupMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class GroupMemberService {
    private final GroupMemberRepository groupMemberRepository;

    public boolean addGroupMember(AddGroupMemberRequestDto addGroupMemberRequestDto) {
        GroupMember groupMember = GroupMember.builder()
                .nickname(addGroupMemberRequestDto.getNickname())
                .build();

        groupMemberRepository.save(groupMember);


        return true;
    }
}
