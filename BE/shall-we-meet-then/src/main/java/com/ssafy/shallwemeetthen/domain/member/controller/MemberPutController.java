package com.ssafy.shallwemeetthen.domain.member.controller;


import com.ssafy.shallwemeetthen.domain.member.dto.MemberJoinRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberLoginRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberModifyPasswordRequestDto;
import com.ssafy.shallwemeetthen.domain.member.service.MemberAddService;
import com.ssafy.shallwemeetthen.domain.member.service.MemberPutService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Controller
@RequestMapping("/members")
@Slf4j
@RequiredArgsConstructor
public class MemberPutController {

    private final MemberPutService memberPutService;

    @PutMapping("/password")
    public ResponseEntity<?> modifyPassword(@RequestBody @Valid MemberModifyPasswordRequestDto dto){
            return new ResponseEntity<>(memberPutService.modifyPassword(dto), HttpStatus.OK);
    }
}
