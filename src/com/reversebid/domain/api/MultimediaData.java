package com.reversebid.domain.api;

import java.io.Serializable;

import javax.annotation.Generated;

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonPropertyOrder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

@JsonSerialize
@Generated("org.jsonschema2pojo")
@JsonPropertyOrder({
"fileName",
"contentType"
})
public class MultimediaData implements Serializable {

	private static final long serialVersionUID = 1999041048296389519L;
	

	@JsonProperty("fileName")
	private String fileName;
	
	@JsonProperty("contentType")
	private String contentType;

	@JsonProperty("fileName")
	public String getFileName() {
		return fileName;
	}

	@JsonProperty("fileName")
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	@JsonProperty("contentType")
	public String getContentType() {
		return contentType;
	}

	@JsonProperty("contentType")
	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

}
