package com.reversebid.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reversebid.domain.api.RegisterUserForm;
import com.reversebid.domain.configurable.Role;
import com.reversebid.domain.configurable.User;
import com.reversebid.service.dao.RoleDao;
import com.reversebid.service.dao.UserMongoDao;
import com.reversebid.service.interfaces.I_Service;

@Service
public class UserService implements I_Service{

	@Autowired
	private UserMongoDao userDao;
	
	@Autowired
	private RoleDao roleDao;
	
	public String createUser(RegisterUserForm registerUserForm) {
		User user = new User();
		user.setUsername(registerUserForm.getName());
		user.setPassword(registerUserForm.getPassword());
		user.setEmail(registerUserForm.getEmail());
		user.setPhoneNumber(registerUserForm.getPhoneNumber());
		Role role = roleDao.getRoleByName(registerUserForm.getRole());
		user.setRoleId(role != null? role.getId() : null);
		userDao.createUser(user);
		
		return user.getId();
	}
}
