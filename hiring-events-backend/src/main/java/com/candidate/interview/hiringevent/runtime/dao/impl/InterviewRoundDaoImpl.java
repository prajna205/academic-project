
package com.candidate.interview.hiringevent.runtime.dao.impl;

import com.candidate.interview.hiringevent.runtime.dao.AbstractDaoImpl;
import com.candidate.interview.hiringevent.runtime.mailAPIsmtp.SendMail;
import com.candidate.interview.hiringevent.runtime.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class InterviewRoundDaoImpl extends AbstractDaoImpl<InterviewRound, Integer> {

//

    private final String INSERT = "INSERT INTO TBL_INTERVIEW_ROUND(ID, INTERVIEW_ID, CANDIDATE_EMAIL_ID,INTERVIEW_EMAIL_ID," +
            "TITLE,INTERVIEW_DATE,INTERVIEW_TIME,VIRTUAL_LINK,INTERVIEW_FEEDBACK,INTERVIEW_STATUS) VALUES" +
            "(?,?,?,?,?,?,?,?,?,?)";
    private final String DELETE = "DELETE FROM TBL_INTERVIEW_ROUND WHERE ID=?";
    private final String SELECT_ONE = "SELECT * FROM TBL_INTERVIEW_ROUND WHERE ID=?";
    private final String SELECT_ALL = "SELECT * FROM TBL_INTERVIEW_ROUND";
    private final String UPDATE_INTERVIEW_ROUND = "UPDATE TBL_INTERVIEW_ROUND SET CANDIDATE_EMAIL_ID=?," +
            "INTERVIEW_EMAIL_ID=?,TITLE=?, INTERVIEW_DATE=?, INTERVIEW_TIME=? ,VIRTUAL_LINK=?, INTERVIEW_FEEDBACK=?, " +
            " INTERVIEW_STATUS=? WHERE ID=?";

    @Override
    public InterviewRound insert(InterviewRound entity) {
        int rows = getJdbcTemplate().update(INSERT, new Object[]{entity.getId(), entity.getInterviewId(),
                entity.getCandidateEmailId(), entity.getInterviewerEmailId(), entity.getTitle(), entity.getInterviewDate(),
                entity.getInterviewTime(), entity.getVirtualLink(), entity.getInterviewFeedBack(), entity.getStatus().name()});
        if (rows == 1){
            // send mail to candidate and interviewer regarding the schedule details
            SendMail sendMail = new SendMail();
            sendMail.sendMail("photo3bablu@gmail.com", entity.getInterviewerEmailId(), entity);
            sendMail.sendMail("photo3bablu@gmail.com", entity.getCandidateEmailId(), entity);

        }
        else
            throw new RuntimeException("error while saving entity InterviewRound");
        return entity;
    }

    @Override
    public InterviewRound update(Integer id, InterviewRound interviewRound) {
        int rows = getJdbcTemplate().update(UPDATE_INTERVIEW_ROUND, new Object[]{interviewRound.getCandidateEmailId(),
                interviewRound.getInterviewerEmailId(), interviewRound.getTitle(),
                interviewRound.getInterviewDate(), interviewRound.getInterviewTime(), interviewRound.getVirtualLink(),
                interviewRound.getInterviewFeedBack(), interviewRound.getStatus().name(), interviewRound.getId()});
        if (rows == 0)
            throw new RuntimeException("error while updating");
        else
            System.out.println(rows);
        return interviewRound;
    }


    @Override
    public Integer delete(Integer id) {
        return getJdbcTemplate().update(DELETE, new Object[]{id});
    }

    @Override
    public InterviewRound select(Integer id) {
        System.out.println("id --------" + id);
        return getJdbcTemplate().queryForObject(SELECT_ONE, interviewRoundRow, new Object[]{id});
    }

    @Override
    public List<InterviewRound> selectAll() {
        return getJdbcTemplate().query(SELECT_ALL, interviewRoundRow);
    }

    private static final RowMapper<InterviewRound> interviewRoundRow = (resultSet, i) -> {
        InterviewRound interviewRound = new InterviewRound();
        interviewRound.setId(resultSet.getInt("ID"));
        interviewRound.setInterviewId(resultSet.getInt("INTERVIEW_ID"));
        interviewRound.setCandidateEmailId(resultSet.getString("CANDIDATE_EMAIL_ID"));
        interviewRound.setInterviewerEmailId(resultSet.getString("INTERVIEW_EMAIL_ID"));
        interviewRound.setTitle(resultSet.getString("TITLE"));
        interviewRound.setInterviewDate(resultSet.getString("INTERVIEW_DATE"));
        interviewRound.setInterviewTime(resultSet.getString("INTERVIEW_TIME"));
        interviewRound.setVirtualLink(resultSet.getString("VIRTUAL_LINK"));
        interviewRound.setInterviewFeedBack(resultSet.getString("INTERVIEW_FEEDBACK"));
        InterviewStatus interviewStatus = InterviewStatus.valueOf(resultSet.getString("INTERVIEW_STATUS"));
        interviewRound.setStatus(interviewStatus);

        return interviewRound;
    };
}