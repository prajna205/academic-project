package com.candidate.interview.hiringevent.runtime.model;


import java.util.Date;

public class JobDetails extends ModelEntity {

    private Integer id;
    private Integer minExp;
    private Integer maxExp;
    private String hiringManagerEmail; // input
    private Date jobExpiryDate; // input
    private Integer numOfPositions;
    private String title; // input
    private String description; // input
    private String team; // POOL, DMP, FAWB
    private String interviewerEmail;

    public Integer getMinExp() {
        return minExp;
    }

    public void setMinExp(Integer minExp) {
        this.minExp = minExp;
    }

    public Integer getMaxExp() {
        return maxExp;
    }

    public void setMaxExp(Integer maxExp) {
        this.maxExp = maxExp;
    }
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getHiringManagerEmail() {
        return hiringManagerEmail;
    }

    public void setHiringManagerEmail(String hiringManagerEmail) {
        this.hiringManagerEmail = hiringManagerEmail;
    }

    public Date getJobExpiryDate() {
        return jobExpiryDate;
    }

    public void setJobExpiryDate(Date jobExpiryDate) {
        this.jobExpiryDate = jobExpiryDate;
    }

    public Integer getNumOfPositions() {
        return numOfPositions;
    }

    public void setNumOfPositions(Integer numOfPositions) {
        this.numOfPositions = numOfPositions;
    }

    public String getInterviewerEmail() {
        return interviewerEmail;
    }

    public void setInterviewerEmail(String interviewerEmail) {
        this.interviewerEmail = interviewerEmail;
    }
}
