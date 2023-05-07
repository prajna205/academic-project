package com.candidate.interview.hiringevent.runtime.controller;

import com.candidate.interview.hiringevent.runtime.model.SkillSet;
import com.candidate.interview.hiringevent.runtime.model.UserInfo;
import com.candidate.interview.hiringevent.runtime.service.UserInfoModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/user-info")
public class UserInfoRestController extends AbstractRestController<UserInfo, Integer> {

    @Autowired
    private UserInfoModelService userInfoModelService;


    @PostMapping("/")
    @Override
    public ResponseEntity<UserInfo> createResource(@RequestBody  UserInfo body, HttpServletRequest request) {
        UserInfo userInfo = userInfoModelService.save(body);
        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/")
    @Override
    public ResponseEntity<List<UserInfo>> getResources(HttpServletRequest request) {
        List<UserInfo> userInfos = userInfoModelService.findAll();
        return ResponseEntity.ok(userInfos);
    }
    @GetMapping("/{id}")
    @Override
    public ResponseEntity<UserInfo> getResource(@PathVariable("id") Integer id, HttpServletRequest request) {
        UserInfo userInfo = userInfoModelService.findById(id);

        return ResponseEntity.ok(userInfo);
    }
    @PutMapping("/{id}")
    @Override
    public ResponseEntity<UserInfo> updateResource(@RequestBody UserInfo body, @PathVariable("id") Integer id,
                                                   HttpServletRequest request) {
        body.setId(id);
        UserInfo userInfo = userInfoModelService.updateById(id,body);
        return ResponseEntity.ok(userInfo);
    }


    @DeleteMapping("/{id}")
    @Override
    public ResponseEntity<Integer> deleteResource(@PathVariable("id") Integer id, HttpServletRequest request) {
        Boolean result = userInfoModelService.delete(id);
        return ResponseEntity.ok(1);
    }

}
