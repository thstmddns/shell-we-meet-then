package com.ssafy.shallwemeetthen.domain.groupboard.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import java.util.List;

public class AddArticleDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Request {

        @NotBlank
        private Long groupSeq;

        @NotBlank
        private String content;

        private List<MultipartFile> image;

        private MultipartFile video;
    }
}
