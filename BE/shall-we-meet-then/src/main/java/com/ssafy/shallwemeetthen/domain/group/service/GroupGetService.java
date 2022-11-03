package com.ssafy.shallwemeetthen.domain.group.service;

import com.ssafy.shallwemeetthen.domain.group.dto.GroupResponseDto;
import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState;
import com.ssafy.shallwemeetthen.domain.group.repository.GroupRepository;
import com.ssafy.shallwemeetthen.domain.groupboard.repository.GroupBoardRepository;
import lombok.RequiredArgsConstructor;
import org.joda.time.LocalDate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;


@Service
@Transactional
@RequiredArgsConstructor
public class GroupGetService {

    private final GroupRepository groupRepository;
    private final GroupBoardRepository groupBoardRepository;


    //그룹 리스트 조회
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

    public Map<String, Integer> getTotalArticleCount(Long groupSeq) {
    //Todo groupBoard에서 게시글 엔티티 가져오기

        Map<String, Integer> map = new HashMap<>();

        map.put("totalCount", groupBoardRepository.findAllCount(groupSeq));

        return map;
    }


    //그룹 상세조회
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

    //그룹 열람 여부
    public boolean checkGroupOpen(Long groupSeq) {
        Groups groups = groupRepository.findById(groupSeq).orElseThrow(() -> new IllegalArgumentException("해당 그룹이 없습니다."));

        return groups.getAgree() == AgreeState.Y;
    }

    //그룹 열람가능 체크 API
    @Scheduled(cron = "* * * * * *")
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


