package com.ssafy.shallwemeetthen.domain.group.controller;

import com.ssafy.shallwemeetthen.domain.group.dto.AddGroupRequestDto;
import com.ssafy.shallwemeetthen.domain.group.dto.GroupResponseDto;
import com.ssafy.shallwemeetthen.domain.group.service.GroupAddService;
import com.ssafy.shallwemeetthen.domain.group.service.GroupGetService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;

import static com.ssafy.shallwemeetthen.utils.JacksonUtils.convertToJson;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(GroupController.class)
@AutoConfigureMockMvc
@DisplayName("그룹 컨트롤러")
class GroupControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private GroupAddService groupAddService;
    private GroupGetService groupGetService;

    @Test
    public void addGroup() throws Exception {

        AddGroupRequestDto addGroupRequestDto = AddGroupRequestDto.builder()
                .name("럽스타그램")
                .openDateTime(LocalDateTime.of(2020, 2, 3, 4, 10))
                .build();

        //TODO : AddGroupResponseDto 를 리턴하는게 맞을까용?
        given(groupAddService.addGroup(any(AddGroupRequestDto.class))).willReturn(new GroupResponseDto("UUID"));

        ResultActions actions = mockMvc.perform(MockMvcRequestBuilders.post("/")
                .content(convertToJson(addGroupRequestDto))
                .contentType(MediaType.APPLICATION_JSON));


        //then
        verify(groupAddService, times(1)).addGroup(any(AddGroupRequestDto.class));

        actions.andExpect(content().string("true"));
        actions.andExpect(status().isOk());


    }
    @Test
    public void getGroup() throws Exception {
        //given
        GroupResponseDto groupResponseDto = GroupResponseDto.builder()
                .name("thstmddns")
                .invitationCode("dfsfdfsfbklwevslblsk")
                .openDatetime(LocalDateTime.of(2020, 2, 3, 4, 10))
                .headcount(3)
                .agree("Y")
                .build();

        given(groupAddService.addGroup(any(AddGroupRequestDto.class))).willReturn()
        //when
        ResultActions actions = mockMvc.perform(MockMvcRequestBuilders.get("/"))
                .param("memberSeq");
        //then
    }
    @Test
    public void getGroupDetails() throws Exception {
        //given

    }
}