package com.ssafy.shallwemeetthen.domain.groupboardimage.repository;

import com.ssafy.shallwemeetthen.domain.groupboardimage.entity.GroupBoardImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupBoardImageRepository extends JpaRepository<GroupBoardImage, Long> {

    @Query("""
            select gbi.seq
            from GroupBoardImage gbi
            where gbi.groupBoard.seq = :boardSeq
            """)
    List<Integer> findSeqsByBoardSeq(@Param("boardSeq") Long boardSeq);
}
