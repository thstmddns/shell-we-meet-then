package com.ssafy.shallwemeetthen.domain.quiz.service;

import com.ssafy.shallwemeetthen.domain.member.dto.MemberJoinRequestDto;
import com.ssafy.shallwemeetthen.domain.quiz.dto.QuizResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class QuizGetService {

    public List<QuizResponseDto> quiz(){


    }
}
