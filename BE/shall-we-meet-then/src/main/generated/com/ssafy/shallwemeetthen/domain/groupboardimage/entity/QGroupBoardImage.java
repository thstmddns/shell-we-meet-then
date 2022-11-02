package com.ssafy.shallwemeetthen.domain.groupboardimage.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QGroupBoardImage is a Querydsl query type for GroupBoardImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupBoardImage extends EntityPathBase<GroupBoardImage> {

    private static final long serialVersionUID = -2050898538L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QGroupBoardImage groupBoardImage = new QGroupBoardImage("groupBoardImage");

    public final com.ssafy.shallwemeetthen.domain.groupboard.entity.QGroupBoard groupBoard;

    public final StringPath imageOriginName = createString("imageOriginName");

    public final StringPath imageUuidName = createString("imageUuidName");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public QGroupBoardImage(String variable) {
        this(GroupBoardImage.class, forVariable(variable), INITS);
    }

    public QGroupBoardImage(Path<? extends GroupBoardImage> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QGroupBoardImage(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QGroupBoardImage(PathMetadata metadata, PathInits inits) {
        this(GroupBoardImage.class, metadata, inits);
    }

    public QGroupBoardImage(Class<? extends GroupBoardImage> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.groupBoard = inits.isInitialized("groupBoard") ? new com.ssafy.shallwemeetthen.domain.groupboard.entity.QGroupBoard(forProperty("groupBoard"), inits.get("groupBoard")) : null;
    }

}

