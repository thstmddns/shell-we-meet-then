package com.ssafy.shallwemeetthen.domain.groupboard.entity;

import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;

import javax.persistence.*;

@Entity
public class GroupBoard {

    @Id @GeneratedValue
    @Column(name = "gb_seq", nullable = false)
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gm_seq", nullable = false)
    private GroupMember groupMember;

    @Lob
    @Column(name = "gb_content", nullable = false)
    private String content;

    @Column(name = "gb_video_origin_name", nullable = false, length = 50)
    private String videoOriginName;

    @Column(name = "gb_video_uuid_name", nullable = false, length = 50)
    private String videoUuidName;

    @Column(name = "gb_thumbnail_image_origin_name", length = 50)
    private String thumbnailImageOriginName;

    @Column(name = "gb_thumbnail_image_uuid_name", length = 50)
    private String thumbnailImageUuidName;

    @Column(name = "gb_length", nullable = false)
    private int length;
}
