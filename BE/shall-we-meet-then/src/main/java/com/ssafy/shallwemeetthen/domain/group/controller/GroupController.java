package com.ssafy.shallwemeetthen.domain.group.controller;


import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupRequestDto;
import com.ssafy.shallwemeetthen.domain.group.service.GroupAddService;
import com.ssafy.shallwemeetthen.domain.group.service.GroupGetService;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.GetGroupMemberListRequestDto;
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
    @GetMapping
    public ResponseEntity<?> getGroups(@ModelAttribute GetGroupMemberListRequestDto dto) {
        return new ResponseEntity<>(groupGetService.getGroup(dto), HttpStatus.OK);
    }
//
    @GetMapping("/{groupSeq}/count")
    public ResponseEntity<?> getTotalArticleCount(@PathVariable Long groupSeq) {
        return new ResponseEntity<>(groupGetService.getTotalArticleCount(groupSeq), HttpStatus.OK);
    }

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


    //마지막 게시글 작성자 조회
    @GetMapping("/{groupSeq}/last-author")
    public ResponseEntity<?> getLastAuthor(@PathVariable Long groupSeq) {
        return new ResponseEntity<>(groupGetService.getLastAuthor(groupSeq), HttpStatus.OK);
    }

    //가장 글을 많이 작성한 멤버
    @GetMapping("/{groupSeq}/most-written-member")
    public ResponseEntity<?> getManyWrittenMember(@PathVariable Long groupSeq) {
        return new ResponseEntity<>(groupGetService.getManyWrittenMember(groupSeq), HttpStatus.OK);
    }

//    //가장 길게 글을 작성한 멤버 조회
//    @GetMapping("/{groupSeq}/longest-written-member")
//    public ResponseEntity<?> getLongestWrittenMember(@PathVariable Long groupSeq) {
//        return new ResponseEntity<>(groupGetService.getLongestWrittenMember(groupSeq), HttpStatus.OK);
//    }
}