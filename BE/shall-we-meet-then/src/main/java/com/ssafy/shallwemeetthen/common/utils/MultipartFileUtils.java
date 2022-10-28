package com.ssafy.shallwemeetthen.common.utils;

import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Getter
public class MultipartFileUtils {

    private final MultipartFile multipartFile;

    private final String originalFileName;

    private final String uuidFileName;

    public MultipartFileUtils(MultipartFile multipartFile) {
        this.multipartFile = multipartFile;

        this.originalFileName = multipartFile.getOriginalFilename();

        this.uuidFileName = makeUuidFileName(multipartFile);
    }

    public Optional<File> convertToFile() throws IOException {
        File convertFile = new File(uuidFileName);

        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(multipartFile.getBytes());
            }

            return Optional.of(convertFile);
        }

        return Optional.empty();
    }

    private static String makeUuidFileName(MultipartFile file) {
        // 클라이언트가 업로드하고자 하는 파일의 실제 이름이다.
        String originFilename = file.getOriginalFilename();

        // 확장자가 무엇인지 확인하기 위해 위치를 확인한다.
        int originExtensionIndex = originFilename.lastIndexOf(".");

        // 랜덤 UUID값을 서버에 저장한다.
        String uuid = String.valueOf(UUID.randomUUID());

        // 실제 확장자 부분을 붙여 저장한다.
        String extension = originFilename.substring(originExtensionIndex);

        return uuid + extension;
    }
}
