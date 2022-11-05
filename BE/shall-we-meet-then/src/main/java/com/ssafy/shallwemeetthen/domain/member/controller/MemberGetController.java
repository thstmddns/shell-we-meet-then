package com.ssafy.shallwemeetthen.domain.member.controller;


import com.ssafy.shallwemeetthen.common.security.HeaderUtil;
import com.ssafy.shallwemeetthen.common.security.SecurityContext;
import com.ssafy.shallwemeetthen.domain.member.dto.*;
import com.ssafy.shallwemeetthen.domain.member.exception.PasswordNotMatchException;
import com.ssafy.shallwemeetthen.domain.member.service.MemberGetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/members")
@Slf4j
@RequiredArgsConstructor
public class MemberGetController {

    private final MemberGetService memberGetService;

    private final SecurityContext securityContext;


    @GetMapping("/auth/email")
    public ResponseEntity<?> authenticateEmail(@ModelAttribute @Validated MemberEmailRequestDto dto) {
        try {
            return new ResponseEntity<>(memberGetService.authenticateEmail(dto), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/auth/check-email")
    public ResponseEntity<?> checkAuthenticatedEmail(@ModelAttribute MemberEmailCheckRequestDto dto) {
        try {
            return new ResponseEntity<>(memberGetService.checkAuthenticatedEmail(dto), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkDuplicatedEmail(@ModelAttribute MemberEmailRequestDto dto) {
        try {
            Long threadLocal = securityContext.getThreadLocal();

            return new ResponseEntity<>(memberGetService.checkDuplicatedEmail(dto), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/password")
    public ResponseEntity<?> findPassword(@ModelAttribute MemberFindPasswordRequestDto dto) {
        try {
            return new ResponseEntity<>(memberGetService.findPassword(dto), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/access-token")
    public ResponseEntity<?> getAccessToken(@ModelAttribute MemberEmailRequestDto dto, HttpServletResponse response) {
        HeaderUtil.setAccessToken(response, memberGetService.getAccessToken(dto));
        return new ResponseEntity<>(true, HttpStatus.OK);
    }
}
