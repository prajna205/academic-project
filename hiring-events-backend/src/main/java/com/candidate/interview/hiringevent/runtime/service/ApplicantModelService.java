package com.candidate.interview.hiringevent.runtime.service;


import com.candidate.interview.hiringevent.runtime.dao.impl.ApplicantDaoImpl;
import com.candidate.interview.hiringevent.runtime.model.Applicant;
import com.candidate.interview.hiringevent.runtime.model.ApplicatStatus;
import com.candidate.interview.hiringevent.runtime.model.ResumeStorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ApplicantModelService {
    @Autowired
    private ApplicantDaoImpl applicantDao;

    @Autowired
    private ResumeStorageProperties resumeStorageProperties;



    public Applicant save(Applicant applicant)
    {

        applicant.setStatus(ApplicatStatus.SUBMITTED);
//        applicant.setResumePath(resumeStorageProperties.getUploadDir());
        applicant.setResumePath(applicant.getResumePath());
        System.out.println(resumeStorageProperties.getUploadDir());
        return applicantDao.insert(applicant);
    }

    public Integer findByJobId(String jobId){
        return applicantDao.countApplicant(jobId);
    }

    public List<Applicant> findAll(String jobId) {
        return applicantDao.selectAll(jobId);
    }
}
