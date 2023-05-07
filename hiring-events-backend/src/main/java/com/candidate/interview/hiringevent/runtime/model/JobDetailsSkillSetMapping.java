package com.candidate.interview.hiringevent.runtime.model;

import java.util.List;

public class JobDetailsSkillSetMapping {
    private Integer jobId;
    private List<SkillSet> skills;

    public List<SkillSet> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillSet> skills) {
        this.skills = skills;
    }

    public JobDetailsSkillSetMapping() {
    }

    public Integer getJobId() {
        return jobId;
    }

    public void setJobId(Integer jobId) {
        this.jobId = jobId;
    }

    public JobDetailsSkillSetMapping(Integer jobId, List<SkillSet> skills) {
        this.jobId = jobId;
        this.skills = skills;
    }
}
