package com.ssafy.shallwemeetthen.domain.groupmember.service;

import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import com.ssafy.shallwemeetthen.domain.group.repository.GroupRepository;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.AddGroupMemberRequestDto;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import com.ssafy.shallwemeetthen.domain.groupmember.repository.GroupMemberRepository;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import com.ssafy.shallwemeetthen.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class GroupMemberService {
    private final GroupMemberRepository groupMemberRepository;
    private final MemberRepository memberRepository;

    private final GroupRepository groupRepository;


    //Todo 로그인 멤버로 변경요망
    public boolean addGroupMember(AddGroupMemberRequestDto addGroupMemberRequestDto) {

        Groups groups = groupRepository.findById(addGroupMemberRequestDto.getGroupSeq()).orElseThrow(() -> new IllegalArgumentException("해당 SEQ가 없습니다."));
        Member tempMember = memberRepository.findById(1000L).orElseThrow(() -> new IllegalArgumentException());

        groups.addHeadCount();

        GroupMember groupMember = GroupMember.builder()
                .group(groups)
                .member(tempMember)
                .nickname(addGroupMemberRequestDto.getNickname())
                .agree(addGroupMemberRequestDto.getAgree())
                .score(0)
                .build();

        groupMemberRepository.save(groupMember);

        return true;
    }

}
