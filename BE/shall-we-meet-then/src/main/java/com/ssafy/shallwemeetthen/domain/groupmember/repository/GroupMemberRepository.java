package com.ssafy.shallwemeetthen.domain.groupmember.repository;

import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupMemberRepository extends JpaRepository<GroupMember, Long> {
}
