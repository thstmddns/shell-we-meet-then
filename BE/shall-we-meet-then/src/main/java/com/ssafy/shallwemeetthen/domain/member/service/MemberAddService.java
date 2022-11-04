package com.ssafy.shallwemeetthen.domain.member.service;

import com.ssafy.shallwemeetthen.common.security.AuthTokenProvider;
import com.ssafy.shallwemeetthen.common.security.JwtProperties;
import com.ssafy.shallwemeetthen.common.security.filter.AuthToken;
import com.ssafy.shallwemeetthen.common.utils.RedisUtil;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberJoinRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberLoginRequestDto;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import com.ssafy.shallwemeetthen.domain.member.exception.PasswordNotMatchException;
import com.ssafy.shallwemeetthen.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MemberAddService {

    private final MemberRepository memberRepository;

    private final AuthTokenProvider provider;

    private final RedisUtil redisUtil;

    public boolean join(MemberJoinRequestDto dto){
        //이메일 중복 처리
        //TODO : existBy~ 에서 발생할 수 있는 에러가 있을까? 그리고 중복 이메일이라고 프론트에 알릴 방법이 없을까?
        if(memberRepository.existsByEmail(dto.getEmail())) throw new IllegalStateException("중복된 이메일이 존재합니다.");

        Member member = Member.builder()
                        .email(dto.getEmail())
                        //bcrypt 해시 함수 사용해서 암호화 (비밀번호 + salt)
                        .password(BCrypt.hashpw(dto.getPassword(),BCrypt.gensalt()))
                        .build();

        memberRepository.save(member);

        return true;
    }


    public Map<String, AuthToken> login(MemberLoginRequestDto dto) {
        //아이디 체크
        Member loginMember = memberRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new IllegalArgumentException("이메일이 틀립니다."));

        //비밀번호가 같은지 체크
        if(!BCrypt.checkpw(dto.getPassword(), loginMember.getPassword())) throw new PasswordNotMatchException("비밀번호가 틀립니다.");

        AuthToken accessToken = provider.createAuthToken(String.valueOf(loginMember.getSeq()), JwtProperties.ACCESS_EXPIRED_TIME);

        AuthToken refreshToken = provider.createAuthToken(JwtProperties.REFRESH_EXPIRED_TIME);

        Map<String, AuthToken> tokenMap = new HashMap<>();

        tokenMap.put("accessToken", accessToken);
        tokenMap.put("refreshToken", refreshToken);

        try {
            redisUtil.setDataExpireToDay(refreshToken.getToken(), String.valueOf(loginMember.getSeq()),10);
            System.out.println("dd");
        } catch (IllegalStateException e) {
            throw new IllegalStateException("캐시 데이터 저장소에 저장되지 않았습니다. Email 전송부터 다시 진행해 주세요.");
        }

        return tokenMap;
    }
}
