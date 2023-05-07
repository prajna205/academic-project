package com.candidate.interview.hiringevent.runtime.controller;

import com.candidate.interview.hiringevent.runtime.model.JobDetails;
import com.candidate.interview.hiringevent.runtime.model.SkillSet;
import com.candidate.interview.hiringevent.runtime.service.JobDetailsModelService;
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
@RequestMapping("/job-details")
public class JobDetailsController extends AbstractRestController<JobDetails, Integer> {

    @Autowired
    private JobDetailsModelService jobDetailsModelService;

    @PostMapping("/")
    @Override
    public ResponseEntity<JobDetails> createResource(@RequestBody JobDetails body, HttpServletRequest request) {
        JobDetails jobdetails = null;
        try {
            jobdetails = jobDetailsModelService.save(body);
        } catch (DuplicateKeyException ex) {
            ErrorModel errorModel = new ErrorModel();
            errorModel.setHttpStatusCode(500);
            errorModel.setErrorMessage(ex.getMessage());
            errorModel.setApplicationErrorCode(12123); // using random value now. it may have significance later
            errorModel.setUserInterfaceMessage("Duplicate Job Found !");
            throw new LoginAppException(errorModel, ex);
        }
        return ResponseEntity.ok(jobdetails);
    }


    @PutMapping("/{id}")
    @Override
    public ResponseEntity<JobDetails> updateResource(@RequestBody JobDetails body, @PathVariable("id") Integer id,
                                                     HttpServletRequest request) {
        body.setId(id);
        JobDetails jobdetails = jobDetailsModelService.updateById(id, body);
        return ResponseEntity.ok(jobdetails);
    }


    @GetMapping("/{id}")
    @Override
    public ResponseEntity<JobDetails> getResource(@PathVariable("id") Integer id, HttpServletRequest request) {

        JobDetails jobDetails = jobDetailsModelService.findById(id);

        return ResponseEntity.ok(jobDetails);
    }

    @GetMapping("/")
    @Override
    public ResponseEntity<List<JobDetails>> getResources(HttpServletRequest request) {
        List<JobDetails> jobDetailsList = jobDetailsModelService.findAll();
        return ResponseEntity.ok(jobDetailsList);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Integer> deleteResource(@PathVariable("id") Integer id, HttpServletRequest request) {
        Boolean result = jobDetailsModelService.delete(id);
        return ResponseEntity.ok(1);
    }
}
