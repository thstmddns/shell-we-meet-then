package com.ssafy.shallwemeetthen.domain.groupboard.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import com.ssafy.shallwemeetthen.domain.groupboard.dto.ArticleSearchCondition;
import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import javax.persistence.EntityManager;
import java.util.List;

import static com.ssafy.shallwemeetthen.domain.groupboard.entity.QGroupBoard.groupBoard;

@Repository
public class GroupBoardQueryRepository {

    private final JPAQueryFactory query;

    public GroupBoardQueryRepository(EntityManager em) {
        this.query = new JPAQueryFactory(em);
    }

    public List<GroupBoard> findAll(ArticleSearchCondition condition) {
        Long groupSeq = condition.getGroupSeq();

        BooleanBuilder builder = new BooleanBuilder();

        builder.and(groupBoard.groupMember.agree.eq(AgreeState.Y));
        if (!ObjectUtils.isEmpty(groupSeq)) builder.and(groupBoard.groupMember.group.seq.eq(groupSeq));

        return query.select(groupBoard)
                .from(groupBoard)
                .where(builder)
                .fetch();
    }
}
