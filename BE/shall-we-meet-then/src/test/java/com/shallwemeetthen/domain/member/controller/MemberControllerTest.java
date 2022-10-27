package com.shallwemeetthen.domain.member.controller;

import com.ssafy.shallwemeetthen.domain.member.controller.MemberController;
import com.ssafy.shallwemeetthen.domain.member.dto.MemberJoinRequestDto;
import com.ssafy.shallwemeetthen.domain.member.service.MemberAddService;

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

import static com.shallwemeetthen.utils.JacksonUtil.convertToJson;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MemberController.class)
@AutoConfigureMockMvc
@DisplayName("멤버 컨트롤러 단위 테스트")
public class MemberControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MemberAddService memberAddService;

    @Test
    @DisplayName("[멤버 등록] 사용자는 멤버를 등록할 수 있어야 한다.")
    void join() throws Exception {
        //given : 가짜 DTO 만들기
        given(memberAddService.join(any(MemberJoinRequestDto.class))).willReturn(true);
        //when :

        ResultActions actions = mockMvc.perform(MockMvcRequestBuilders.post("/members/join")
                .param("email","test@test")
                .param("password","testtest")
        );
        //then
        actions.andExpect(content().string("true"));
        actions.andExpect(status().isOk());
    }

    @Test
    void login() {
    }
}
