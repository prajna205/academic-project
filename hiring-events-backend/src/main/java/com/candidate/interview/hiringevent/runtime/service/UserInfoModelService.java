package com.candidate.interview.hiringevent.runtime.service;

import com.candidate.interview.hiringevent.runtime.dao.impl.UserInfoDaoImpl;
import com.candidate.interview.hiringevent.runtime.mock.IUserInfoService;
import com.candidate.interview.hiringevent.runtime.model.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserInfoModelService {

    @Autowired
    IUserInfoService userInfoService;

    @Autowired
    private UserInfoDaoImpl userInfoDao;



    public UserInfo save(UserInfo userInfo)
    {
        userInfo.setCreatedBy(userInfoService.getCurrentLoggedInUserInfo().getUserId());
        userInfo.setResourceId("skill-"+ UUID.randomUUID().toString());
        userInfo.setModifiedBy(userInfo.getCreatedBy());
        return userInfoDao.insert(userInfo);
    }
    public List<UserInfo> findAll()
    {
        return userInfoDao.selectAll();
    }


    public UserInfo findById(Integer id)
    {
        return userInfoDao.select(id);
    }


    public UserInfo updateById(Integer id, UserInfo userInfo){
        System.out.println(userInfo);
        userInfo.setModifiedBy(userInfoService.getCurrentLoggedInUserInfo().getUserId());
        return userInfoDao.update(id,userInfo);
    }
    public boolean delete(Integer id)
    {
        return userInfoDao.delete(id)!=0;
    }


}
