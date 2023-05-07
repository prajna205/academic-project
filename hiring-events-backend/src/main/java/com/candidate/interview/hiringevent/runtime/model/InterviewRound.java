package com.candidate.interview.hiringevent.runtime.model;

public class InterviewRound  extends ModelEntity{

    private Integer id;
    private Integer interviewId;
    private String candidateEmailId;
    private String interviewerEmailId;

    private String title; // ROUND 1 (CODING), ROUND 2 (TECH DISCUSSION), ROUND 3(SYSTEM_DESIGN), ROUND 4 (HR)

    private String interviewDate;
    private String interviewTime;

    private String virtualLink;

    private String interviewFeedBack;

    private InterviewStatus status;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getInterviewId() {
        return interviewId;
    }

    public void setInterviewId(Integer interviewId) {
        this.interviewId = interviewId;
    }

    public String getCandidateEmailId() {
        return candidateEmailId;
    }

    public void setCandidateEmailId(String candidateEmailId) {
        this.candidateEmailId = candidateEmailId;
    }

    public String getInterviewerEmailId() {
        return interviewerEmailId;
    }

    public void setInterviewerEmailId(String interviewerEmailId) {
        this.interviewerEmailId = interviewerEmailId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(String interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getInterviewTime() {
        return interviewTime;
    }

    public void setInterviewTime(String interviewTime) {
        this.interviewTime = interviewTime;
    }

    public String getVirtualLink() {
        return virtualLink;
    }

    public void setVirtualLink(String virtualLink) {
        this.virtualLink = virtualLink;
    }

    public String getInterviewFeedBack() {
        return interviewFeedBack;
    }

    public void setInterviewFeedBack(String interviewFeedBack) {
        this.interviewFeedBack = interviewFeedBack;
    }

    public InterviewStatus getStatus() {
        return status;
    }

    public void setStatus(InterviewStatus status) {
        this.status = status;
    }
}
