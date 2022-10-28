package com.ssafy.shallwemeetthen.domain.group.controller;


import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupRequestDto;
import com.ssafy.shallwemeetthen.domain.group.service.GroupService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequestMapping("/groups")
@RestController
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    //    @PostMapping("/")
//    public ResponseEntity<?> addGroup(@RequestBody AddGroupRequestDto requestDto) {
//        return new ResponseEntity<>(groupService.addGroup(requestDto), HttpStatus.OK);
//    }
    @PostMapping
    public ResponseEntity<?> addGroup(@RequestBody AddGroupRequestDto addGroupRequestDto) {
        return new ResponseEntity<>(groupService.addGroup(addGroupRequestDto), HttpStatus.OK);
    }
}

