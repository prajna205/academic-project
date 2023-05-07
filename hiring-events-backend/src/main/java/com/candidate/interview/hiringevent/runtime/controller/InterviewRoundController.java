package com.candidate.interview.hiringevent.runtime.controller;

import com.candidate.interview.hiringevent.runtime.model.Interview;
import com.candidate.interview.hiringevent.runtime.model.InterviewRound;
import com.candidate.interview.hiringevent.runtime.model.SkillSet;
import com.candidate.interview.hiringevent.runtime.service.InterviewRoundModelService;
import com.candidate.interview.hiringevent.runtime.service.SkillSetModelService;
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
@RequestMapping("/interview-round")
public class InterviewRoundController extends AbstractRestController<InterviewRound, Integer> {

    @Autowired
    private InterviewRoundModelService interviewRoundModelService;

    @PostMapping("/")
    @Override
    public ResponseEntity<InterviewRound> createResource(@RequestBody InterviewRound body, HttpServletRequest request) {
        InterviewRound interviewRound = null;
        try {
            interviewRound = interviewRoundModelService.save(body);
        } catch (DuplicateKeyException ex) {
            ErrorModel errorModel = new ErrorModel();
            errorModel.setHttpStatusCode(500);
            errorModel.setErrorMessage(ex.getMessage());
            errorModel.setApplicationErrorCode(12123); // using random value now. it may have significance later
            errorModel.setUserInterfaceMessage("This Round is already Scheduled !");
            throw new LoginAppException(errorModel, ex);
        }
        return ResponseEntity.ok(interviewRound);
    }



    @GetMapping("/{id}")
    @Override
    public ResponseEntity<InterviewRound> getResource(@PathVariable("id") Integer id, HttpServletRequest request) {
        System.out.println("id from interview Round Controller"+id);
        InterviewRound interviewRound = interviewRoundModelService.findById(id);

        return ResponseEntity.ok(interviewRound);
    }

    @GetMapping("/")
    @Override
    public ResponseEntity<List<InterviewRound>> getResources(HttpServletRequest request) {
        List<InterviewRound> interviewRoundList = interviewRoundModelService.findAll();
        return ResponseEntity.ok(interviewRoundList);
    }


    @PutMapping("/{id}")
    @Override
    public ResponseEntity<InterviewRound> updateResource(@RequestBody InterviewRound body, @PathVariable("id") Integer id,
                                                    HttpServletRequest request) {
        body.setId(id);
        InterviewRound interviewRound = interviewRoundModelService.updateById(id,body);
        return ResponseEntity.ok(interviewRound);
    }


    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Integer> deleteResource(@PathVariable("id") Integer id, HttpServletRequest request) {
        Boolean result = interviewRoundModelService.delete(id);
        return ResponseEntity.ok(1);
    }
}
