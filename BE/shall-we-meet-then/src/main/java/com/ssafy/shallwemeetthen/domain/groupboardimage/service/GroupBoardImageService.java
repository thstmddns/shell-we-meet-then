package com.ssafy.shallwemeetthen.domain.groupboardimage.service;

import com.ssafy.shallwemeetthen.common.utils.S3Utils;
import com.ssafy.shallwemeetthen.domain.groupboard.repository.GroupBoardRepository;
import com.ssafy.shallwemeetthen.domain.groupboardimage.entity.GroupBoardImage;
import com.ssafy.shallwemeetthen.domain.groupboardimage.repository.GroupBoardImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class GroupBoardImageService {

    private final GroupBoardImageRepository groupBoardImageRepository;

    private final S3Utils s3Utils;

    public Resource getImageFile(Long boardImageSeq) {
        GroupBoardImage image = groupBoardImageRepository.findById(boardImageSeq).orElseThrow(() -> new IllegalArgumentException("해당 SEQ의 이미지가 없습니다."));

        return s3Utils.download("image", image.getImageUuidName());
    }
}
