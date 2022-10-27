package com.ssafy.shallwemeetthen.domain.groupmember.entity;


import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
public class GroupMember {

    @Id @GeneratedValue
    @Column(name = "gm_seq", nullable = false)
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mem_seq", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gr_seq", nullable = false)
    private Groups group;

    @Column(name = "gm_nickname", nullable = false, length = 20)
    private String nickname;

    @Column(name = "gm_agree", nullable = false, length = 1)
    private AgreeState agree;

    @Column(name = "gm_score", nullable = false)
    private String score;

    @Builder
    public GroupMember(Long seq, Member member, Groups group, String nickname, AgreeState agree, String score) {
        this.seq = seq;
        this.member = member;
        this.group = group;
        this.nickname = nickname;
        this.agree = agree;
        this.score = score;
    }
}
