package com.ssafy.shallwemeetthen.domain.groupboard.repository;

import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface GroupBoardRepository extends JpaRepository<GroupBoard, Long> {
    //groupBoard에서 seq를 받아오는 쿼리
//    @Query("select count(gb.seq) from GroupBoard gb where gb.groupMember.seq in (select gm.seq from GroupMember gm where gm.group.seq = :groupSeq)")
//    int findAllCount(@Param("groupSeq") Long groupSeq);
}
