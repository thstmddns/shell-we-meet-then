package com.ssafy.shallwemeetthen.domain.member.service;

import com.ssafy.shallwemeetthen.common.security.AuthTokenProvider;
import com.ssafy.shallwemeetthen.common.security.JwtProperties;
import com.ssafy.shallwemeetthen.common.security.filter.AuthToken;
import com.ssafy.shallwemeetthen.common.utils.MailUtils;
import com.ssafy.shallwemeetthen.common.utils.RedisUtil;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberEmailCheckRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberEmailRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberFindPasswordRequestDto;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import com.ssafy.shallwemeetthen.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;




@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class MemberGetService {

    private final MemberRepository memberRepository;

    private final RedisUtil redisUtil;

    private final MailUtils mailUtils;

    private static final int EXPIRYMINUTE = 5;

    private final AuthTokenProvider provider;


    public boolean authenticateEmail(MemberEmailRequestDto dto){
        //랜덤 UUID 생성
        String uuid = UUID.randomUUID().toString();
        //레디스에 랜덤 UUID 저장 (키 : 랜덤값 / 밸류 : 이메일 / 만료일자)
        try {
            redisUtil.setDataExpire(uuid, dto.getEmail(),EXPIRYMINUTE);
        } catch (IllegalStateException e) {
            throw new IllegalStateException("캐시 데이터 저장소에 저장되지 않았습니다. Email 전송부터 다시 진행해 주세요.");
        }

        String subject = "우리 그때 만나? 의 인증코드를 확인해 주세요";
        mailUtils.sendMail(dto.getEmail(), subject, uuid);

        return true;
    }

    public boolean checkAuthenticatedEmail(MemberEmailCheckRequestDto dto){

        if(redisUtil.getData(dto.getCode())== null) throw new IllegalStateException("잘못된 코드이거나 유효 기간이 지났습니다");
        return true;
    }

    public boolean checkDuplicatedEmail(MemberEmailRequestDto dto){
        return memberRepository.existsByEmail(dto.getEmail());
    }

    public boolean findPassword(MemberFindPasswordRequestDto dto) {
        // 가입한 회원이 맞는지 체크
        if(!memberRepository.existsByEmail(dto.getEmail())) throw new IllegalStateException("존재하지 않는 Email 입니다.");

        // UUID 만들기
        String uuid = UUID.randomUUID().toString();
        // 이메일 - UUID 를 래디스에 해쉬로 저장
        try {
            redisUtil.setData(dto.getEmail(),uuid);
        } catch (IllegalStateException e) {
            throw new IllegalStateException("캐시 데이터 저장소에 저장되지 않았습니다. Email 전송부터 다시 진행해 주세요.");
        }

        String subject = "우리 그때 만나? 의 비밀번호 변경 링크입니다.";
        String text = "https://www.shallwemeetthen.com/new-password/"+uuid;
        mailUtils.sendMail(dto.getEmail(),subject,text);

        return true;
    }

    public AuthToken getAccessToken(MemberEmailRequestDto dto) {
        Member loginMember = memberRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new IllegalArgumentException("이메일이 틀립니다."));
        return provider.createAuthToken(String.valueOf(loginMember.getSeq()), new Date(System.currentTimeMillis() + JwtProperties.ACCESS_EXPIRED_TIME));
    }
}
