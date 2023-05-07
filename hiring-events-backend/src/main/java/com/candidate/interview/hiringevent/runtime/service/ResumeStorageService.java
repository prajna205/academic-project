package com.candidate.interview.hiringevent.runtime.service;


import com.candidate.interview.hiringevent.runtime.model.ResumeStorageProperties;
import io.login.client.models.ErrorModel;
import io.login.client.models.LoginAppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ResumeStorageService {

    private final Path resumeStorageLocation;

    @Autowired
    public ResumeStorageService(ResumeStorageProperties resumeStorageProperties) {
        this.resumeStorageLocation = Paths.get(resumeStorageProperties.getUploadDir())
                .toAbsolutePath().normalize();
        System.out.println("resume storage Location : "+this.resumeStorageLocation.toString());

        try {
            Files.createDirectories(this.resumeStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }


    public String storeFile(MultipartFile file) {
        System.out.println("inside UploadedResumeFileResponse's storeFile()");
        // Normalize file name
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
//        fileName = UUID.randomUUID().toString() + "_"+fileName;
        System.out.println("file name - "+fileName);
        try {
            // Check if the file's name contains invalid characters
            if(fileName.contains("..")) {
                throw new RuntimeException("Sorry! Filename contains invalid path sequence " + fileName);
            }

            // Copy file to the target location (Replacing existing file with the same name)
            Path targetLocation = this.resumeStorageLocation.resolve(fileName);
            System.out.println("target location : "+targetLocation.toString());
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            return fileName;
        } catch (IOException ex) {
            throw new RuntimeException("Could not store file " + fileName + ". Please try again!", ex);
        }
    }

    public Resource loadFileAsResource(String fileName) {
        System.out.println("fileName - loadFileAsResource() " + fileName);
        try {
            Path filePath = this.resumeStorageLocation.resolve(fileName).normalize();
            System.out.println("filePath  -loadFileAsResource() " + filePath.toString());
            Resource resource = new UrlResource(filePath.toUri());
            try {
                if (resource.exists()) {
                    return resource;
                }
            } catch (Exception ex) {
                ErrorModel errorModel = new ErrorModel();
                errorModel.setHttpStatusCode(500);
                errorModel.setErrorMessage(ex.getMessage());
                errorModel.setApplicationErrorCode(12123); // using random value now. it may have significance later
                errorModel.setUserInterfaceMessage("File not found " + fileName);
                throw new LoginAppException(errorModel, ex);
            }
        } catch (MalformedURLException ex) {
            ErrorModel errorModel = new ErrorModel();
            errorModel.setHttpStatusCode(500);
            errorModel.setErrorMessage(ex.getMessage());
            errorModel.setApplicationErrorCode(12123); // using random value now. it may have significance later
            errorModel.setUserInterfaceMessage("Download URL is incorrect !" + fileName);
            throw new LoginAppException(errorModel, ex);
        }
        return null;
    }
}
