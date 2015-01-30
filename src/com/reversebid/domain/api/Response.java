package com.reversebid.domain.api;

import java.util.List;

import javax.annotation.Generated;

import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonPropertyOrder;
import org.codehaus.jackson.map.annotate.JsonSerialize;


@JsonSerialize
@Generated("org.jsonschema2pojo")
@JsonPropertyOrder({
"msg",
"isError"
})
public class Response implements IJSONNodeEntity {

	@JsonProperty("msg")
	private String msg;
	
	@JsonProperty("isError")
	private Boolean isError;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Boolean getIsError() {
		return isError;
	}

	public void setIsError(Boolean isError) {
		this.isError = isError;
	}

	@Override
	public List<com.reversebid.domain.api.IJSONNodeEntity> getItems() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setItems(List<com.reversebid.domain.api.IJSONNodeEntity> items) {
		// TODO Auto-generated method stub
		
	}
	
}
