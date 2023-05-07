package com.candidate.interview.hiringevent.runtime.controller;

import com.candidate.interview.hiringevent.runtime.model.Applicant;
import com.candidate.interview.hiringevent.runtime.service.ApplicantModelService;
import io.login.client.models.ErrorModel;
import io.login.client.models.LoginAppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin("http://localhost:4200")
@RestController

public class ApplicantDetailsController extends AbstractRestController<Applicant, Integer>{
    @Autowired
    private ApplicantModelService applicantModelService;

    @PostMapping("/application-developer-jobs")
    @Override
    public ResponseEntity<Applicant> createResource(@RequestBody Applicant body, HttpServletRequest request) {
//        body.setResumePath();
        Applicant applicant = null;
        try {
            applicant = applicantModelService.save(body);
        } catch (DuplicateKeyException e) {
            ErrorModel errorModel = new ErrorModel();
            errorModel.setHttpStatusCode(500);
            errorModel.setApplicationErrorCode(12123); // using random value now. it may have significance later
            errorModel.setUserInterfaceMessage("Candidate Already Applied for this post !");
            throw new LoginAppException(errorModel, e);
        }
        return ResponseEntity.ok(applicant);
    }

    @Override
    public ResponseEntity<Applicant> updateResource(Applicant body, Integer id, HttpServletRequest request) {
        return null;
    }

    @Override
    public ResponseEntity<Applicant> getResource(Integer id, HttpServletRequest request) {
        return null;
    }

    @GetMapping("/count-applicant/{id}")
    public ResponseEntity<Integer> getData(@PathVariable("id") String jobId, HttpServletRequest request) {
        Integer count  = applicantModelService.findByJobId(jobId);
        return ResponseEntity.ok(count);
    }

    @Override
    public ResponseEntity<List<Applicant>> getResources(HttpServletRequest request) {
        return null;
    }

    @GetMapping("/get-applicant/{id}")
    public ResponseEntity<List<Applicant>> getResources(@PathVariable("id") String jobId, HttpServletRequest request) {
        List<Applicant> applicants = applicantModelService.findAll(jobId);
        return ResponseEntity.ok(applicants);
    }

    @Override
    public ResponseEntity<Integer> deleteResource(Integer id, HttpServletRequest request) {
        return null;
    }

}
