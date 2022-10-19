package com.ssafy.shallwemeetthen.domain.member.repository;

import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
