package com.reversebid.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.reversebid.domain.api.JobData;
import com.reversebid.domain.api.Login;
import com.reversebid.service.BusinessService;

@RestController
public class BusinessController {
	
	@Autowired
	private BusinessService businessService;
	
	@RequestMapping(value = "/api/business/job/1.0", method = RequestMethod.GET,
			consumes={"application/json"})
	public String login(@RequestBody Login loginForm) {
		return loginForm.getName() + ":" + loginForm.getPassword();
	}
	
	@RequestMapping(value = "/api/business/job/1.0", method = RequestMethod.POST,
			consumes={"application/json"})
	public @ResponseBody String register(@RequestBody JobData jobData) {
		try {
			businessService.createJob(jobData);
            return "Sucessfully created job";
        } catch (Exception e) {
            return "failed to create job => " + e.getMessage();
        }
	}

}
