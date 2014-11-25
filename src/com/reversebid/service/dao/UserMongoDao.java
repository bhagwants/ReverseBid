package com.reversebid.service.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;

import com.reversebid.domain.configurable.User;
import com.reversebid.service.dao.interfaces.Dao;

@Service
public class UserMongoDao implements Dao{

	@Autowired
	private ApplicationContext applicationContext;
	@Autowired
	private MongoOperations mongoOperations;
	
	public User createUser(User user) {
		mongoOperations.save(user);
		return user;
	}
}
