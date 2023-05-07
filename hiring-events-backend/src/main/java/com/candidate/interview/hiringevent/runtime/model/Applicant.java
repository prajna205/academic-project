package com.candidate.interview.hiringevent.runtime.model;


public class Applicant {
    private String panCard;
    private String jobId;
    private String emailId;
    private String resumePath;
    private ApplicatStatus status; // SUBMITTED, SHORTLISTED, REJECTED

    public String getPanCard() {
        return panCard;
    }

    public void setPanCard(String panCard) {
        this.panCard = panCard;
    }

    public String getJobId() {
        return jobId;
    }

    public void setJobId(String jobId) {
        this.jobId = jobId;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getResumePath() {
        return resumePath;
    }

    public void setResumePath(String resumePath) {
        this.resumePath = resumePath;
    }

    public ApplicatStatus getStatus() {
        return status;
    }

    public void setStatus(ApplicatStatus status) {
        this.status = status;
    }
}

