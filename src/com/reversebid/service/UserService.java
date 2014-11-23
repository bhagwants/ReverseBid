package com.reversebid.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reversebid.domain.api.RegisterUserForm;
import com.reversebid.domain.configurable.User;
import com.reversebid.service.dao.UserMongoDao;
import com.reversebid.service.interfaces.I_UserService;

@Service
public class UserService implements I_UserService{

	@Autowired
	private UserMongoDao userDao;
	
	public String createUser(RegisterUserForm registerUserForm) {
		User user = new User();
		user.setUsername(registerUserForm.getName());
		user.setPassword(registerUserForm.getPassword());
		user.setEmail(registerUserForm.getEmail());
		user.setPhoneNumber(registerUserForm.getPhoneNumber());
		userDao.createUser(user);
		
		return user.getId();
	}
}
