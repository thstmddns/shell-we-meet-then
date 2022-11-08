package com.ssafy.shallwemeetthen.domain.groupmember.controller;

import com.ssafy.shallwemeetthen.domain.groupmember.dto.*;
import com.ssafy.shallwemeetthen.domain.groupmember.service.GroupMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping(("/group-members"))
@RestController
@RequiredArgsConstructor
public class GroupMemberController {
    private final GroupMemberService groupMemberService;

    @PostMapping
    public ResponseEntity<?> addGroupMember(@RequestBody AddGroupMemberRequestDto addGroupMemberRequestDto) {
        try {
            return new ResponseEntity<>(groupMemberService.addGroupMember(addGroupMemberRequestDto), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/open")
    public ResponseEntity<?> open(@RequestBody OpenDto.Request dto) {
        try {
            return new ResponseEntity<>(groupMemberService.open(dto), HttpStatus.OK);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/score")
    public ResponseEntity<?> getScore(@ModelAttribute GetScoreDto.Request dto) {
        try {
            return new ResponseEntity<>(groupMemberService.getScore(dto), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/score")
    public ResponseEntity<?> addScore(@RequestBody AddScoreDto.Request dto) {
        try {
            return new ResponseEntity<>(groupMemberService.addScore(dto), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<?> checkNickname(@ModelAttribute CheckNicknameDto.Request dto) {
        try {
            return new ResponseEntity<>(groupMemberService.checkNickname(dto), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping
    public ResponseEntity<?> getGroupMembers(@ModelAttribute GetGroupMembersDto.Request dto) {
        return new ResponseEntity<>(groupMemberService.getGroupMembers(dto), HttpStatus.OK);
    }
}
