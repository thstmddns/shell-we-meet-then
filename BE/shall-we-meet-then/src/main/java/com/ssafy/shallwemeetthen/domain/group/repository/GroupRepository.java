package com.ssafy.shallwemeetthen.domain.group.repository;

import com.ssafy.shallwemeetthen.domain.group.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
}
