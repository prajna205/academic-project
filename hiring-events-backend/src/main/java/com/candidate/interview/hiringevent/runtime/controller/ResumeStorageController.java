package com.candidate.interview.hiringevent.runtime.controller;


import com.candidate.interview.hiringevent.runtime.model.UploadedResumeFileResponse;
import com.candidate.interview.hiringevent.runtime.service.ResumeStorageService;
import io.login.client.models.ErrorModel;
import io.login.client.models.LoginAppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@CrossOrigin("http://localhost:4200")
@RestController
public class ResumeStorageController {


    @Autowired
    private ResumeStorageService resumeStorageService;

    @PostMapping("resume/upload-file")
    public UploadedResumeFileResponse uploadFile(@RequestParam("file") MultipartFile file){
        System.out.println("inside UploadedResumeFileResponse()");
        String fileName = null;
        try {
            fileName = resumeStorageService.storeFile(file);
        } catch (Exception ex) {
            ErrorModel errorModel = new ErrorModel();
            errorModel.setHttpStatusCode(500);
            errorModel.setErrorMessage(ex.getMessage());
            errorModel.setApplicationErrorCode(12123); // using random value now. it may have significance later
            errorModel.setUserInterfaceMessage("File Upload Failed !");
            throw new LoginAppException(errorModel, ex);
        }

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("resume/downloadResume/")
                    .path(fileName)
                .toUriString();

        return new UploadedResumeFileResponse(fileName, fileDownloadUri,
                file.getContentType(), file.getSize());
    }

    @GetMapping("resume/downloadResume/{fileName:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = resumeStorageService.loadFileAsResource(fileName);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            System.out.println("Could not determine file type.");
            throw  new RuntimeException("Could not determine file type.");
        }
        if(contentType == null) {
            contentType = "application/octet-stream";
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}
