package com.ssafy.shallwemeetthen.domain.groupmember.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.GetGroupMembersDto;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.GroupMemberDto;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ssafy.shallwemeetthen.domain.groupmember.entity.QGroupMember.groupMember;

@Repository
public class GroupMemberQueryRepository {

    private final JPAQueryFactory query;

    public GroupMemberQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }

    public List<GroupMember> getGroupMembers(GetGroupMembersDto.Request dto) {
        Long groupSeq = dto.getGroupSeq();

        BooleanBuilder builder = new BooleanBuilder();

        if (!ObjectUtils.isEmpty(groupSeq)) builder.and(groupMember.group.seq.eq(groupSeq));

        return query.select(groupMember)
                .from(groupMember)
                .where(builder)
                .fetch();
    }
}
