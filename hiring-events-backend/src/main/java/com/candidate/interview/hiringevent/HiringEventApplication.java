package com.candidate.interview.hiringevent;

import com.candidate.interview.hiringevent.runtime.model.ResumeStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.security.servlet.SecurityFilterAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(scanBasePackages = {"com.candidate.interview.hiringevent","io.login.client"}
)
@EnableConfigurationProperties({
		ResumeStorageProperties.class
})
public class HiringEventApplication {

	public static void main(String[] args) {
		SpringApplication.run(HiringEventApplication.class, args);
	}

}
