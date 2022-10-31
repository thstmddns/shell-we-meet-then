package com.ssafy.shallwemeetthen.domain.member.service;

import com.ssafy.shallwemeetthen.domain.member.dto.MemberJoinRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberLoginRequestDto;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import com.ssafy.shallwemeetthen.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.mindrot.jbcrypt.BCrypt;
@Service
@Transactional
@RequiredArgsConstructor
public class MemberAddService {

    private final MemberRepository memberRepository;


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


    public boolean login(MemberLoginRequestDto dto) {
        //아이디 체크
        if(!memberRepository.existsByEmail(dto.getEmail())) return false;

        //비밀번호가 같은지 체크
        String pw = memberRepository.findByEmail(dto.getEmail()).get().getPassword();
        if(!BCrypt.checkpw(dto.getPassword(),pw)) return false;

        return true;
    }
}