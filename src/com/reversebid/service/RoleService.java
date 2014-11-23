package com.reversebid.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reversebid.domain.configurable.Role;
import com.reversebid.service.dao.RoleDao;
import com.reversebid.service.interfaces.I_Service;

@Service
public class RoleService implements I_Service {

	@Autowired
	private RoleDao roleDao;
	
	public void createRoles(List<Role> roles) {
		roleDao.createRoles(roles);
	}
	
	public List<Role> getRoles() {
		return roleDao.getRoles();
	}
}
