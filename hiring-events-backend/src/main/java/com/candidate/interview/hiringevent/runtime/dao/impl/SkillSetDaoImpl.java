package com.candidate.interview.hiringevent.runtime.dao.impl;

import com.candidate.interview.hiringevent.runtime.dao.AbstractDaoImpl;
import com.candidate.interview.hiringevent.runtime.model.SkillSet;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SkillSetDaoImpl extends AbstractDaoImpl<SkillSet, Integer> {

    private final String INSERT = "INSERT INTO TBL_SKILL_SET(SKILL_SET, DESCRIPTION, CREATED_BY,MODIFIED_BY," +
            "RESOURCE_ID) VALUES" +
            "(?,?,?,?,?)";
    private final String DELETE = "DELETE FROM TBL_SKILL_SET WHERE ID=?";
    private final String SELECT_ONE = "SELECT * FROM TBL_SKILL_SET WHERE ID=?";
    private final String SELECT_ALL = "SELECT * FROM TBL_SKILL_SET";
    private final String UPDATE_SKILL_SET = "UPDATE TBL_SKILL_SET SET SKILL_SET=?,DESCRIPTION=? WHERE ID=?";


    @Override
    public SkillSet insert(SkillSet entity) {
        int rows = getJdbcTemplate().update(INSERT, new Object[]{entity.getSkillName(), entity.getDescription(),
                entity.getCreatedBy(), entity.getModifiedBy(), entity.getResourceId()});
        if (rows == 0)
            throw new RuntimeException("error while saving entity skillSet");
        return entity;
    }

    @Override
    public SkillSet update(Integer id, SkillSet skillSet) {
        int rows = getJdbcTemplate().update(UPDATE_SKILL_SET,new Object[]{skillSet.getSkillName(),
                skillSet.getDescription(),skillSet.getId()} );
        if (rows == 0)
            throw new RuntimeException("error while updating");
        else
            System.out.println(rows);
        return skillSet;
    }

    @Override
    public Integer delete(Integer id) {
        return getJdbcTemplate().update(DELETE, new Object[]{id});
    }

    @Override
    public SkillSet select(Integer id) {
        return getJdbcTemplate().queryForObject(SELECT_ONE, skillSetRow, new Object[]{id});
    }

    @Override
    public List<SkillSet> selectAll() {
        return getJdbcTemplate().query(SELECT_ALL, skillSetRow);
    }

    private static final RowMapper<SkillSet> skillSetRow = (resultSet, i) -> {
        SkillSet skillSet = new SkillSet();
        skillSet.setSkillName(resultSet.getString("SKILL_SET"));
        skillSet.setDescription(resultSet.getString("DESCRIPTION"));
        skillSet.setId(resultSet.getInt("ID"));
        skillSet.setModifiedBy(resultSet.getString("MODIFIED_BY"));
        skillSet.setResourceId(resultSet.getString("RESOURCE_ID"));
        return skillSet;
    };
}
