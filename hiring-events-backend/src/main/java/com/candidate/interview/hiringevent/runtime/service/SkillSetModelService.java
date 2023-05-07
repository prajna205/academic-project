package com.candidate.interview.hiringevent.runtime.service;

import com.candidate.interview.hiringevent.runtime.dao.impl.SkillSetDaoImpl;
import com.candidate.interview.hiringevent.runtime.mock.IUserInfoService;
import com.candidate.interview.hiringevent.runtime.model.SkillSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class SkillSetModelService {

    @Autowired
    private SkillSetDaoImpl skillSetDao;

    @Autowired
    IUserInfoService userInfoService;

    public SkillSet save(SkillSet skillSet)
    {
        skillSet.setCreatedBy(userInfoService.getCurrentLoggedInUserInfo().getUserId());
        skillSet.setResourceId("skill-"+ UUID.randomUUID().toString());
        skillSet.setModifiedBy(skillSet.getCreatedBy());
        return skillSetDao.insert(skillSet);
    }

    public boolean delete(Integer id)
    {
        return skillSetDao.delete(id)!=0;
    }

    public SkillSet findById(Integer id)
    {
        return skillSetDao.select(id);
    }

    public List<SkillSet> findAll()
    {
        return skillSetDao.selectAll();
    }

    public SkillSet updateById(Integer id, SkillSet skillSet){
        skillSet.setModifiedBy(userInfoService.getCurrentLoggedInUserInfo().getUserId());
        return skillSetDao.update(id,skillSet);
    }
}
