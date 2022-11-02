package com.ssafy.shallwemeetthen.domain.groupboardimage.controller;

import com.ssafy.shallwemeetthen.domain.groupboardimage.service.GroupBoardImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board-image")
public class GroupBoardImageController {

    private final GroupBoardImageService groupBoardImageService;

    @GetMapping(value = "/{boardImageSeq}/file-download", produces = "application/octet-stream")
    public ResponseEntity<?> getImageFile(@PathVariable("boardImageSeq") Long boardImageSeq) {
        try {
            return new ResponseEntity<>(groupBoardImageService.getImageFile(boardImageSeq), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
