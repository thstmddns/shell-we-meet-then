package com.ssafy.shallwemeetthen.domain.group.service;

import com.ssafy.shallwemeetthen.domain.group.dto.GroupResponseDto;
import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import com.ssafy.shallwemeetthen.domain.group.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.joda.time.LocalDate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class GroupGetService {

    private final GroupRepository groupRepository;
//    private final GroupBoardRepository groupBoardRepository;

//    public List<GroupResponseDto> getGroup() {
////         Todo : member의 값을 임의로 지정했으므로 추후 수정요망 - getGroup()안에 groupSeq 넣어야 하나요?
//        List<Groups> groups = groupRepository.findAllList(1000L);
//
//        List<GroupResponseDto> dtos = new ArrayList<>();
//        for (Groups group : groups) {
//            dtos.add(new GroupResponseDto(group));
//        }
//        return dtos;
//    }

//    public Map<String, Integer> getTotalArticleCount() {
//    //Todo groupBoard에서 게시글 엔티티 가져오기
//        //왜 Long 타입인데, 빨간 줄일까요.....
//
//        Map<String, Integer> map = new HashMap<>();
//
//        map.put("totalCount", groupBoardRepository.findAllCount(1L));
//
//        return map;
//    }


    public GroupResponseDto getGroupDetails(Long groupSeq) {

        Groups groups = groupRepository.findById(groupSeq).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));

        return new GroupResponseDto(groups);
    }
//    public boolean checkGroupOpen(Long groupSeq) {
//        Groups groups = groupRepository.findById(groupSeq).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다."));
//
//        LocalDateTime openDateTime = groups.getOpenDateTime();
//
//        return openDateTime.compareTo(LocalDateTime.now()) <= 0;
//    }
    public boolean checkGroupOpen(Long groupSeq) {
        Groups groups = groupRepository.findById(groupSeq).orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다."));

        return groups.getAgree() == AgreeState.Y;
    }

    @Scheduled(cron = "0 0 0 * * *")
    public void checkGroupOpenApi() {

        //1. 모든 그룹을 가져온다
        List<Groups> groups = groupRepository.findAll();

        LocalDateTime now = LocalDateTime.now();


        for (Groups group : groups) {

            LocalDateTime openDateTime = group.getOpenDateTime();
            //2. 해당 그룹이 오늘 까도 되는 캡슐인지 체크한다 O
            if (openDateTime.compareTo(now) <= 0) {
                //3. 엔티티 안에서 수정하는 메소드를 만든다. setAgree 하면 안된다.
                //4. 그 메소드를 사용한다
                group.agree();
            }
        }
    }
}


