package com.reversebid.service.dao;

import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.stereotype.Component;

import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSFile;
import com.reversebid.service.dao.interfaces.Dao;

@Component
public class MultimediaDao implements Dao {
	
	@Autowired
	private GridFsOperations gridFsTemplate;
	
	@Autowired
	private ApplicationContext applicationContext;
	
	public GridFSFile storeImage(InputStream inputStream, String fileName, DBObject metaData) {
		//return gridFsTemplate.store(inputStream, fileName,"image/png", metaData);
		return gridFsTemplate.store(inputStream, fileName, "video/mp4",metaData);
	}
	
	public GridFSFile storeVideo(InputStream inputStream, String fileName, DBObject metaData) {
		return gridFsTemplate.store(inputStream, fileName, metaData);
	}
	
	public GridFSFile storeAudio(InputStream inputStream, String fileName, DBObject metaData) {
		return gridFsTemplate.store(inputStream, fileName, metaData);
	}
	
	public GridFSDBFile getById(String id) {
	  return this.gridFsTemplate.findOne(new Query(Criteria.where("_id").is(
	    id)));
	 }

	 public GridFSDBFile getByFilename(String fileName) {
	  return gridFsTemplate.findOne(new Query(Criteria.where("filename").is(
	    fileName)));
	 }

	 public List findAll() {
	  return gridFsTemplate.find(null);
	 }
	

}
