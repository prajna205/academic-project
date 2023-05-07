package com.candidate.interview.hiringevent.runtime.mock;

import com.candidate.interview.hiringevent.runtime.model.UserInfo;

public interface IUserInfoService {

     UserInfo getUserInfo(Integer id);
     UserInfo getCurrentLoggedInUserInfo();

}
