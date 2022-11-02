package com.ssafy.shallwemeetthen.domain.groupboard.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGroupBoard is a Querydsl query type for GroupBoard
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupBoard extends EntityPathBase<GroupBoard> {

    private static final long serialVersionUID = -1058266466L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGroupBoard groupBoard = new QGroupBoard("groupBoard");

    public final StringPath content = createString("content");

    public final com.ssafy.shallwemeetthen.domain.groupmember.entity.QGroupMember groupMember;

    public final NumberPath<Integer> length = createNumber("length", Integer.class);

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath thumbnailImageOriginName = createString("thumbnailImageOriginName");

    public final StringPath thumbnailImageUuidName = createString("thumbnailImageUuidName");

    public final StringPath videoOriginName = createString("videoOriginName");

    public final StringPath videoUuidName = createString("videoUuidName");

    public QGroupBoard(String variable) {
        this(GroupBoard.class, forVariable(variable), INITS);
    }

    public QGroupBoard(Path<? extends GroupBoard> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGroupBoard(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGroupBoard(PathMetadata metadata, PathInits inits) {
        this(GroupBoard.class, metadata, inits);
    }

    public QGroupBoard(Class<? extends GroupBoard> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.groupMember = inits.isInitialized("groupMember") ? new com.ssafy.shallwemeetthen.domain.groupmember.entity.QGroupMember(forProperty("groupMember"), inits.get("groupMember")) : null;
    }

}

