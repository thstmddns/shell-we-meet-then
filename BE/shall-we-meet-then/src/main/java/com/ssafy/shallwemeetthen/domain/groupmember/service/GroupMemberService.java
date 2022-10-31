package com.ssafy.shallwemeetthen.domain.groupmember.service;

import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import com.ssafy.shallwemeetthen.domain.group.repository.GroupRepository;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.AddGroupMemberRequestDto;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import com.ssafy.shallwemeetthen.domain.groupmember.exception.CodeNotMatchException;
import com.ssafy.shallwemeetthen.domain.groupmember.exception.DuplicatedGroupMemberException;
import com.ssafy.shallwemeetthen.domain.groupmember.repository.GroupMemberRepository;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import com.ssafy.shallwemeetthen.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.StringUtils;
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

        Groups groups = groupRepository.findById(addGroupMemberRequestDto.getGroupSeq()).orElseThrow(() -> new IllegalArgumentException("해당 SEQ의 그룹이 없습니다."));

        if (!StringUtils.equals(groups.getInvitationCode(), addGroupMemberRequestDto.getInvitationCode())) throw new CodeNotMatchException("초대 코드가 일치하지 않습니다.");

        Member tempMember = memberRepository.findById(10000L).orElseThrow(() -> new IllegalArgumentException("해당 SEQ의 멤버가 없습니다."));

        if (groupMemberRepository.existsByGroupAndMember(groups, tempMember)) throw new DuplicatedGroupMemberException("이미 참여한 그룹 멤버입니다.");

        groups.addHeadCount();

        GroupMember groupMember = GroupMember.builder()
                .group(groups)
                .member(tempMember)
                .nickname(addGroupMemberRequestDto.getNickname())
                .agree(AgreeState.N)
                .score(0)
                .build();

        groupMemberRepository.save(groupMember);

        return true;
    }
}
