package com.ssafy.shallwemeetthen.domain.member.controller;


import com.ssafy.shallwemeetthen.domain.member.RedisUtil;
import com.ssafy.shallwemeetthen.domain.member.dto.*;
import com.ssafy.shallwemeetthen.domain.member.service.MemberAddService;
import com.ssafy.shallwemeetthen.domain.member.service.MemberGetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Controller
@RequestMapping("/members")
@Slf4j
@RequiredArgsConstructor
public class MemberGetController {

    private final MemberGetService memberGetService;


    @GetMapping("/auth/email")
    public ResponseEntity<?> authenticateEmail(@RequestBody @Validated MemberEmailRequestDto dto){
        try {
            return new ResponseEntity<>(memberGetService.authenticateEmail(dto),HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/auth/check-email")
    public ResponseEntity<?> checkAuthenticatedEmail(@RequestBody MemberEmailCheckRequestDto dto){
        try {
            return new ResponseEntity<>(memberGetService.checkAuthenticatedEmail(dto),HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkDuplicatedEmail(@RequestBody MemberEmailRequestDto dto){
            return new ResponseEntity<>(memberGetService.checkDuplicatedEmail(dto),HttpStatus.OK);
    }

    @GetMapping("/password")
    public ResponseEntity<?> findPassword(@RequestBody MemberFindPasswordRequestDto dto){
        return new ResponseEntity<>(memberGetService.findPassword(dto),HttpStatus.OK);
    }


}
