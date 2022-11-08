package com.ssafy.shallwemeetthen.common.utils;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.ssafy.shallwemeetthen.common.factory.S3Factory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.File;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Utils {

    private final AmazonS3 amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(File file, String fileType, String fileName) {

        String fullPath = fileType + "/" + fileName;

        amazonS3Client.putObject(new PutObjectRequest(bucket, fullPath, file).withCannedAcl(CannedAccessControlList.PublicRead));

        file.delete();

        return amazonS3Client.getUrl(bucket, fullPath).toString();
    }

    public Resource download(String fileType, String fileName) {
        String fullPath = fileType + "/" + fileName;

        S3ObjectInputStream is = amazonS3Client.getObject(bucket, fullPath).getObjectContent();

        return new InputStreamResource(is);
    }

    public void delete(String fileType, String fileName) {
        String fullPath = fileType + "/" + fileName;

        amazonS3Client.deleteObject(bucket, fullPath);
    }
}
