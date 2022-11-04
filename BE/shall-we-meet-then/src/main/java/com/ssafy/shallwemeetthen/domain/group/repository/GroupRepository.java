package com.ssafy.shallwemeetthen.domain.group.repository;


import com.ssafy.shallwemeetthen.domain.group.dto.GetGroupListResponseDto;
import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GroupRepository extends JpaRepository<Groups, Long> {
    @Query("""
    select new com.ssafy.shallwemeetthen.domain.group.dto.GetGroupListResponseDto(g.seq, g.name, g.invitationCode, g.openDateTime, g.headcount, g.createDate, gm.agree)
    from GroupMember gm
    inner join gm.group g
    where gm.member.seq = :memberSeq
    """)
    List<GetGroupListResponseDto> findAllList(@Param("memberSeq") Long memberSeq);

    Optional<Groups> findByInvitationCode(String invitationCode);
}