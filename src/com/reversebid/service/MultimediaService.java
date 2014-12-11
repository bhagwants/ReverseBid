package com.reversebid.service;

import java.io.InputStream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mongodb.BasicDBObject;
import com.mongodb.gridfs.GridFSDBFile;
import com.mongodb.gridfs.GridFSFile;
import com.reversebid.service.dao.MultimediaDao;
import com.reversebid.service.interfaces.I_Service;

@Service
public class MultimediaService implements I_Service {

	@Autowired
	private MultimediaDao multimediaDao;
	
	public void saveImage(InputStream inputStream, String fileName, BasicDBObject metadata) {
		GridFSFile file = multimediaDao.storeImage(inputStream, fileName, metadata);
//		TODO: save file id in job id
	}
	
	public void saveVideo(InputStream inputStream, String fileName) {
		multimediaDao.storeVideo(inputStream, fileName, new BasicDBObject());
	}
	
	public void saveAudeo(InputStream inputStream, String fileName) {
		multimediaDao.storeAudio(inputStream, fileName, new BasicDBObject());
	}
	
	public GridFSDBFile getByFileName(String fileName) {
		return multimediaDao.getByFilename(fileName);
	}
	
	public GridFSDBFile getById(String id) {
		return multimediaDao.getById(id);
	}
}
