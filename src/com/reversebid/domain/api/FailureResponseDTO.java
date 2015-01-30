package com.reversebid.domain.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Generated;

import org.codehaus.jackson.annotate.JsonAnyGetter;
import org.codehaus.jackson.annotate.JsonAnySetter;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.annotate.JsonPropertyOrder;
import org.codehaus.jackson.map.annotate.JsonSerialize;

@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
@Generated("org.jsonschema2pojo")
@JsonPropertyOrder({ "success", "msg", "validUser", "errors" })
public class FailureResponseDTO implements IJSONNodeEntity {

	@JsonProperty("success")
	private Boolean success;
	@JsonProperty("msg")
	private String msg;
	@JsonProperty("validUser")
	private boolean validUser;
	@JsonProperty("errors")
	private List<ErrorDTO> errors = new ArrayList<ErrorDTO>();
	private Map<String, Object> additionalProperties = new HashMap<String, Object>();

	@JsonProperty("success")
	public Boolean getSuccess() {
		return success;
	}

	@JsonProperty("success")
	public void setSuccess(Boolean success) {
		this.success = success;
	}

	@JsonProperty("msg")
	public String getMsg() {
		return msg;
	}

	@JsonProperty("msg")
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	@JsonProperty("validUser")
	public boolean isValidUser() {
		return validUser;
	}
	
	@JsonProperty("validUser")
	public void setValidUser(boolean validUser) {
		this.validUser = validUser;
	}

	@JsonProperty("errors")
	public List<ErrorDTO> getErrors() {
		return errors;
	}

	@JsonProperty("errors")
	public void setErrors(List<ErrorDTO> errors) {
		this.errors = errors;
	}

	@JsonAnyGetter
	public Map<String, Object> getAdditionalProperties() {
		return this.additionalProperties;
	}

	@JsonAnySetter
	public void setAdditionalProperty(String name, Object value) {
		this.additionalProperties.put(name, value);
	}

	public void addFieldError(String path, String message) {
		ErrorDTO error = new ErrorDTO();
		error.setId(path);
		error.setMsg(message);
		this.errors.add(error);
	}
	
	@Override
	public List<IJSONNodeEntity> getItems() {
		return null;
	}

	@Override
	public void setItems(List<IJSONNodeEntity> items) {
	}
}
