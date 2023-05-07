package com.candidate.interview.hiringevent.runtime.model;

import java.util.ArrayList;
import java.util.List;

public class JobSkillSetStatusGroup {

    private List<SkillSet> enabled;
    private List<SkillSet> disabled;

    public List<SkillSet> getEnabled() {
        if  (this.enabled == null)
            enabled = new ArrayList<>();
        return this.enabled;
    }

    public void setEnabled(List<SkillSet> enabled) {
        this.enabled = enabled;
    }

    public List<SkillSet> getDisabled() {
       if  (this.disabled == null)
         disabled = new ArrayList<>();
       return this.disabled;
    }

    public void setDisabled(List<SkillSet> disabled) {
        this.disabled = disabled;
    }
}
