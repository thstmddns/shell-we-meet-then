package com.ssafy.shallwemeetthen.domain.group.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QGroups is a Querydsl query type for Groups
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroups extends EntityPathBase<Groups> {

    private static final long serialVersionUID = 1896867197L;

    public static final QGroups groups = new QGroups("groups");

    public final EnumPath<com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState> agree = createEnum("agree", com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState.class);

    public final NumberPath<Integer> headcount = createNumber("headcount", Integer.class);

    public final StringPath invitationCode = createString("invitationCode");

    public final StringPath name = createString("name");

    public final DateTimePath<java.time.LocalDateTime> openDateTime = createDateTime("openDateTime", java.time.LocalDateTime.class);

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public QGroups(String variable) {
        super(Groups.class, forVariable(variable));
    }

    public QGroups(Path<? extends Groups> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGroups(PathMetadata metadata) {
        super(Groups.class, metadata);
    }

}

