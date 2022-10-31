package com.ssafy.shallwemeetthen.domain.groupmember.controller;

import com.ssafy.shallwemeetthen.domain.groupmember.dto.AddGroupMemberRequestDto;
import com.ssafy.shallwemeetthen.domain.groupmember.service.GroupMemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
