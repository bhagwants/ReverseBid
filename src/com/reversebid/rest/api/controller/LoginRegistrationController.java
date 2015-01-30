package com.reversebid.rest.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.reversebid.domain.api.IJSONNodeEntity;
import com.reversebid.domain.api.Login;
import com.reversebid.domain.api.RegisterUserForm;
import com.reversebid.domain.api.Response;
import com.reversebid.service.UserService;

@RestController
public class LoginRegistrationController {
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(value = "/api/login/1.0", method = RequestMethod.GET,
			consumes={"application/json"})
	public String login() {
		return "login hello";
	}
	
	@RequestMapping(value = "/api/login/1.0", method = RequestMethod.POST,
			consumes={"application/json"})
	public @ResponseBody IJSONNodeEntity login(@RequestBody Login loginForm) {
		return userService.authenticate(loginForm);
	}
	
	@RequestMapping(value = "/api/register/1.0", method = RequestMethod.POST,
			consumes={"application/json"})
	public @ResponseBody Response register(@RequestBody RegisterUserForm form) {
		return userService.createUser(form);
	}

}
