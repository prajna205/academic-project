package com.candidate.interview.hiringevent.runtime.model;

public class SkillSet extends ModelEntity {

    // skillset-UUID
    private Integer id;
    private String skillName;
    private String description;

    public SkillSet(Integer id, String skillName, String description) {
        this.id = id;
        this.skillName = skillName;
        this.description = description;
    }

    public SkillSet() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getSkillName() {
        return skillName;
    }

    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
