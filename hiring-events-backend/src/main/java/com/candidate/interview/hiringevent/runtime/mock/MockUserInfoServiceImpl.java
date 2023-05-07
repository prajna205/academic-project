package com.candidate.interview.hiringevent.runtime.mock;

import com.candidate.interview.hiringevent.runtime.model.UserInfo;
import org.springframework.stereotype.Service;

@Service
public class MockUserInfoServiceImpl implements IUserInfoService {

    private String username = "mock-user-1234";

    @Override
    public UserInfo getUserInfo(Integer id) {
        return null;
    }

    @Override
    public UserInfo getCurrentLoggedInUserInfo() {
        UserInfo userInfo = new UserInfo();
        userInfo.setMockUser(true);
        userInfo.setUserId(username);
        return userInfo;
    }
}
