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

    private final int SELECT_NUM = 4;


   // 작성한 글이 어느 그룹원의 게시글일지
   public QuizResponseDto Question1(Long groupBoardSeq, Long groupSeq){
        //원하는 글을 찾아오기
        GroupBoard findboard = groupBoardRepository.findById(groupBoardSeq).orElseThrow(() -> new IllegalArgumentException("그룹Seq가 잘못되었습니다."));
        //해당 그룹의 모든 멤버 리스트 가져오기
        GetGroupMembersDto.Request dto = new GetGroupMembersDto.Request(groupSeq);
        List<GroupMember> groupMember = groupMemberQueryRepository.getGroupMembers(dto);

        HashSet<String> nonOverlapNames  = new HashSet<>();
        ArrayList<String> Names = new ArrayList<>();
        Random random = new Random();

       //멤버 인원이 4명보다 작다면
        if(groupMember.size() < SELECT_NUM){
            while(nonOverlapNames.size() < groupMember.size()){
                nonOverlapNames.add(groupMember.get(random.nextInt(groupMember.size())).getNickname());
            }
            //그룹 멤버수가 4명이 안된다면 미리 인원 채우기
            String[] tmpMember = {"유정코치님","사라진 이건희","귀신","있으면 안될멤버"};
            int idx = 0;
                while(nonOverlapNames.size() < SELECT_NUM) {
                    nonOverlapNames.add(tmpMember[random.nextInt(tmpMember.length)]);
                }

        }else{
            //남은 인원 중복 없이 채우기
            while(nonOverlapNames.size()<SELECT_NUM-1) nonOverlapNames.add(groupMember.get(random.nextInt(groupMember.size())).getNickname());
            Names.add(findboard.getGroupMember().getNickname());
        }

       for (String tmpName:nonOverlapNames) Names.add(tmpName);

        Collections.shuffle(Names);
       boolean flag = false; // 사진이 있는지 체크하는 flag
        long boardSeq = -1;
        if(findboard.getThumbnailImageOriginName() != null) {
            flag = true;
        }
       boardSeq = findboard.getSeq();
        //그룹멤버중 중복빼서 넣어야함
        QuizResponseDto quizResponseDto = QuizResponseDto.builder()
                .question("이 글을 작성한 멤버는 누구일까요?") // 작성글
                .subject(findboard.getContent())
                .correctAnswer(findboard.getGroupMember().getNickname()) //정답
                .answer1(String.valueOf(Names.get(0))) // 멤버1
                .answer2(String.valueOf(Names.get(1))) // 멤버2
                .answer3(String.valueOf(Names.get(2))) // 멤버3
                .answer4(String.valueOf(Names.get(3))) // 멤버4
                .existPicture(String.valueOf(flag))
                .boardSeq(String.valueOf(boardSeq))
                .build();
        return quizResponseDto;
    }
    //작성한 글이 몇 월에 작성한 글인지
    public QuizResponseDto Question2(Long groupBoardSeq) {
        GroupBoard findboard = groupBoardRepository.findById(groupBoardSeq).orElseThrow(() -> new IllegalArgumentException("그룹Seq가 잘못되었습니다."));

        Random random = new Random();
        HashSet<Integer> nonOverlapMonth = new HashSet<>();
        ArrayList<Integer> month = new ArrayList<>();
        nonOverlapMonth.add(findboard.getCreateDate().getMonthValue());

        while(nonOverlapMonth.size()<SELECT_NUM) nonOverlapMonth.add(random.nextInt(12)+1);
        for (int tmpmonth:nonOverlapMonth) month.add(tmpmonth);

        Collections.shuffle(month);

        boolean flag = false; // 사진이 있는지 체크하는 flag
        long boardSeq = -1;
        if(findboard.getThumbnailImageOriginName() != null) {
            flag = true;

        }
        boardSeq = findboard.getSeq();
        QuizResponseDto quizResponseDto = QuizResponseDto.builder()
                .question("이 글은 몇월에 작성된 글일까요?") //
                .subject(findboard.getContent()) // 작성글
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

