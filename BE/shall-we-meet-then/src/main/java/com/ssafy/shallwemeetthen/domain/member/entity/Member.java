package com.ssafy.shallwemeetthen.domain.member.entity;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id @GeneratedValue
    @Column(name = "mem_seq", nullable = false)
    private Long seq;

    @Column(name = "mem_email", nullable = false, length = 20)
    private String email;

    @Column(name = "mem_password", nullable = false, length = 100)
    private String password;

    @Builder
    public Member(String email, String password) {
        this.email = email;
        this.password = password;
    }

}
