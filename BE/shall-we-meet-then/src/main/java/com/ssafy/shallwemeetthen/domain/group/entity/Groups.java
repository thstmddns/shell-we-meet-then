package com.ssafy.shallwemeetthen.domain.group.entity;

import com.ssafy.shallwemeetthen.common.entity.BaseEntity;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import lombok.*;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Groups extends BaseEntity {


    @Id @GeneratedValue
    @Column(name = "gr_seq", nullable = false)
    private Long seq;


    @Column(name = "gr_name", length = 20, nullable = false)
    private String name;


    @Column(name = "gr_invitation_code", length = 50, nullable = false)
    private String invitationCode;

    @Column(name = "gr_open_date_time", nullable = false)
    private LocalDateTime openDateTime;

    @Column(name = "gr_headcount", nullable = false)
    private int headcount;


    @Enumerated(EnumType.STRING)
    @Column(name = "gr_agree", length = 1, nullable = false)
    private AgreeState agree;

    @Builder
    public Groups(Long seq, String name, String invitationCode, LocalDateTime openDateTime, int headcount, AgreeState agree) {
        this.seq = seq;
        this.name = name;
        this.invitationCode = invitationCode;
        this.openDateTime = openDateTime;
        this.headcount = headcount;
        this.agree = agree;
    }



    public void addHeadCount() {
        headcount += 1;
    }

    public void agree() {
        agree = AgreeState.Y;
    }
}
