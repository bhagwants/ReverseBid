package com.reversebid.domain.api;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Generated;

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonPropertyOrder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

@JsonSerialize
@Generated("org.jsonschema2pojo")
@JsonPropertyOrder({
"id",
"title",
"description",
"comments",
"pictureIds",
"videoIds"
})
public class JobData {

	@JsonProperty("id")
	private String id;
	
	@JsonProperty("title")
	private String title;
	
	@JsonProperty("description")
	private String description;
	
	@JsonProperty("comments")
	private List<String> comments = new ArrayList<String>();
	
	@JsonProperty("pictureIds")
	private List<String> pictureIds = new ArrayList<String>();
	
	@JsonProperty("videoIds")
	private List<String> videoIds = new ArrayList<String>();

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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
