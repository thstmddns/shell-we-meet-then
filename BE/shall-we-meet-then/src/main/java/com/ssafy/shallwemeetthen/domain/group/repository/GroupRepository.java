package com.ssafy.shallwemeetthen.domain.group.repository;


import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Groups, Long> {
    @Query("select g from Groups g where g.seq in (select gm.group.seq from GroupMember gm where gm.member.seq = :memberSeq)")
    List<Groups> findAllList(@Param("memberSeq") Long memberSeq);

    Optional<Groups> findByInvitationCode(String invitationCode);
}