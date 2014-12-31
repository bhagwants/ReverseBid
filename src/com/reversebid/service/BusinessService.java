package com.reversebid.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reversebid.domain.api.JobData;
import com.reversebid.domain.configurable.Job;
import com.reversebid.service.dao.JobDao;
import com.reversebid.service.interfaces.I_Service;

@Service
public class BusinessService implements I_Service {
	
	@Autowired
	private JobDao jobDao;

	public void createJob(JobData jobData) {
		jobDao.createJob(populateJobObject(jobData));
	}
	
	private Job populateJobObject(JobData jobData) {
		Job jobObj = new Job();
		jobObj.setId(jobData.getId());
		jobObj.setTitle(jobData.getTitle());
		jobObj.setDescription(jobData.getDescription());
		jobObj.setComments(jobData.getComments());
		//jobObj.setPictureIds(jobData.getPictureIds());
		//jobObj.setVideoIds(jobData.getVideoIds());
		return jobObj;
	}
	
}
