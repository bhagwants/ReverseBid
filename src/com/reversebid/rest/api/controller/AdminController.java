package com.reversebid.rest.api.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.reversebid.domain.configurable.Role;
import com.reversebid.service.RoleService;

@RestController
public class AdminController {
	private Log log = LogFactory.getLog(AdminController.class);

	@Autowired
	RoleService roleService;
	
	@RequestMapping(value = "/api/admin/createroles", method = RequestMethod.GET,
			consumes={"application/json"})
	public String createRoles() {
		try {
			if(CollectionUtils.isEmpty(roleService.getRoles())) {
				List<Role> roles = new ArrayList<Role>();
				Role role = new Role();
				role.setRoleName(Role.ROLES.client.name());
				roles.add(role);
				role = new Role();
				role.setRoleName(Role.ROLES.contractor.name());
				roles.add(role);
				role = new Role();
				role.setRoleName(Role.ROLES.admin.name());
				roles.add(role);
				roleService.createRoles(roles);
			}
			
		} catch(Exception ex) {
			log.error(ex);
			return "failure";
		}
		
		return "success";
	}
}
