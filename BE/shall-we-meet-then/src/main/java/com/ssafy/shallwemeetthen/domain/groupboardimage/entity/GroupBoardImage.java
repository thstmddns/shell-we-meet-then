package com.ssafy.shallwemeetthen.domain.groupboardimage.entity;

import com.ssafy.shallwemeetthen.common.entity.BaseEntity;
import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupBoardImage extends BaseEntity {

    @Id @GeneratedValue
    @Column(name = "gbi_seq", nullable = false)
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gb_seq", nullable = false)
    private GroupBoard groupBoard;

    @Column(name = "gbi_image_origin_name", nullable = false, length = 50)
    private String imageOriginName;

    @Column(name = "gbi_image_uuid_name", nullable = false, length = 50)
    private String imageUuidName;

    @Builder
    public GroupBoardImage(GroupBoard groupBoard, String imageOriginName, String imageUuidName) {
        this.groupBoard = groupBoard;
        this.imageOriginName = imageOriginName;
        this.imageUuidName = imageUuidName;
    }
}
