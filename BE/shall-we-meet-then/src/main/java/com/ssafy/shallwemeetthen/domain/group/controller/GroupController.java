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

    @PostMapping
    public ResponseEntity<?> addGroup(@RequestBody AddGroupRequestDto addGroupRequestDto) {
        return new ResponseEntity<>(groupAddService.addGroup(addGroupRequestDto), HttpStatus.OK);
    }

//    @GetMapping
//    public ResponseEntity<?> getGroups() {
//        return new ResponseEntity<>(groupGetService.getGroup(), HttpStatus.OK);
//    }
//
//    @GetMapping("/{groupSeq}/count")
//    public ResponseEntity<?> getTotalArticleCount() {
//        return new ResponseEntity<>(groupGetService.getTotalArticleCount(), HttpStatus.OK);
//    }

    @GetMapping("/{groupSeq}")
    public ResponseEntity<?> getGroupDetails(@PathVariable Long groupSeq) {
        return new ResponseEntity<>(groupGetService.getGroupDetails(groupSeq), HttpStatus.OK);
    }

    @GetMapping("/{groupSeq}/check-open")
    public ResponseEntity<?> checkGroupOpen(@PathVariable Long groupSeq) {
        return new ResponseEntity<>(groupGetService.checkGroupOpen(groupSeq), HttpStatus.OK);
    }

    @GetMapping("/zz")
    public ResponseEntity<?> checkGroupOpenApi() {
        groupGetService.checkGroupOpenApi();
        return new ResponseEntity<>("zz", HttpStatus.OK);
    }
 }

