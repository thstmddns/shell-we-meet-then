package com.ssafy.shallwemeetthen.domain.groupboard.service;

import com.ssafy.shallwemeetthen.common.utils.MultipartFileUtils;
import com.ssafy.shallwemeetthen.common.utils.S3Utils;
import com.ssafy.shallwemeetthen.domain.groupboard.dto.AddArticleDto;
import com.ssafy.shallwemeetthen.domain.groupboard.dto.ArticleDto;
import com.ssafy.shallwemeetthen.domain.groupboard.dto.ArticleSearchCondition;
import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import com.ssafy.shallwemeetthen.domain.groupboard.repository.GroupBoardQueryRepository;
import com.ssafy.shallwemeetthen.domain.groupboard.repository.GroupBoardRepository;
import com.ssafy.shallwemeetthen.domain.groupboardimage.entity.GroupBoardImage;
import com.ssafy.shallwemeetthen.domain.groupboardimage.repository.GroupBoardImageRepository;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import com.ssafy.shallwemeetthen.domain.groupmember.repository.GroupMemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class GroupBoardService {

    private final GroupMemberRepository groupMemberRepository;

    private final GroupBoardRepository groupBoardRepository;

    private final GroupBoardQueryRepository groupBoardQueryRepository;

    private final GroupBoardImageRepository groupBoardImageRepository;

    private final S3Utils s3Utils;

    public boolean addGroupBoard(AddArticleDto.Request dto) throws IOException {

        GroupMember groupMember = groupMemberRepository.findByGroupAndMember(dto.getGroupSeq(), 10000L).orElseThrow(() -> new IllegalArgumentException("해당 그룹에 참여한 멤버가 아닙니다."));

        MultipartFile image = dto.getImage().get(0);
        MultipartFile video = dto.getVideo();

        String content = dto.getContent();

        String imageUuidFileName = uploadFile(image);
        String videoUuidFileName = uploadFile(video);

        GroupBoard groupBoard = GroupBoard.builder()
                .groupMember(groupMember)
                .content(content)
                .length(content.length())
                .thumbnailImageOriginName(image.getOriginalFilename())
                .thumbnailImageUuidName(imageUuidFileName)
                .videoOriginName(video.getOriginalFilename())
                .videoUuidName(videoUuidFileName)
                .build();

        GroupBoard savedGroupBoard = groupBoardRepository.save(groupBoard);

        List<MultipartFile> images = dto.getImage();

        for (MultipartFile multipartFile : images) {
            String fileName;

            if (StringUtils.equals(savedGroupBoard.getThumbnailImageOriginName(), multipartFile.getOriginalFilename())) {
                fileName = savedGroupBoard.getThumbnailImageUuidName();
            } else {
                fileName = uploadFile(multipartFile);
            }

            GroupBoardImage groupBoardImage = GroupBoardImage.builder()
                    .groupBoard(savedGroupBoard)
                    .imageOriginName(multipartFile.getOriginalFilename())
                    .imageUuidName(fileName)
                    .build();

            groupBoardImageRepository.save(groupBoardImage);
        }

        return true;
    }

    @Transactional(readOnly = true)
    public List<ArticleDto.Response> getArticles(ArticleSearchCondition condition) {
        List<GroupBoard> groupBoards = groupBoardQueryRepository.findAll(condition);

        List<ArticleDto.Response> dtos = new ArrayList<>();

        for (GroupBoard groupBoard : groupBoards) {
            dtos.add(new ArticleDto.Response(groupBoard));
        }

        return dtos;
    }

    @Transactional(readOnly = true)
    public ArticleDto.Response getArticle(Long boardSeq) {
        GroupBoard groupBoard = groupBoardRepository.findById(boardSeq).orElseThrow(() -> new IllegalArgumentException("해당 SEQ의 게시글이 없습니다."));

        return new ArticleDto.Response(groupBoard);
    }

    private String uploadFile(MultipartFile multipartFile) throws IOException {

        MultipartFileUtils utils = new MultipartFileUtils(multipartFile);

        File file = utils.convertToFile().orElseThrow(() -> new IllegalArgumentException("잘못된 파일입니다."));

        s3Utils.upload(file, utils.getFileType(), utils.getUuidFileName());

        return utils.getUuidFileName();
    }
}
