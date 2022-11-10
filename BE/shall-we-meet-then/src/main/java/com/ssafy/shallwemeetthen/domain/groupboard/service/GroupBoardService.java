package com.ssafy.shallwemeetthen.domain.groupboard.service;

import com.ssafy.shallwemeetthen.common.security.SecurityContext;
import com.ssafy.shallwemeetthen.common.utils.MultipartFileUtils;
import com.ssafy.shallwemeetthen.common.utils.S3Utils;
import com.ssafy.shallwemeetthen.domain.groupboard.dto.*;
import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import com.ssafy.shallwemeetthen.domain.groupboard.exception.EmptyFileException;
import com.ssafy.shallwemeetthen.domain.groupboard.exception.EmptyTotalCountException;
import com.ssafy.shallwemeetthen.domain.groupboard.repository.GroupBoardQueryRepository;
import com.ssafy.shallwemeetthen.domain.groupboard.repository.GroupBoardRepository;
import com.ssafy.shallwemeetthen.domain.groupboardimage.entity.GroupBoardImage;
import com.ssafy.shallwemeetthen.domain.groupboardimage.repository.GroupBoardImageRepository;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import com.ssafy.shallwemeetthen.domain.groupmember.repository.GroupMemberRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.StringUtils;
import org.springframework.core.io.Resource;
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

    private final SecurityContext securityContext;

    private final S3Utils s3Utils;

    public boolean addGroupBoard(AddArticleDto.Request dto) throws IOException {

        Long loginSeq = securityContext.getThreadLocal();

        GroupMember groupMember = groupMemberRepository.findByGroupSeqAndMemberSeq(dto.getGroupSeq(), loginSeq).orElseThrow(() -> new IllegalArgumentException("해당 그룹에 참여한 멤버가 아닙니다."));

        MultipartFile image = dto.getImage().get(0);
        MultipartFile video = dto.getVideo();

        String content = dto.getContent();

        String imageUuidFileName =
                StringUtils.equals(image.getOriginalFilename(), "") | StringUtils.equals(image.getOriginalFilename(), "blob")
                        ? null : uploadFile(image);
        String videoUuidFileName = StringUtils.equals(video.getOriginalFilename(), "") ? null : uploadFile(video);

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
            if (StringUtils.equals(multipartFile.getOriginalFilename(), "")) break;
            if (StringUtils.equals(multipartFile.getOriginalFilename(), "blob")) break;

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
    public ArticleDetailResponseDto getArticle(Long boardSeq) {
        GroupBoard groupBoard = groupBoardRepository.findById(boardSeq).orElseThrow(() -> new IllegalArgumentException("해당 SEQ의 게시글이 없습니다."));

        List<Integer> imageSeqs = groupBoardImageRepository.findSeqsByBoardSeq(boardSeq);

        return new ArticleDetailResponseDto(groupBoard, imageSeqs);
    }

    @Transactional(readOnly = true)
    public Resource getVideoFile(Long boardSeq) {
        GroupBoard groupBoard = groupBoardRepository.findById(boardSeq).orElseThrow(() -> new IllegalArgumentException("해당 SEQ의 게시글이 없습니다."));

        String videoUuidName = groupBoard.getVideoUuidName();

        if (videoUuidName == null) throw new EmptyFileException("비디오 파일이 존재하지 않습니다.");

        return s3Utils.download("video", videoUuidName);
    }

    @Transactional(readOnly = true)
    public Resource getImageFile(Long boardSeq) {
        GroupBoard groupBoard = groupBoardRepository.findById(boardSeq).orElseThrow(() -> new IllegalArgumentException("해당 SEQ의 게시글이 없습니다."));

        String thumbnailImageUuidName = groupBoard.getThumbnailImageUuidName();

        if (thumbnailImageUuidName == null) throw new EmptyFileException("이미지 파일이 존재하지 않습니다.");

        return s3Utils.download("image", thumbnailImageUuidName);
    }

    @Transactional(readOnly = true)
    public GetCountDto.Response getArticleCount(GetCountDto.Request dto) {
        Long loginSeq = securityContext.getThreadLocal();

        Long count = groupBoardRepository.findCountByGroupSeqAndMemberSeq(dto.getGroupSeq(), loginSeq);

        return new GetCountDto.Response(count);
    }

    @Transactional(readOnly = true)
    public List<GetTotalCountResponseDto> getTotalCount(GetTotalCountRequestDto dto) {
        List<GetTotalCountResponseDto> dtos = groupBoardRepository.findGetTotalCountDto(dto.getGroupSeq());

        if (dtos.get(0).getGroupMemberSeq() == null) throw new EmptyTotalCountException("그룹에 작성된 게시글이 없습니다.");

        return dtos;
    }

    private String uploadFile(MultipartFile multipartFile) throws IOException {

        MultipartFileUtils utils = new MultipartFileUtils(multipartFile);

        File file = utils.convertToFile().orElseThrow(() -> new IllegalArgumentException("잘못된 파일입니다."));

        s3Utils.upload(file, utils.getFileType(), utils.getUuidFileName());

        return utils.getUuidFileName();
    }

}
