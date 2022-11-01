package com.ssafy.shallwemeetthen.domain.groupboardimage.dto;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class AddGroupBoardImageDto {

    @Getter
    @Setter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Request {

        private List<MultipartFile> image;

        public Request(List<MultipartFile> image) {
            this.image = image;
        }
    }
}
