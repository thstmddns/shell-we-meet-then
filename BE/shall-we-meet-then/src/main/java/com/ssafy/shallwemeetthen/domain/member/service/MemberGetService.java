package com.ssafy.shallwemeetthen.domain.member.service;

import com.ssafy.shallwemeetthen.common.utils.RedisUtil;
import com.ssafy.shallwemeetthen.domain.member.dto.*;
import com.ssafy.shallwemeetthen.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        try {
            redisUtil.setData(dto.getEmail(),uuid);
        } catch (IllegalStateException e) {
            throw new IllegalStateException("캐시 데이터 저장소에 저장되지 않았습니다. Email 전송부터 다시 진행해 주세요.");
        }
        //메일 보내기
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ssafy7d105@gmail.com"); // 보내는 사람의 이메일
        message.setTo(dto.getEmail()); // 받는 사람의 이메일
        message.setSubject("우리 그때 만나? 의 인증코드를 확인해 주세요 "); // 제목
        message.setText(uuid); // 내용
        try {
            emailSender.send(message); //메일 발송
        } catch (MailException e) {
            throw new IllegalStateException("메일 발송에서 에러가 발생했습니다.");
        }


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
        // 메일에 주소 보내기
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ssafy7d105@gmail.com"); // 보내는 사람의 이메일
        message.setTo(dto.getEmail()); // 받는 사람의 이메일
        message.setSubject("우리 그때 만나? 의 비밀번호 변경 링크입니다."); // 제목
        String link = "http://localhost:3000/new-password/"+uuid; // 비밀번호 수정 페이지 링크입니다.
        message.setText(link); // 내용
        try {
            emailSender.send(message); //메일 발송
        } catch (MailException e) {
            throw new IllegalStateException("메일 발송에서 에러가 발생했습니다.");
        }
        return true;
    }
}
