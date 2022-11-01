package com.ssafy.shallwemeetthen.domain.group.service;

import com.ssafy.shallwemeetthen.domain.group.dto.GroupResponseDto;
import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.repository.GroupRepository;
import com.ssafy.shallwemeetthen.domain.groupboard.entity.GroupBoard;
import com.ssafy.shallwemeetthen.domain.groupboard.repository.GroupBoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Transactional
@RequiredArgsConstructor
public class GroupGetService {

    private final GroupRepository groupRepository;
//    private final GroupBoardRepository groupBoardRepository;

//    public List<GroupResponseDto> getGroup() {
////         Todo : member의 값을 임의로 지정했으므로 추후 수정요망
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
}
