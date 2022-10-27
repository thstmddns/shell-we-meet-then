package com.ssafy.shallwemeetthen.domain.member.repository;

import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import org.springframework.boot.context.properties.bind.BindResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail (String email);

    boolean existsByPassword (String password);

    Optional<Member> findByEmail(String email);
}
