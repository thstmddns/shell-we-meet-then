package com.ssafy.shallwemeetthen.domain.member.service;

import com.ssafy.shallwemeetthen.common.utils.MailUtils;
import com.ssafy.shallwemeetthen.common.utils.RedisUtil;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberEmailCheckRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberEmailRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberFindPasswordRequestDto;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberModifyPasswordRequestDto;
import com.ssafy.shallwemeetthen.domain.member.entity.Member;
import com.ssafy.shallwemeetthen.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;


@Service
@Transactional
@RequiredArgsConstructor
public class MemberPutService {

    private final MemberRepository memberRepository;

    private final RedisUtil redisUtil;

    public boolean modifyPassword(MemberModifyPasswordRequestDto dto){
        //레디스에 있다면
        System.out.println(redisUtil.getData(dto.getEmail()));
        if (redisUtil.getData(dto.getEmail())==null) throw new IllegalStateException("해당 유저는 존재하지 않습니다.");
        if (!redisUtil.getData(dto.getEmail()).equals( dto.getUuid())) throw new IllegalStateException("UUID가 틀렸습니다.");
        dto.setNextPassword(BCrypt.hashpw(dto.getNextPassword(),BCrypt.gensalt()));
        //DB의 비밀번호 정보 바꿈
        Member member = memberRepository.findByEmail(dto.getEmail()).orElseThrow(() -> new IllegalStateException("해당 이메일이 없습니다."));
        member.update(dto);
        //레디스에 있는 값 삭제
        redisUtil.deleteData(dto.getEmail());
        return true;
    }

}
