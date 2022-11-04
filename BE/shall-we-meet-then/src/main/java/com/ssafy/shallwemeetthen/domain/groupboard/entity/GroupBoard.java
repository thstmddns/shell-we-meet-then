package com.ssafy.shallwemeetthen.domain.groupboard.entity;

import com.ssafy.shallwemeetthen.common.entity.BaseEntity;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GroupBoard extends BaseEntity {

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

    @Builder
    public GroupBoard(Long seq, GroupMember groupMember, String content, String videoOriginName, String videoUuidName, String thumbnailImageOriginName, String thumbnailImageUuidName, int length) {
        this.seq = seq;
        this.groupMember = groupMember;
        this.content = content;
        this.videoOriginName = videoOriginName;
        this.videoUuidName = videoUuidName;
        this.thumbnailImageOriginName = thumbnailImageOriginName;
        this.thumbnailImageUuidName = thumbnailImageUuidName;
        this.length = length;
    }
}
