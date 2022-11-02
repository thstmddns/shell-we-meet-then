package com.ssafy.shallwemeetthen.domain.member.controller;


import com.ssafy.shallwemeetthen.domain.member.dto.*;
import com.ssafy.shallwemeetthen.domain.member.service.MemberGetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/members")
@Slf4j
@RequiredArgsConstructor
@CrossOrigin
public class MemberGetController {

    private final MemberGetService memberGetService;


    @GetMapping("/auth/email")
    public ResponseEntity<?> authenticateEmail(@ModelAttribute @Validated MemberEmailRequestDto dto){
        try {
            return new ResponseEntity<>(memberGetService.authenticateEmail(dto),HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/auth/check-email")
    public ResponseEntity<?> checkAuthenticatedEmail(@ModelAttribute MemberEmailCheckRequestDto dto){
        try {
            return new ResponseEntity<>(memberGetService.checkAuthenticatedEmail(dto),HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkDuplicatedEmail(@ModelAttribute MemberEmailRequestDto dto){
        try {
            return new ResponseEntity<>(memberGetService.checkDuplicatedEmail(dto),HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/password")
    public ResponseEntity<?> findPassword(@ModelAttribute MemberFindPasswordRequestDto dto){
        try {
            return new ResponseEntity<>(memberGetService.findPassword(dto),HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }


}
