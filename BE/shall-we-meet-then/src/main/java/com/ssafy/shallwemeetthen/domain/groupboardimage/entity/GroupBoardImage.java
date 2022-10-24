package com.ssafy.shallwemeetthen.domain.groupboardimage.entity;

import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;

import javax.persistence.*;

@Entity
public class GroupBoardImage {

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
}
