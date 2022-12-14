package com.ssafy.shallwemeetthen.domain.groupmember.entity;


import com.ssafy.shallwemeetthen.common.entity.BaseEntity;
import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupMember extends BaseEntity {

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

    @Enumerated(EnumType.STRING)
    @Column(name = "gm_agree", nullable = false, length = 1)
    private AgreeState agree;

    @Column(name = "gm_score", nullable = false)
    private int score;

    @Builder
    public GroupMember(Long seq, Member member, Groups group, String nickname, AgreeState agree, int score) {
        this.seq = seq;
        this.member = member;
        this.group = group;
        this.nickname = nickname;
        this.agree = agree;
        this.score = score;
    }

    public void open() {
        agree = AgreeState.Y;
    }

    public void updateScore(int score) {
        this.score = score;
    }
}
