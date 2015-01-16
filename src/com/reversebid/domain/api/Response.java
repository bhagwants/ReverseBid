package com.reversebid.domain.api;

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
public class Response {

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
	
}
