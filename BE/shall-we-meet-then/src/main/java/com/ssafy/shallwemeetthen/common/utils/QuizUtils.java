package com.ssafy.shallwemeetthen.common.utils;

import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import com.ssafy.shallwemeetthen.domain.groupboard.repository.GroupBoardRepository;
import com.ssafy.shallwemeetthen.domain.groupmember.dto.GetGroupMembersDto;
import com.ssafy.shallwemeetthen.domain.groupmember.entity.GroupMember;
import com.ssafy.shallwemeetthen.domain.groupmember.repository.GroupMemberQueryRepository;
import com.ssafy.shallwemeetthen.domain.groupmember.repository.GroupMemberRepository;
import com.ssafy.shallwemeetthen.domain.quiz.dto.QuizResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.*;

@RequiredArgsConstructor
@Component
public class QuizUtils {

    private final GroupBoardRepository groupBoardRepository;

    private final GroupMemberRepository groupMemberRepository;

    private final GroupMemberQueryRepository groupMemberQueryRepository;


    //작성한 글이 어느 그룹원의 게시글일지
 //   private QuizResponseDto Question1(Long groupBoardSeq){
//        GroupBoard findboard = groupBoardRepository.findById(groupBoardSeq).orElseThrow(() -> new IllegalArgumentException("그룹Seq가 잘못되었습니다."));
//
//        List<GroupMember> groupMember = GroupMemberQueryRepository.getGroupMembers(new GetGroupMembersDto.Request);
//        HashSet<Integer> nonOverlapMonth = new HashSet<>();
//        ArrayList<Integer> month = new ArrayList<>();
//        Random random = new Random();
//        int maxSize = groupMember.size();
//
//
//        while(month.size()<=3) month.add(random.nextInt(12)+1);
//        for (int tmpmonth:nonOverlapMonth) month.add(tmpmonth);
//        month.add(findboard.getCreateDate().getMonthValue());
//        Collections.sort(month);
//
//        //그룹멤버중 중복빼서 넣어야함
//        QuizResponseDto quizResponseDto = QuizResponseDto.builder()
//                .question(findboard.getContent()) // 작성글
//                .answer1()// 그룹멤버 1
//                .answer2() // 그룹멤버 2
//                .answer3() // 그룹멤버 3
//                .answer4() // 그룹멤버 4
//                .build();
//        return quizResponseDto;
//    }
    //작성한 글이 몇 월에 작성한 글인지
    public QuizResponseDto Question2(Long groupBoardSeq) {
        GroupBoard findboard = groupBoardRepository.findById(groupBoardSeq).orElseThrow(() -> new IllegalArgumentException("그룹Seq가 잘못되었습니다."));

        Random random = new Random();
        HashSet<Integer> nonOverlapMonth = new HashSet<>();
        ArrayList<Integer> month = new ArrayList<>();

        while(month.size()<=3) month.add(random.nextInt(12)+1);
        for (int tmpmonth:nonOverlapMonth) month.add(tmpmonth);
        month.add(findboard.getCreateDate().getMonthValue());
        Collections.sort(month);

        boolean flag = false; // 사진이 있는지 체크하는 flag
        long boardSeq = -1;
        if(findboard.getThumbnailImageOriginName() != null) {
            flag = true;
            boardSeq = findboard.getSeq();
        }

        QuizResponseDto quizResponseDto = QuizResponseDto.builder()
                .question(findboard.getContent()) // 작성글
                .correctAnswer(String.valueOf(findboard.getCreateDate().getMonthValue()))
                .answer1(String.valueOf(month.get(0))) // 월1
                .answer2(String.valueOf(month.get(1))) // 월2
                .answer3(String.valueOf(month.get(2))) // 월3
                .answer4(String.valueOf(month.get(3))) // 월4
                .existPicture(String.valueOf(flag))
                .boardSeq(String.valueOf(boardSeq))
                .build();

        return quizResponseDto;

    }
}

