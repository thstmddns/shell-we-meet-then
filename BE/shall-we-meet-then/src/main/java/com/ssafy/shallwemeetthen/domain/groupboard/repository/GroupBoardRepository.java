package com.ssafy.shallwemeetthen.domain.groupboard.repository;

import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupBoardRepository extends JpaRepository<GroupBoard, Long> {
}
