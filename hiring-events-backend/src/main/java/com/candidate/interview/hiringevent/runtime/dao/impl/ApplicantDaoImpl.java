package com.candidate.interview.hiringevent.runtime.dao.impl;

import com.candidate.interview.hiringevent.runtime.dao.AbstractDaoImpl;
import com.candidate.interview.hiringevent.runtime.model.Applicant;
import com.candidate.interview.hiringevent.runtime.model.ApplicatStatus;
import com.candidate.interview.hiringevent.runtime.model.JobDetails;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ApplicantDaoImpl extends AbstractDaoImpl<Applicant, Integer> {
    private final String INSERT = "INSERT INTO TBL_JOB_APPLICANT(PAN_CARD, JOB_ID, EMAIL, RESUME_PATH, " +
            "STATUS) VALUES (?,?,?,?,?)";
    private final String COUNT_APPLICANT = "SELECT COUNT(*) FROM TBL_JOB_APPLICANT WHERE JOB_ID=?";
    private final String SELECT_ALL_BY_JOB_ID = "SELECT * FROM TBL_JOB_APPLICANT WHERE JOB_ID=?";


    @Override
    public Applicant insert(Applicant applicant) {
        System.out.println(applicant.getJobId());
        System.out.println(applicant.getEmailId());
        System.out.println(applicant.getResumePath());
        getJdbcTemplate().update(INSERT, new Object[]{applicant.getPanCard(), applicant.getJobId(),
                applicant.getEmailId(), applicant.getResumePath(), applicant.getStatus().name()});
        return applicant;
    }

    @Override
    public Applicant update(Integer id, Applicant applicant) {
        return null;
    }

    @Override
    public Integer delete(Integer id) {
        return null;
    }

    @Override
    public Applicant select(Integer id) {
        return null;
    }

    @Override
    public List<Applicant> selectAll() {
        return null;
    }

    public List<Applicant> selectAll(String jobId) {
        return getJdbcTemplate().query(SELECT_ALL_BY_JOB_ID,applicantDetailsRow, new Object[]{jobId});
    }

    public Integer countApplicant(String jobId) {
        System.out.println(COUNT_APPLICANT+"job id -"+jobId);
        Integer count_applicant =  getJdbcTemplate().queryForObject(COUNT_APPLICANT, Integer.class,
                new Object[]{jobId});
        return count_applicant;
    }

    private static final RowMapper<Applicant> applicantDetailsRow = (resultSet, i) -> {
        Applicant applicant  = new Applicant();
        applicant.setJobId(resultSet.getString("JOB_ID"));
        applicant.setEmailId(resultSet.getString("EMAIL"));
        applicant.setPanCard(resultSet.getString("PAN_CARD"));
        applicant.setResumePath(resultSet.getString("RESUME_PATH"));
        ApplicatStatus applicatStatus = ApplicatStatus.valueOf(resultSet.getString("STATUS"));
        applicant.setStatus(applicatStatus);
        return applicant;
    };
}
