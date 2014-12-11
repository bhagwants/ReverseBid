package com.reversebid.test;

import static org.junit.Assert.fail;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.gridfs.GridFSFile;
import com.reversebid.service.dao.MultimediaDao;

public class MultimediaTest {
	
	private ApplicationContext applicationContext;
	private GridFsOperations gridOperations;

	@Before
	public void setUp() throws Exception {
		applicationContext = new GenericXmlApplicationContext("servlet-config.xml");
		gridOperations = (GridFsOperations) applicationContext.getBean("gridFsTemplate");
	}

//	@Test
	public void testStoreImage() {
		MultimediaDao dao = (MultimediaDao) applicationContext.getBean(MultimediaDao.class);
		DBObject metaData = new BasicDBObject();
		metaData.put("extra1", "anything 1");
		metaData.put("extra2", "anything 2");
		InputStream inputStream = null;
		try {
			inputStream = new FileInputStream("C:\\Users\\Sidhu\\Pictures\\2012-04-06\\P1010045.JPG");
			GridFSFile file = dao.storeImage(inputStream, "testing2.png", metaData );
			System.out.println("Stored file with id : " + file.getId());
	 
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} finally {
			if (inputStream != null) {
				try {
					inputStream.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
		
	}

	@Test
	public void testStoreVideo() {
		fail("Not yet implemented");
	}

	@Test
	public void testStoreAudio() {
		fail("Not yet implemented");
	}
	
	@Test
	public void printAllImages() {
		
		GridFsOperations gridFsOperations = (GridFsOperations)applicationContext.getBean("gridFsTemplate");
		MultimediaDao dao = (MultimediaDao) applicationContext.getBean(MultimediaDao.class);
		System.out.println(dao.getByFilename("Sagal1"));
		System.out.println(gridFsOperations.find(null));
	}

}
