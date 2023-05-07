package com.candidate.interview.hiringevent.runtime.mock;

import com.candidate.interview.hiringevent.config.AppConfig;
import com.candidate.interview.hiringevent.runtime.model.SkillSet;
import com.candidate.interview.hiringevent.runtime.service.SkillSetModelService;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class TestRun {
    public static void main(String[] args) {

        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

        SkillSetModelService skillSetModelService = context.getBean(SkillSetModelService.class);

        SkillSet skillSet = new SkillSet();
        skillSet.setDescription("dummy desc");
        skillSet.setSkillName("JAVA");

        skillSetModelService.save(skillSet);

        Object result = skillSetModelService.findAll();
        System.out.println(result);




    }
}
