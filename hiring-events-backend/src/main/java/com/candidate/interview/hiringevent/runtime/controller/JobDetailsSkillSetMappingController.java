package com.candidate.interview.hiringevent.runtime.controller;

import com.candidate.interview.hiringevent.runtime.model.*;
import com.candidate.interview.hiringevent.runtime.service.JobDetailsSkillSetMappingModelService;
import com.candidate.interview.hiringevent.runtime.service.SkillSetModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/job-details-skill-set-mapping")
public class JobDetailsSkillSetMappingController extends AbstractRestController<JobDetailsSkillSetMapping, Integer> {
    @Autowired
    private JobDetailsSkillSetMappingModelService jobDetailsSkillSetMappingModelService;

    @Autowired
    private SkillSetModelService skillSetModelService;


    @PostMapping("/")
    @Override
    public ResponseEntity<JobDetailsSkillSetMapping> createResource(@RequestBody JobDetailsSkillSetMapping body,
                                                                    HttpServletRequest request) {
        JobDetailsSkillSetMapping jobDetailsSkillSetMapping = jobDetailsSkillSetMappingModelService.save(body);
        return ResponseEntity.ok(jobDetailsSkillSetMapping);
    }

    @Override
    public ResponseEntity<JobDetailsSkillSetMapping> updateResource(JobDetailsSkillSetMapping body, Integer id, HttpServletRequest request) {
        return null;
    }

    @GetMapping("/{id}")
    @Override
    public ResponseEntity<JobDetailsSkillSetMapping> getResource(@PathVariable("id") Integer id,
                                                                 HttpServletRequest request) {
        JobDetailsSkillSetMapping jobDetailsSkillSetMapping = jobDetailsSkillSetMappingModelService.findById(id);

        return ResponseEntity.ok(jobDetailsSkillSetMapping);
    }

    @GetMapping("/")
    @Override
    public ResponseEntity<List<JobDetailsSkillSetMapping>> getResources(HttpServletRequest request) {
        List<JobDetailsSkillSetMapping> jobDetailsSkillSetMappings = jobDetailsSkillSetMappingModelService.findAll();
        return ResponseEntity.ok(jobDetailsSkillSetMappings);
    }

    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Integer> deleteResource(@PathVariable("id") Integer id, HttpServletRequest request) {
        Boolean result = jobDetailsSkillSetMappingModelService.delete(id);
        return ResponseEntity.ok(1);
    }

    @GetMapping("/jobs/{id}")
    public ResponseEntity<JobSkillSetStatusGroup> getJobSkillSetStatus(@PathVariable("id") Integer id) {
        List<SkillSet> skillSets = skillSetModelService.findAll();
        JobDetailsSkillSetMapping jobDetailsSkillSetMappings = jobDetailsSkillSetMappingModelService.findById(id);
        List<SkillSet> mappedSkillSets = jobDetailsSkillSetMappings.getSkills();

        JobSkillSetStatusGroup jobSkillSetStatusGroup = new JobSkillSetStatusGroup();
        for (SkillSet skillSet : skillSets) {
            SkillSet mapped = findSkillSetById(skillSet.getId(), mappedSkillSets);
            if (mapped != null) {
                jobSkillSetStatusGroup.getEnabled().add(skillSet);
            } else {
                jobSkillSetStatusGroup.getDisabled().add(skillSet);
            }
        }
        Collections.sort(jobSkillSetStatusGroup.getDisabled(), Comparator.comparing(SkillSet::getSkillName));
        Collections.sort(jobSkillSetStatusGroup.getEnabled(), Comparator.comparing(SkillSet::getSkillName));
        return ResponseEntity.ok(jobSkillSetStatusGroup);
    }

    private SkillSet findSkillSetById(Integer id, List<SkillSet> mappedSkillSets) {
        SkillSet skillSetSearch = null;
        for (SkillSet skillSet : mappedSkillSets) {
            if (skillSet.getId().equals(id)) {
                return skillSet;
            }
        }
        return null;
    }
}
