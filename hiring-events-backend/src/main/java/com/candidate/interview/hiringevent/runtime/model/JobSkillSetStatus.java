package com.candidate.interview.hiringevent.runtime.model;

public class JobSkillSetStatus {

    private SkillSet skillSet;
    private Boolean status;

    public JobSkillSetStatus(SkillSet skillSet, Boolean status) {
        this.skillSet = skillSet;
        this.status = status;
    }

    public SkillSet getSkillSet() {
        return skillSet;
    }

    public void setSkillSet(SkillSet skillSet) {
        this.skillSet = skillSet;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
