package com.ssafy.shallwemeetthen.domain.quiz.service;

import com.ssafy.shallwemeetthen.common.utils.QuizUtils;
import com.ssafy.shallwemeetthen.domain.groupboard.dto.ArticleDto;
import com.ssafy.shallwemeetthen.domain.groupboard.dto.ArticleSearchCondition;
import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import com.ssafy.shallwemeetthen.domain.groupboard.repository.GroupBoardQueryRepository;
import com.ssafy.shallwemeetthen.domain.groupboard.service.GroupBoardService;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberJoinRequestDto;
import com.ssafy.shallwemeetthen.domain.quiz.dto.QuizResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class QuizGetService {

    private final QuizUtils quizUtils;

    private final GroupBoardQueryRepository groupBoardQueryRepository;


    private final int QUIZ_TYPE_NUM = 1;

    public List<QuizResponseDto> quiz(ArticleSearchCondition articleSearchCondition){
        Random random = new Random();
        List<QuizResponseDto> quizList = new ArrayList<>();
        List<GroupBoard> findGroupBoardList = groupBoardQueryRepository.findAllAgreeAndNonAgreeBoard(articleSearchCondition);// 모든 그룹의 글
        log.info(String.valueOf(articleSearchCondition.getGroupSeq()));
        int quizNum = 10;
        if(findGroupBoardList.size()<=10) quizNum = findGroupBoardList.size();
        log.info(String.valueOf("퀴즈수 :"+ quizNum));
        //중복없이 quizNum 개 넣기
        HashSet<Integer> nonOverlapIdxList = new HashSet<>();
        ArrayList<Integer> idxList = new ArrayList<>();
        while(nonOverlapIdxList.size()<quizNum) nonOverlapIdxList.add(random.nextInt(quizNum));
        for (int tmpIdxList:nonOverlapIdxList) idxList.add(tmpIdxList);

        for(int i = 0 ; i < quizNum ; i++){
            int quizType = random.nextInt(QUIZ_TYPE_NUM);
            switch (quizType){
                case 0 :
                    quizList.add(quizUtils.Question2(findGroupBoardList.get(idxList.get(i)).getSeq()));
                    break;
                case 1 :
                    break;
            }
        }
        return quizList;
    }
}
