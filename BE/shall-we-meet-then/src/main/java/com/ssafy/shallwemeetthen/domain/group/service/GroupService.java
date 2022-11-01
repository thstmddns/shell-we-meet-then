package com.ssafy.shallwemeetthen.domain.group.service;


import com.ssafy.shallwemeetthen.common.utils.RedisUtil;
import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupRequestDto;
import com.ssafy.shallwemeetthen.domain.group.dto.GroupResponseDto;
import com.ssafy.shallwemeetthen.domain.group.entity.Groups;
import com.ssafy.shallwemeetthen.domain.group.repository.GroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.UUID;

import static com.ssafy.shallwemeetthen.domain.group.entity.enumerate.AgreeState.N;

@Service
@Transactional
@RequiredArgsConstructor
public class


GroupService {
    private final GroupRepository groupRepository;
    private final RedisUtil redisUtil;

    private final int EXPIRYDAY = 3;
    public GroupResponseDto addGroup(AddGroupRequestDto addgrouprequestDto) {

        String invitationCode = UUID.randomUUID().toString();
        Groups groups = Groups.builder()
                .name(addgrouprequestDto.getName())
                .invitationCode(invitationCode)
                .openDateTime(addgrouprequestDto.getOpenDateTime())
                .headcount(0)
                .agree(N)
                .build();


        String groupSeq = Long.toString(addgrouprequestDto.getSeq());
//      레디스에 초대코드 작성 (키 : 그룹 시퀀스 / 밸류: 초대코드 / 만료일자(일))

        try {
            redisUtil.setDataExpireToDay(groupSeq, invitationCode, EXPIRYDAY);
        } catch (IllegalStateException f) {
            throw new IllegalStateException("캐시 데이터 저장소에 저장되지 않았습니다. 초대코드를 다시 생성해주세요");
        }




        groupRepository.save(groups);


        return new GroupResponseDto(groups);
    }

}