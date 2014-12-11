package com.reversebid.service.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.reversebid.domain.configurable.Role;
import com.reversebid.service.dao.interfaces.Dao;

@Component
public class RoleDao implements Dao {

	@Autowired
	private MongoOperations mongoOperations;
	
	public Role getRoleByName(String roleName) {
		return mongoOperations.findOne(new Query(Criteria.where("roleName").is(roleName)), Role.class);
	}
	
	public Role getRoleById(String id) {
		return mongoOperations.findById(id, Role.class);
	}
	
	public List<Role> getRoles() {
		return mongoOperations.findAll(Role.class);
	}
	
	public void createRoles(List<Role> roles) {
		mongoOperations.insertAll(roles);
	}
}
