package com.candidate.interview.hiringevent.runtime.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserInfo extends ModelEntity{

    /**
     * Write controller for Store & List UserInfo fields like email, userType, mockUser in database,
     */
    private Integer id;
    private String userId; // cant be changed.
    private String email; // cant be changed
    private String password;
    private UserType userType;

    @JsonProperty
    private boolean mockUser;

    private LoginProvider loginProvider;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isMockUser() {
        return mockUser;
    }

    public void setMockUser(boolean mockUser) {
        this.mockUser = mockUser;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserType getUserType() {
        return userType;
    }

    public void setUserType(UserType userType) {
        this.userType = userType;
    }

    public LoginProvider getLoginProvider() {
        return loginProvider;
    }

    public void setLoginProvider(LoginProvider loginProvider) {
        this.loginProvider = loginProvider;
    }
}
