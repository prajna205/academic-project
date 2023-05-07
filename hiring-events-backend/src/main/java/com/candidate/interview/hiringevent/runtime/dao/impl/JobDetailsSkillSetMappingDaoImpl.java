package com.candidate.interview.hiringevent.runtime.dao.impl;

import com.candidate.interview.hiringevent.runtime.dao.AbstractDaoImpl;
import com.candidate.interview.hiringevent.runtime.model.JobDetailsSkillSetMapping;
import com.candidate.interview.hiringevent.runtime.model.SkillSet;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class JobDetailsSkillSetMappingDaoImpl
        extends AbstractDaoImpl<JobDetailsSkillSetMapping,Integer> {
    private final String DELETE = "DELETE FROM TBL_JOB_DETAILS_SKILL_SET_MAPPING WHERE JOB_ID=?";
    private final String INSERT = "INSERT INTO " +
            "TBL_JOB_DETAILS_SKILL_SET_MAPPING(JOB_ID,SKILL_SET_ID) VALUES (?,?)";
    private final String SELECT_ONE= "SELECT * FROM TBL_JOB_DETAILS_SKILL_SET_MAPPING WHERE JOB_ID=?";
    private final String SELECT_ALL= "SELECT JOB_ID,SKILL_SET_ID FROM TBL_JOB_DETAILS_SKILL_SET_MAPPING";

    @Override
    public JobDetailsSkillSetMapping insert(JobDetailsSkillSetMapping jobDetailsSkillSetMapping) {
        delete(jobDetailsSkillSetMapping.getJobId());
        batchInsert(jobDetailsSkillSetMapping);
        return jobDetailsSkillSetMapping;
    }

    public int[] batchInsert(JobDetailsSkillSetMapping jobDetailsSkillSetMapping) {

        return getJdbcTemplate().batchUpdate(INSERT,
                new BatchPreparedStatementSetter() {

                    public void setValues(PreparedStatement ps, int i) throws SQLException {
                        ps.setInt(1, jobDetailsSkillSetMapping.getJobId());
                        ps.setInt(2, jobDetailsSkillSetMapping.getSkills().get(i).getId());
                    }

                    public int getBatchSize() {
                        return jobDetailsSkillSetMapping.getSkills().size();
                    }

                });
    }

    @Override
    public JobDetailsSkillSetMapping update(Integer id, JobDetailsSkillSetMapping jobDetailsSkillSetMapping) {
        return null;
    }

    @Override
    public Integer delete(Integer id) {
        return getJdbcTemplate().update(DELETE, new Object[]{id});
    }

    @Override
    public JobDetailsSkillSetMapping select(Integer id) {
            return getJdbcTemplate().queryForObject(SELECT_ONE,jobDetailsSkillSetMappingMapper, new Object[]{id});
    }

    @Override
    public List<JobDetailsSkillSetMapping> selectAll() {
        return getJdbcTemplate().query(SELECT_ALL, jobDetailsSkillSetMappingMapper);
    }

    private static final RowMapper<JobDetailsSkillSetMapping> jobDetailsSkillSetMappingMapper = (resultSet, i) -> {
        JobDetailsSkillSetMapping jobDetailsSkillSetMapping = new JobDetailsSkillSetMapping();
        jobDetailsSkillSetMapping.setJobId(resultSet.getInt("JOB_ID"));


        jobDetailsSkillSetMapping.setSkills(new ArrayList<>());
        SkillSet skillSet = new SkillSet();
        skillSet.setId(resultSet.getInt("SKILL_SET_ID"));
        jobDetailsSkillSetMapping.getSkills().add(skillSet);

        while(resultSet.next()){
            skillSet = new SkillSet();
            skillSet.setId(resultSet.getInt("SKILL_SET_ID"));
            jobDetailsSkillSetMapping.getSkills().add(skillSet);
        }
        return jobDetailsSkillSetMapping;
    };
}
