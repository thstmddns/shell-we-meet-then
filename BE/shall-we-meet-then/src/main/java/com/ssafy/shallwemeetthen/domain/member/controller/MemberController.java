package com.ssafy.shallwemeetthen.domain.member.controller;



import com.ssafy.shallwemeetthen.common.security.CookieUtil;
import com.ssafy.shallwemeetthen.common.security.HeaderUtil;
import com.ssafy.shallwemeetthen.common.security.JwtProperties;
import com.ssafy.shallwemeetthen.common.security.filter.AuthToken;
import com.ssafy.shallwemeetthen.common.utils.RedisUtil;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberJoinRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberLoginRequestDto;
import com.ssafy.shallwemeetthen.domain.member.exception.PasswordNotMatchException;
import com.ssafy.shallwemeetthen.domain.member.service.MemberAddService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Map;

@Controller
@RequestMapping("/members")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberAddService memberAddService;



    @PostMapping("/join")
    public ResponseEntity<?> join(@RequestBody @Validated MemberJoinRequestDto dto){
        try {
            return new ResponseEntity<>(memberAddService.join(dto), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // 서블릿을 직접 서비스에서 사용하는 방식은 좋은 방식은 아니다.
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid MemberLoginRequestDto dto, HttpServletResponse response){
        try {
            Map<String, AuthToken> tokenMap = memberAddService.login(dto);
            AuthToken accessToken = tokenMap.get("accessToken");
            AuthToken refreshToken = tokenMap.get("refreshToken");

            HeaderUtil.setAccessToken(response, accessToken);
            CookieUtil.addCookie(response, JwtProperties.REFRESH_TOKEN, String.valueOf(refreshToken), JwtProperties.MONTH);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (IllegalArgumentException | PasswordNotMatchException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
    }
}
