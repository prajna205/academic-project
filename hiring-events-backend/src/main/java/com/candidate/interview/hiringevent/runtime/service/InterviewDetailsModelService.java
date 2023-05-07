package com.candidate.interview.hiringevent.runtime.service;


import com.candidate.interview.hiringevent.runtime.dao.impl.InterviewDetailsDaoImpl;
import com.candidate.interview.hiringevent.runtime.mock.IUserInfoService;
import com.candidate.interview.hiringevent.runtime.model.Interview;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class InterviewDetailsModelService {
    @Autowired
    private InterviewDetailsDaoImpl interviewDao;

    @Autowired
    IUserInfoService userInfoService;

    public Interview save(Interview interview)
    {
        interview.setCreatedBy(userInfoService.getCurrentLoggedInUserInfo().getUserId());
        interview.setResourceId("skill-"+ UUID.randomUUID().toString());
        interview.setModifiedBy(interview.getCreatedBy());
        return interviewDao.insert(interview);
    }
    public Interview findById(Integer id)
    {
        return interviewDao.select(id);
    }

    public List<Interview> findAll()
    {
        return interviewDao.selectAll();
    }
    public Interview updateById(Integer id, Interview interview){
        interview.setModifiedBy(userInfoService.getCurrentLoggedInUserInfo().getUserId());
        return interviewDao.update(id,interview);
    }
    public boolean delete(Integer id)
    {
        return interviewDao.delete(id)!=0;
    }

}
