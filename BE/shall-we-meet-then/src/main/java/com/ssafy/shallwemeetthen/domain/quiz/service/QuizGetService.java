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


    private final int QUIZ_TYPE_NUM = 2;

    public List<QuizResponseDto> quiz(ArticleSearchCondition articleSearchCondition){
        Random random = new Random();
        List<QuizResponseDto> quizList = new ArrayList<>();
        List<GroupBoard> findGroupBoardList = groupBoardQueryRepository.findAllAgreeAndNonAgreeBoard(articleSearchCondition);// 모든 그룹의 글

        for(int i = 0 ; i  <findGroupBoardList.size(); i++){
            if(findGroupBoardList.get(i).getThumbnailImageUuidName()==null) findGroupBoardList.remove(i);
        }
        
        int quizNum = 10;
        //게시글 수가 10보다 작다면 게시글 수만큼 넣기
        if(findGroupBoardList.size()<=quizNum) quizNum = findGroupBoardList.size();
        //중복없이 quizNum 개 넣기
        HashSet<Integer> nonOverlapIdxList = new HashSet<>();
        ArrayList<Integer> idxList = new ArrayList<>();
        while(nonOverlapIdxList.size()<quizNum) nonOverlapIdxList.add(random.nextInt(quizNum));
        for (int tmpIdxList:nonOverlapIdxList) idxList.add(tmpIdxList);

        //랜덤으로 퀴즈 선정
        for(int i = 0 ; i < quizNum ; i++){
            int quizType = random.nextInt(QUIZ_TYPE_NUM);

            switch (quizType){
                case 0 :
                    quizList.add(quizUtils.Question2(findGroupBoardList.get(idxList.get(i)).getSeq()));
                    break;
                case 1 :
                    quizList.add(quizUtils.Question1(findGroupBoardList.get(idxList.get(i)).getSeq(),articleSearchCondition.getGroupSeq()));
                    break;
            }
        }
        return quizList;
    }
}
