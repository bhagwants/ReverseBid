package com.reversebid.service.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Component;

import com.reversebid.domain.configurable.Job;
import com.reversebid.service.dao.interfaces.Dao;

@Component
public class JobDao implements Dao {

	@Autowired
	private MongoOperations mongoOperations;
	
	public void createJob(Job job) {
		mongoOperations.save(job);
	}
}
