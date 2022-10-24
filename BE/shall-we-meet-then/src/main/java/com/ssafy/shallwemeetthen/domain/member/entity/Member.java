package com.ssafy.shallwemeetthen.domain.member.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "mem_seq", nullable = false)
    private Long seq;

    @Column(name = "mem_email", nullable = false, length = 20)
    private String email;

    @Column(name = "mem_password", nullable = false, length = 20)
    private String password;
}
