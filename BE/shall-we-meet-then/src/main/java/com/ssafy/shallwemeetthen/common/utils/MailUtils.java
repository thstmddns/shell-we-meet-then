package com.ssafy.shallwemeetthen.common.utils;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MailUtils {

    private final JavaMailSender emailSender;


    public boolean sendMail(String email, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ssafy7d105@gmail.com"); // 보내는 사람의 이메일
        message.setTo(email); // 받는 사람의 이메일
        message.setSubject(subject); // 제목
        message.setText(text); // 내용
        try {
            emailSender.send(message); //메일 발송
        } catch (MailException e) {
            throw new IllegalStateException("메일 발송에서 에러가 발생했습니다.");
        }
        return true;
    }
}
