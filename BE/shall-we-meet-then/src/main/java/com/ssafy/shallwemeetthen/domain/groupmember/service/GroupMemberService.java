package com.ssafy.shallwemeetthen.domain.groupmember.service;

import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import com.ssafy.shallwemeetthen.domain.group.repository.GroupRepository;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.*;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import com.ssafy.shallwemeetthen.domain.groupmember.exception.CodeNotMatchException;
import com.ssafy.shallwemeetthen.domain.groupmember.exception.DuplicatedGroupMemberException;
import com.ssafy.shallwemeetthen.domain.groupmember.repository.GroupMemberQueryRepository;
import com.ssafy.shallwemeetthen.domain.groupmember.repository.GroupMemberRepository;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import com.ssafy.shallwemeetthen.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.StringUtils;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class GroupMemberService {
    private final GroupMemberRepository groupMemberRepository;

    private final GroupMemberQueryRepository groupMemberQueryRepository;

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

    public boolean open(OpenDto.Request dto) {
        GroupMember groupMember = groupMemberRepository.findByGroupSeqAndMemberSeq(dto.getGroupSeq(), 10000L).orElseThrow(() -> new IllegalArgumentException("해당 그룹의 그룹 멤버가 아닙니다."));

        if (groupMember.getAgree() == AgreeState.Y) throw new IllegalStateException("해당 유저는 이미 열람을 동의한 상태입니다.");

        groupMember.open();

        return true;
    }

    public GetScoreDto.Response getScore(GetScoreDto.Request dto) {
        GroupMember groupMember = groupMemberRepository.findByGroupSeqAndMemberSeq(dto.getGroupSeq(), 10000L).orElseThrow(() -> new IllegalArgumentException("해당 그룹의 그룹 멤버가 아닙니다."));

        return new GetScoreDto.Response(groupMember.getScore());
    }

    public boolean addScore(AddScoreDto.Request dto) {
        GroupMember groupMember = groupMemberRepository.findByGroupSeqAndMemberSeq(dto.getGroupSeq(), 10000L).orElseThrow(() -> new IllegalArgumentException("해당 그룹의 그룹 멤버가 아닙니다."));

        groupMember.updateScore(dto.getScore());

        return true;
    }

    public boolean checkNickname(CheckNicknameDto.Request dto) {
        return groupMemberRepository.existsByGroupSeqAndNickname(dto.getGroupSeq(), dto.getNickname());
    }

    public List<GroupMemberDto.Response> getGroupMembers(GetGroupMembersDto.Request dto) {
        List<GroupMember> groupMembers = groupMemberQueryRepository.getGroupMembers(dto);

        List<GroupMemberDto.Response> dtos = new ArrayList<>();

        for (GroupMember groupMember : groupMembers) {
            dtos.add(new GroupMemberDto.Response(groupMember));
        }

        return dtos;
    }
}
