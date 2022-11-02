package com.ssafy.shallwemeetthen.domain.groupboard.controller;

import com.ssafy.shallwemeetthen.domain.groupboard.dto.AddArticleDto;
import com.ssafy.shallwemeetthen.domain.groupboard.dto.ArticleSearchCondition;
import com.ssafy.shallwemeetthen.domain.groupboard.dto.GetCountDto;
import com.ssafy.shallwemeetthen.domain.groupboard.dto.GetTotalCountRequestDto;
import com.ssafy.shallwemeetthen.domain.groupboard.exception.EmptyTotalCountException;
import com.ssafy.shallwemeetthen.domain.groupboard.service.GroupBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/boards")
public class GroupBoardController {

    private final GroupBoardService groupBoardService;

    @PostMapping
    public ResponseEntity<?> addArticle(@ModelAttribute AddArticleDto.Request dto) {
        try {
            return new ResponseEntity<>(groupBoardService.addGroupBoard(dto), HttpStatus.OK);
        } catch (IOException | IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
    }

    @GetMapping
    public ResponseEntity<?> getArticles(@ModelAttribute ArticleSearchCondition condition) {
        return new ResponseEntity<>(groupBoardService.getArticles(condition), HttpStatus.OK);
    }

    @GetMapping("/{boardSeq}")
    public ResponseEntity<?> getArticle(@PathVariable Long boardSeq) {
        try {
            return new ResponseEntity<>(groupBoardService.getArticle(boardSeq), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(value = "/{boardSeq}/video-download", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<?> getVideoFile(@PathVariable Long boardSeq) {
        return new ResponseEntity<>(groupBoardService.getVideoFile(boardSeq), HttpStatus.OK);
    }

    @GetMapping(value = "/{boardSeq}/image-download", produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public ResponseEntity<?> getImageFile(@PathVariable Long boardSeq) {
        return new ResponseEntity<>(groupBoardService.getImageFile(boardSeq), HttpStatus.OK);
    }

    @GetMapping("/count")
    public ResponseEntity<?> getArticleCount(@ModelAttribute GetCountDto.Request dto) {
        return new ResponseEntity<>(groupBoardService.getArticleCount(dto), HttpStatus.OK);
    }

    @GetMapping("/total-count")
    public ResponseEntity<?> getTotalCount(@ModelAttribute GetTotalCountRequestDto dto) {
        try {
            return new ResponseEntity<>(groupBoardService.getTotalCount(dto), HttpStatus.OK);
        } catch (EmptyTotalCountException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
    }
}
