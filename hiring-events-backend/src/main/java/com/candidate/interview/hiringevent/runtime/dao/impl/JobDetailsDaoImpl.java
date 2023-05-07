package com.candidate.interview.hiringevent.runtime.dao.impl;

import com.candidate.interview.hiringevent.runtime.dao.AbstractDaoImpl;
import com.candidate.interview.hiringevent.runtime.model.JobDetails;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class JobDetailsDaoImpl extends AbstractDaoImpl<JobDetails, Integer> {

    private final String INSERT = "INSERT INTO TBL_JOB_DETAILS(ID,TITLE, DESCRIPTION,TEAM,MANAGER_EMAIL," +
            "NUM_OF_POSITIONS,EXP_DT,MIN_EXP,MAX_EXP,INTERVIEWER, RESOURCE_ID, CREATED_BY,MODIFIED_BY) " +
            "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
    private final String DELETE = "DELETE FROM TBL_JOB_DETAILS WHERE ID=?";
    private final String SELECT_ONE = "SELECT * FROM TBL_JOB_DETAILS WHERE ID=?";
    private final String SELECT_ALL = "SELECT * FROM TBL_JOB_DETAILS";
    private final String UPDATE_SKILL_SET = "UPDATE TBL_JOB_DETAILS SET TITLE=?, DESCRIPTION=?, MANAGER_EMAIL=?, " +
            "MIN_EXP=?, INTERVIEWER=? WHERE ID=?";


    @Override
    public JobDetails insert(JobDetails jobDetails) {
        int rows = getJdbcTemplate().update(INSERT,
                new Object[]{jobDetails.getId(),
                        jobDetails.getTitle(),
                jobDetails.getDescription(),
                jobDetails.getTeam(),jobDetails.getHiringManagerEmail(),
                jobDetails.getNumOfPositions(),
                        jobDetails.getJobExpiryDate(),
                jobDetails.getMinExp(),jobDetails.getMaxExp(),
                        jobDetails.getInterviewerEmail(),
                jobDetails.getResourceId(),jobDetails.getCreatedBy(),
                jobDetails.getModifiedBy()});
        if (rows == 0)
            throw new RuntimeException("error while saving entity skillSet");
        return jobDetails;
    }

    @Override
    public JobDetails update(Integer id, JobDetails jobDetails) {
        int row = getJdbcTemplate().update(UPDATE_SKILL_SET,new Object[]{jobDetails.getTitle(),
                jobDetails.getDescription(),jobDetails.getHiringManagerEmail(),jobDetails.getMinExp(),
                jobDetails.getInterviewerEmail(),
                jobDetails.getId()});
        if (row == 0)
            throw new RuntimeException("error while saving entry to job details");
        else
            System.out.println(row);
        return jobDetails;

    }

    @Override
    public Integer delete(Integer id) {
        return getJdbcTemplate().update(DELETE, new Object[]{id});
    }

    @Override
    public JobDetails select(Integer id) {
        return getJdbcTemplate().queryForObject(SELECT_ONE,jobDetailsRow, new Object[]{id});
    }

    @Override
    public List<JobDetails> selectAll() {
        return getJdbcTemplate().query(SELECT_ALL,jobDetailsRow);
    }

    private static final RowMapper<JobDetails> jobDetailsRow = (resultSet, i) -> {

        JobDetails jobDetails  = new JobDetails();
        jobDetails.setId(resultSet.getInt("ID"));
        jobDetails.setTitle(resultSet.getString("TITLE"));
        jobDetails.setDescription(resultSet.getString("DESCRIPTION"));
        jobDetails.setTeam(resultSet.getString("TEAM"));
        jobDetails.setHiringManagerEmail(resultSet.getString("MANAGER_EMAIL"));
        jobDetails.setNumOfPositions(resultSet.getInt("NUM_OF_POSITIONS"));
        jobDetails.setJobExpiryDate(resultSet.getDate("EXP_DT"));
        jobDetails.setMinExp(resultSet.getInt("MIN_EXP"));
        jobDetails.setMaxExp(resultSet.getInt("MAX_EXP"));
        jobDetails.setInterviewerEmail(resultSet.getString("INTERVIEWER"));
        jobDetails.setResourceId(resultSet.getString("RESOURCE_ID"));
        jobDetails.setCreatedBy(resultSet.getString("CREATED_BY"));
        jobDetails.setModifiedBy(resultSet.getString("MODIFIED_BY"));
        return jobDetails;
    };
}