package com.ssafy.shallwemeetthen.domain.member.service;

import com.ssafy.shallwemeetthen.domain.member.RedisUtil;
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

    //thstmddns@naver.com

    private static final int EXPIRYDATE = 3;

    public boolean authenticateEmail(MemberEmailRequestDto dto){

        //랜덤 UUID 생성
        String uuid = UUID.randomUUID().toString();
        //레디스에 랜덤 UUID 저장 (키 : 랜덤값 / 밸류 : 이메일 / 만료일자)
        //TODO : 여기서 레디스에 저장이 안 되었다면 어떻게 체크하는가
        redisUtil.setDataExpire(uuid, dto.getEmail(),3);

        //메일 보내기
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ssafy7d105@gmail.com"); // 보내는 사람의 이메일
        message.setTo(dto.getEmail()); // 받는 사람의 이메일
        message.setSubject("우리 그때 만나? 의 인증코드를 확인해 주세요 "); // 제목
        message.setText(uuid); // 내용
        emailSender.send(message); //메일 발송

        return true;
    }


}
