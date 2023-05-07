package com.candidate.interview.hiringevent.runtime.model;

import java.util.List;

public class Interview extends ModelEntity {

    private Integer id;
    private String title; // INTERVIEW JAVA ENGG 2 | JOHN DOE | 6 YEARS
    private Integer jobDetailsId;
    private String candidateEmail;

    private InterviewStatus status;

    private List<InterviewRound> rounds;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getJobDetailsId() {
        return jobDetailsId;
    }

    public void setJobDetailsId(Integer jobDetailsId) {
        this.jobDetailsId = jobDetailsId;
    }

    public String getCandidateEmail() {
        return candidateEmail;
    }

    public void setCandidateEmail(String candidateEmail) {
        this.candidateEmail = candidateEmail;
    }

    public InterviewStatus getStatus() {
        return status;
    }

    public void setStatus(InterviewStatus status) {
        this.status = status;
    }
}
