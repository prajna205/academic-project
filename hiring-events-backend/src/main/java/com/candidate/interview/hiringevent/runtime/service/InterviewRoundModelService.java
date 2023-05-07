package com.candidate.interview.hiringevent.runtime.service;


import com.candidate.interview.hiringevent.runtime.dao.impl.InterviewRoundDaoImpl;
import com.candidate.interview.hiringevent.runtime.mock.IUserInfoService;
import com.candidate.interview.hiringevent.runtime.model.InterviewRound;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class InterviewRoundModelService {
    @Autowired
    private InterviewRoundDaoImpl interviewRoundDao;

    @Autowired
    IUserInfoService userInfoService;

    public InterviewRound save(InterviewRound interviewRound)
    {
        interviewRound.setCreatedBy(userInfoService.getCurrentLoggedInUserInfo().getUserId());
        interviewRound.setResourceId("skill-"+ UUID.randomUUID().toString());
        interviewRound.setModifiedBy(interviewRound.getCreatedBy());
        return interviewRoundDao.insert(interviewRound);
    }
    public InterviewRound findById(Integer id)
    {
        return interviewRoundDao.select(id);
    }

    public List<InterviewRound> findAll()
    {
        return interviewRoundDao.selectAll();
    }

    public boolean delete(Integer id)
    {
        return interviewRoundDao.delete(id)!=0;
    }


    public InterviewRound updateById(Integer id, InterviewRound interviewRound){
        interviewRound.setModifiedBy(userInfoService.getCurrentLoggedInUserInfo().getUserId());
        return interviewRoundDao.update(id,interviewRound);
    }

}
