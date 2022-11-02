package com.ssafy.shallwemeetthen.domain.groupmember.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGroupMember is a Querydsl query type for GroupMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupMember extends EntityPathBase<GroupMember> {

    private static final long serialVersionUID = -257864682L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGroupMember groupMember = new QGroupMember("groupMember");

    public final EnumPath<com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState> agree = createEnum("agree", com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState.class);

    public final com.ssafy.shallwemeetthen.domain.group.entity.QGroups group;

    public final com.ssafy.shallwemeetthen.domain.member.entity.QMember member;

    public final StringPath nickname = createString("nickname");

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public QGroupMember(String variable) {
        this(GroupMember.class, forVariable(variable), INITS);
    }

    public QGroupMember(Path<? extends GroupMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGroupMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGroupMember(PathMetadata metadata, PathInits inits) {
        this(GroupMember.class, metadata, inits);
    }

    public QGroupMember(Class<? extends GroupMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.group = inits.isInitialized("group") ? new com.ssafy.shallwemeetthen.domain.group.entity.QGroups(forProperty("group")) : null;
        this.member = inits.isInitialized("member") ? new com.ssafy.shallwemeetthen.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

