package io.login.security.service;

import io.login.client.config.security.components.NoEncryptPasswordEncoder;
import io.login.client.models.*;

import io.login.security.dao.IUserRepository;
import io.login.security.models.LoginRequest;
import io.login.security.models.LoginUser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class UserServiceImpl implements IUserService {
    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    private IUserRepository userRepository;

    private IUserAuthenticationService userAuthenticationService;

    @Autowired
    public void setUserAuthenticationService(IUserAuthenticationService userAuthenticationService) {
        this.userAuthenticationService = userAuthenticationService;
    }

    @Autowired
    public void setUserRepository(IUserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Autowired
    public TwilloMessageSenderService twilloMessageSenderService;

    @Override
    @Transactional
    public LoginUser resetPassword(LoginRequest loginRequest) {
        System.out.println("login Request - "+ loginRequest);
        System.out.println("login Request getResetPasswordToken - "+ loginRequest.getResetPasswordToken());
        if(loginRequest.getResetPasswordToken() == null) {
            LoginUser loginUser = this.userRepository.getUserByUsername(loginRequest.getUsername());
            loginUser.setPassword(loginRequest.getPassword());
            this.userRepository.updateUserPassword(loginUser);// update
            loginUser.setStatus(UserStatus.ACTIVE);
            this.updateAccountStatus(loginUser); // database
            return loginUser;
        }

        if (1 == this.userRepository.getResetPasswordTokenCount(loginRequest.getUsername(),
                loginRequest.getResetPasswordToken())) {
            LoginUser loginUser = this.userRepository.getUserByUsername(loginRequest.getUsername());
            loginUser.setPassword(loginRequest.getPassword());
            this.userRepository.updateUserPassword(loginUser);// update
            loginUser.setStatus(UserStatus.ACTIVE);
            this.updateAccountStatus(loginUser); // database
            return loginUser;
        }

        throw new RuntimeException("reset password token is not valid for the user");
    }

    @Override
    public LoginUser updateAccountStatus(LoginUser loginUser) {
        return this.userRepository.updateUserStatus(loginUser);
    }

    @Override
    public String authenticate(LoginRequest loginRequest, HttpServletResponse response) {
        LoginUser loginUser = null;
        try {
            loginUser = this.userRepository.getUserByUsername(loginRequest.getUsername());
        } catch (Exception e){
            ErrorModel errorModel = new ErrorModel();
            errorModel.setHttpStatusCode(401);
            errorModel.setApplicationErrorCode(12341);
            errorModel.setUserInterfaceMessage("username not found !");
            throw new LoginAppException(errorModel, e);
        }
        if (loginUser.getStatus() == UserStatus.INACTIVE){
            // generateOTP
            //      generate a no between 1000 to 10,000 and display here
//            int max = 1000;
//            int min = 10000;
//            int range = max - min + 1;
//
//            // saveOTP in DB tbl : TBL_USER_OTP - USER_NAME, OTP, CREATED_AT
//            int OTP = (int) (Math.random() * range) + min;
//            LOGGER.info("otp "+OTP);
//            Long createdAt = System.currentTimeMillis();
//            this.userRepository.saveUserOTP(loginUser, OTP, createdAt);

            // getUserProfile from DB and send OTP sms to mobile No

            // return a string called OTPSent_resetPasswordOTPScreen (crying snake)

        }
        if (loginUser.getStatus() == UserStatus.DRAFT) {
                String token = generateResetPasswordToken(loginRequest);
                // compare password of login request and login user, using NoEncryptPasswordEncoder
                boolean flag = new NoEncryptPasswordEncoder().matches(loginUser.getPassword(),
                        loginRequest.getPassword());
                if (!flag){
                    //error handling
                    ErrorModel errorModel = new ErrorModel();
                    errorModel.setHttpStatusCode(401);
                    errorModel.setApplicationErrorCode(12341);
                    errorModel.setUserInterfaceMessage("Default Password incorrect");
                    throw new LoginAppException(errorModel);
                }
                response.setHeader("resetPasswordToken", token);
////          response.getWriter().write("resetPasswordToken"+ token);
//            ResponseEntity.status(204).body("resetPasswordToken"+ token);
                return token;
        }

        if (loginUser.getStatus() == UserStatus.ACTIVE) {
            try {
                String jwtToken = userAuthenticationService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());
                response.setHeader("Authorization", "Bearer " + jwtToken);
                // response.getWriter().write("Authorization"+ "Bearer " + jwtToken);
                return "Bearer " + jwtToken;
            } catch (BadCredentialsException e) {
                ErrorModel errorModel = new ErrorModel();
                errorModel.setHttpStatusCode(401);
                errorModel.setApplicationErrorCode(12341);
                errorModel.setUserInterfaceMessage("username or password incorrect");
                throw new LoginAppException(errorModel, e);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        throw new RuntimeException("operation not allowed. user status is: " + loginUser.getStatus().name());
    }

    @Override
    public String generateResetPasswordToken(LoginRequest loginRequest) {
        String resetPasswordToken = UUID.randomUUID().toString();
        boolean flag = this.userRepository.saveResetPasswordToken(loginRequest.getUsername(), resetPasswordToken);
        if (!flag)
            throw new RuntimeException("error while persisting reset password token");
        return resetPasswordToken;
    }

    @Override
    public List<UserAccount> getUserRole() {
        return null;
    }

    @Override
    public UserProfile getUserProfileDetails(String userName) {
        UserProfile userProfile = this.userRepository.getUserProfile(userName);
        return userProfile;
    }

    @Override
    public String generateOtp(String userName) {
        // save otp
        int min = 1000;
        int max = 10000;
        int range = max - min + 1;
        int OTP = (int) (Math.random() * range) + min;
        Long createdAt = System.currentTimeMillis();
        this.userRepository.saveUserOTP(userName, OTP, createdAt);

        //get otp
        String getOtp = this.userRepository.getUserOtp(userName);
        LOGGER.info("otp "+getOtp);
//        return getOtp;
        // send mail api
        // get Phone number of user from the database
        UserProfile userProfile = this.userRepository.getUserProfile(userName);
        String recieverPhoneNumber = userProfile.getMobile();
        String message = "Your OTP is "+getOtp;
        MessageModel messageModel = new MessageModel();
        messageModel.setSmsText(message);
        messageModel.setMobileNumber(recieverPhoneNumber);
        twilloMessageSenderService.sendMessage(messageModel);
        return message;
    }

    @Override
    public LoginUser checkIfUserExist(String userName) {
        LoginUser loginUser = null;
        try {
            loginUser = this.userRepository.getUserByUsername(userName);
        } catch (Exception e) {
            ErrorModel errorModel = new ErrorModel();
            errorModel.setApplicationErrorCode(12341);
            errorModel.setUserInterfaceMessage("No user exist with user name "+userName);
            throw new LoginAppException(errorModel, e);
        }
        return loginUser;
    }

    @Override
    public Boolean validateOtp(String userOtp, String user) {
        boolean isValidOtp = false;
        long OTP_EXPIRE_TIME = (5 * 60 * 1000);
        long otpReqTime = new Date().getTime();
        long creationTime = getOtpCreationTimeFromDB(user);
        if ((creationTime + OTP_EXPIRE_TIME) < otpReqTime){
            isValidOtp = false;
            ErrorModel errorModel = new ErrorModel();
            errorModel.setApplicationErrorCode(12341);
            errorModel.setUserInterfaceMessage("OTP Expired, OTP Validity"+ ((OTP_EXPIRE_TIME)/1000)/60 +"minutes");
            throw new LoginAppException(errorModel);
        }

        String actualOtp = getOtpFromDB(user);
        if (userOtp.equals(actualOtp)){
            isValidOtp =  true;
            return isValidOtp;
        }
        if (isValidOtp == false) {
            ErrorModel errorModel1 = new ErrorModel();
            errorModel1.setApplicationErrorCode(12341);
            errorModel1.setUserInterfaceMessage("Wrong OTP");
            throw new LoginAppException(errorModel1);
        }

        return false;
    }

    private long getOtpCreationTimeFromDB(String user) {
        return this.userRepository.creationTime(user);
    }

    @Override
    public String getOtpFromDB(String userName) {
        return this.userRepository.getUserOtp(userName);
    }

    @Override
    public Boolean changePasswordOnUserRequest(String newPassword, String userName) {
        return this.userRepository.changePassword(newPassword, userName);
    }

    @Override
    public UserAccount getLoginUser(String username) {
        return userAuthenticationService.getLoginUser(username);
    }

    public void createUser(UserAccount userRequest) {
        String uuid = UUID.randomUUID().toString();
        userRequest.setUuid(uuid);
        try {
            this.userRepository.insertUser(userRequest);
        } catch (DuplicateKeyException e) {
            ErrorModel errorModel = new ErrorModel();
            errorModel.setApplicationErrorCode(12341);
            errorModel.setUserInterfaceMessage("duplicate username requested");
            throw new LoginAppException(errorModel, e);
        }
    }

    @Override
    public void saveUserRoleMapping(UserAccount userRequest) {
        this.userRepository.insertIntoRoleMapping(userRequest);
    }

    @Override
    public void updateUserRole(RoleUpdate updateRole) {
        this.userRepository.updateUSerRoleInDB(updateRole);
    }

    @Override
    public void createUserProfileDetails(UserProfile userProfile) {
        this.userRepository.insertUserProfileDetails(userProfile);
    }

    @Override
    public void updateUserProfileDetails(UserProfile userProfile) {
        this.userRepository.updateUserProfileDetails(userProfile);
    }
}
