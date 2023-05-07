package com.candidate.interview.hiringevent.runtime.service;

import com.candidate.interview.hiringevent.runtime.dao.impl.JobDetailsDaoImpl;
import com.candidate.interview.hiringevent.runtime.mock.IUserInfoService;
import com.candidate.interview.hiringevent.runtime.model.JobDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class JobDetailsModelService {

    @Autowired
    private JobDetailsDaoImpl jobDetailsDao;

    @Autowired
    IUserInfoService userInfoService;

    public JobDetails save(JobDetails jobDetails)
    {
        jobDetails.setCreatedBy(userInfoService.getCurrentLoggedInUserInfo().getUserId());
        jobDetails.setResourceId("skill-"+ UUID.randomUUID().toString());
        jobDetails.setModifiedBy(jobDetails.getCreatedBy());
        return jobDetailsDao.insert(jobDetails);
    }
    public boolean delete(Integer id)
    {
        return jobDetailsDao.delete(id)!=0;
    }

    public JobDetails findById(Integer id)
    {
        return jobDetailsDao.select(id);
    }

    public List<JobDetails> findAll()
    {
        return jobDetailsDao.selectAll();
    }

    public JobDetails updateById(Integer id, JobDetails jobDetails)
    {
        jobDetails.setModifiedBy(userInfoService.getCurrentLoggedInUserInfo().getUserId());
        return jobDetailsDao.update(id,jobDetails);

    }
}