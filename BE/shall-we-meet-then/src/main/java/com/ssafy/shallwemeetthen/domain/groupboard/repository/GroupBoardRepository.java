package com.ssafy.shallwemeetthen.domain.groupboard.repository;

import com.ssafy.shallwemeetthen.domain.groupboard.dto.GetTotalCountResponseDto;
import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupBoardRepository extends JpaRepository<GroupBoard, Long> {

    @Query("""
            select count(gb.seq)
            from GroupBoard gb 
            inner join gb.groupMember gm 
            where gm.group.seq = :groupSeq 
            and gm.member.seq = :memberSeq
            """)
    Long findCountByGroupSeqAndMemberSeq(@Param("groupSeq") Long groupSeq, @Param("memberSeq") Long memberSeq);

    @Query("""
            select new com.ssafy.shallwemeetthen.domain.groupboard.dto.GetTotalCountResponseDto(gm.seq, gm.nickname, count(gb.seq))
            from GroupBoard gb 
            inner join gb.groupMember gm 
            where gm.group.seq = :groupSeq 
            """)
    List<GetTotalCountResponseDto> findGetTotalCountDto(@Param("groupSeq") Long groupSeq);


    @Query("select count(gb.seq) from GroupBoard gb where gb.groupMember.seq in (select gm.seq from GroupMember gm where gm.group.seq = :groupSeq)")
    int findAllCount(@Param("groupSeq") Long groupSeq);
}
