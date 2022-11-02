package com.ssafy.shallwemeetthen.domain.group.controller;


import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupRequestDto;
import com.ssafy.shallwemeetthen.domain.group.service.GroupAddService;
import com.ssafy.shallwemeetthen.domain.group.service.GroupGetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/groups")
@RestController
@RequiredArgsConstructor
public class GroupController {

    private final GroupAddService groupAddService;
    private final GroupGetService groupGetService;

    //그룸생성
    @PostMapping
    public ResponseEntity<?> addGroup(@RequestBody AddGroupRequestDto addGroupRequestDto) {
        return new ResponseEntity<>(groupAddService.addGroup(addGroupRequestDto), HttpStatus.OK);
    }
    //그룹 리스트 조회
//    @GetMapping
//    public ResponseEntity<?> getGroups() {
//        return new ResponseEntity<>(groupGetService.getGroup(), HttpStatus.OK);
//    }
//
    //그룹 내 총 게시글 개수
//    @GetMapping("/{groupSeq}/count")
//    public ResponseEntity<?> getTotalArticleCount() {
//        return new ResponseEntity<>(groupGetService.getTotalArticleCount(), HttpStatus.OK);
//    }

    //그룹 상세 조회
    @GetMapping("/{groupSeq}")
    public ResponseEntity<?> getGroupDetails(@PathVariable Long groupSeq) {
        return new ResponseEntity<>(groupGetService.getGroupDetails(groupSeq), HttpStatus.OK);
    }

    //그룹 열람가능 여부
    @GetMapping("/{groupSeq}/check-open")
    public ResponseEntity<?> checkGroupOpen(@PathVariable Long groupSeq) {
        return new ResponseEntity<>(groupGetService.checkGroupOpen(groupSeq), HttpStatus.OK);
    }
 }

