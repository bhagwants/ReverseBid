package com.reversebid.domain.configurable;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="jobs")
public class Job {

	@Id
	private String id;
	
	private String title;
	
	private String description;
	
	private List<String> comments = new ArrayList<String>();
	
	private List<String> pictureIds = new ArrayList<String>();
	
	private List<String> videoIds = new ArrayList<String>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<String> getComments() {
		return comments;
	}

	public void setComments(List<String> comments) {
		this.comments = comments;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<String> getPictureIds() {
		return pictureIds;
	}

	public void setPictureIds(List<String> pictureIds) {
		this.pictureIds = pictureIds;
	}

	public List<String> getVideoIds() {
		return videoIds;
	}

	public void setVideoIds(List<String> videoIds) {
		this.videoIds = videoIds;
	}
}
