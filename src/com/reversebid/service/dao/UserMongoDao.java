package com.reversebid.service.dao;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authc.credential.DefaultPasswordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import com.reversebid.domain.configurable.User;
import com.reversebid.service.dao.interfaces.Dao;

@Component
public class UserMongoDao implements Dao{
	
	private final Log log = LogFactory.getLog(UserMongoDao.class);

	@Autowired
	private ApplicationContext applicationContext;
	@Autowired
	private MongoOperations mongoOperations;
	
	public User createUser(User user) throws Exception{
		try {
			final DefaultPasswordService passwdService = new DefaultPasswordService();
			user.setPassword(passwdService.encryptPassword(user.getPassword()));
			mongoOperations.save(user);
		} catch(Exception ex){
			log.error("Error creating the user ", ex);
			throw ex;
		}
		return user;
	}
	
	public User getUser(String username) {
		try {
			return mongoOperations.findOne(new Query(Criteria.where("username").is(
					username)), User.class);
		} catch(Exception ex) {
			log.error("Error finding user with user name : " + username, ex);
		}
		return null;
	}
}
