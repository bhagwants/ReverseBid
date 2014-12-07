package com.reversebid.service.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.mongodb.gridfs.GridFsOperations;

import com.reversebid.service.dao.interfaces.Dao;

public class MultimediaDao implements Dao {
	
	@Autowired
	private GridFsOperations gridOperations;
	
	@Autowired
	private ApplicationContext applicationContext;
	

}
