package com.candidate.interview.hiringevent.runtime.dao.impl;

import com.candidate.interview.hiringevent.runtime.dao.AbstractDaoImpl;
import com.candidate.interview.hiringevent.runtime.model.LoginProvider;
import com.candidate.interview.hiringevent.runtime.model.UserInfo;
import com.candidate.interview.hiringevent.runtime.model.UserType;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public class UserInfoDaoImpl extends AbstractDaoImpl<UserInfo, Integer> {

    private final String INSERT = "INSERT INTO TBL_USER_INFO(ID,EMAIL_ID, USER_TYPE, MOCK_USER,LOGIN_PROVIDER) VALUES " +
            "(?,?,?,?,?)";
    private final String SELECT_ALL = "SELECT * FROM TBL_USER_INFO";
    private final String DELETE = "DELETE FROM TBL_USER_INFO WHERE ID=?";
    private final String SELECT_ONE = "SELECT * FROM TBL_USER_INFO WHERE ID=?";
    private final String UPDATE_USER_INFO = "UPDATE TBL_USER_INFO SET EMAIL_ID=?, USER_TYPE=?, MOCK_USER=?, " +
            "LOGIN_PROVIDER=? WHERE ID=?";
    @Override
    public UserInfo insert(UserInfo userInfo) {
        int rows = getJdbcTemplate().update(INSERT, new Object[]{userInfo.getId(),userInfo.getEmail(),userInfo.getUserType().name(),
        userInfo.isMockUser(),userInfo.getLoginProvider().name()});

        if (rows == 0)
            throw new RuntimeException("error while saving entity skillSet");
        return userInfo;
    }
    @Override
    public UserInfo update(Integer id, UserInfo userInfo) {
        int rows = getJdbcTemplate().update(UPDATE_USER_INFO,new Object[]{userInfo.getEmail(),
                userInfo.getUserType().name(),userInfo.isMockUser(),userInfo.getLoginProvider().name(),userInfo.getId()} );
        if (rows == 0)
            throw new RuntimeException("error while updating");
        else
            System.out.println(rows);
        return userInfo;
    }

    @Override
    public Integer delete(Integer id) {
        return getJdbcTemplate().update(DELETE, new Object[]{id});
    }

    @Override
    public UserInfo select(Integer id) {
        return getJdbcTemplate().queryForObject(SELECT_ONE, userInfoRow, new Object[]{id});
    }


    @Override
    public List<UserInfo> selectAll() {
        return getJdbcTemplate().query(SELECT_ALL, userInfoRow);
    }

    private static final RowMapper<UserInfo> userInfoRow = (resultSet, i) -> {
        UserInfo userInfo = new UserInfo();
        userInfo.setId(resultSet.getInt("ID"));
        userInfo.setEmail(resultSet.getString("EMAIL_ID"));
        UserType userType = UserType.valueOf(resultSet.getString("USER_TYPE"));
        userInfo.setUserType(userType);
        userInfo.setMockUser(resultSet.getBoolean("MOCK_USER"));
        LoginProvider loginProvider = LoginProvider.valueOf(resultSet.getString("LOGIN_PROVIDER"));
        userInfo.setLoginProvider(loginProvider);

        return userInfo;
    };
}
