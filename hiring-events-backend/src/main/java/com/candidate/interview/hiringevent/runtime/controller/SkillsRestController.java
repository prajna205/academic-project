package com.candidate.interview.hiringevent.runtime.controller;

import com.candidate.interview.hiringevent.runtime.model.SkillSet;
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
@RequestMapping("/skills")
public class SkillsRestController extends AbstractRestController<SkillSet, Integer> {

    @Autowired
    private SkillSetModelService skillSetModelService;

    @PostMapping("/")
    @Override
    public ResponseEntity<SkillSet> createResource(@RequestBody SkillSet body, HttpServletRequest request) {
        SkillSet skillSet = null;
        try {
            skillSet = skillSetModelService.save(body);
        } catch (DuplicateKeyException ex) {
            ErrorModel errorModel = new ErrorModel();
            errorModel.setHttpStatusCode(500);
            errorModel.setErrorMessage(ex.getMessage());
            errorModel.setApplicationErrorCode(12123); // using random value now. it may have significance later
            errorModel.setUserInterfaceMessage("Duplicate Skill Entry Found !");
            throw new LoginAppException(errorModel, ex);
        }
        return ResponseEntity.ok(skillSet);
    }

    @PutMapping("/{id}")
    @Override
    public ResponseEntity<SkillSet> updateResource(@RequestBody SkillSet body, @PathVariable("id") Integer id,
                                                   HttpServletRequest request) {
        body.setId(id);
        SkillSet skillSet = skillSetModelService.updateById(id,body);
        return ResponseEntity.ok(skillSet);
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<SkillSet> getResource(@PathVariable("id") Integer id, HttpServletRequest request) {
        SkillSet skillSet = skillSetModelService.findById(id);

        return ResponseEntity.ok(skillSet);
    }

    @GetMapping("/")
    @Override
    public ResponseEntity<List<SkillSet>> getResources(HttpServletRequest request) {
        List<SkillSet> skillSetList = skillSetModelService.findAll();
        return ResponseEntity.ok(skillSetList);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Integer> deleteResource(@PathVariable("id") Integer id, HttpServletRequest request) {
        Boolean result = skillSetModelService.delete(id);
        return ResponseEntity.ok(1);
    }
}
