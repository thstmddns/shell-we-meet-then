package com.ssafy.shallwemeetthen.domain.member.service;

import com.ssafy.shallwemeetthen.domain.member.RedisUtil;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberEmailCheckRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberEmailRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberJoinRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberLoginRequestDto;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import com.ssafy.shallwemeetthen.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.internet.MimeMessage;
import java.util.UUID;




@Service
@Transactional
@RequiredArgsConstructor
public class MemberGetService {

    private final MemberRepository memberRepository;

    private final RedisUtil redisUtil;

    private final JavaMailSender emailSender;

    private static final int EXPIRYMINUTE = 5;

    public boolean authenticateEmail(MemberEmailRequestDto dto){

        //랜덤 UUID 생성
        String uuid = UUID.randomUUID().toString();
        //레디스에 랜덤 UUID 저장 (키 : 랜덤값 / 밸류 : 이메일 / 만료일자)
        redisUtil.setDataExpire(uuid, dto.getEmail(),EXPIRYMINUTE);
        if(redisUtil.getData(uuid)== null) throw new IllegalStateException("인증을 다시 시도해 주세요");
        //메일 보내기
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ssafy7d105@gmail.com"); // 보내는 사람의 이메일
        message.setTo(dto.getEmail()); // 받는 사람의 이메일
        message.setSubject("우리 그때 만나? 의 인증코드를 확인해 주세요 "); // 제목
        message.setText(uuid); // 내용
        emailSender.send(message); //메일 발송

        return true;
    }

    public boolean checkAuthenticatedEmail(MemberEmailCheckRequestDto dto){
        if(redisUtil.getData(dto.getCode())== null) throw new IllegalStateException("잘못된 코드이거나 유효 기간이 지났습니다");
        return true;
    }

    public boolean checkDuplicatedEmail(MemberEmailRequestDto dto){
        return memberRepository.existsByEmail(dto.getEmail());
    }

}
