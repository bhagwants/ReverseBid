package com.reversebid.service.security;

import org.apache.shiro.authc.UsernamePasswordToken;

public class CustomerToken extends UsernamePasswordToken {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String customer;

	public CustomerToken() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CustomerToken(String username, char[] password, boolean rememberMe,
			String host) {
		super(username, password, rememberMe, host);
		// TODO Auto-generated constructor stub
	}

	public CustomerToken(String username, char[] password, boolean rememberMe) {
		super(username, password, rememberMe);
		// TODO Auto-generated constructor stub
	}

	public CustomerToken(String username, char[] password, String host) {
		super(username, password, host);
		// TODO Auto-generated constructor stub
	}

	public CustomerToken(String username, char[] password) {
		super(username, password);
		// TODO Auto-generated constructor stub
	}

	public CustomerToken(String username, String password, boolean rememberMe,
			String host) {
		super(username, password, rememberMe, host);
		// TODO Auto-generated constructor stub
	}

	public CustomerToken(String username, String password, boolean rememberMe) {
		super(username, password, rememberMe);
		// TODO Auto-generated constructor stub
	}

	public CustomerToken(String username, String password, String host) {
		super(username, password, host);
		// TODO Auto-generated constructor stub
	}

	public CustomerToken(String username, String password) {
		super(username, password);
		// TODO Auto-generated constructor stub
	}

	public String getCustomer() {
		return customer;
	}

	public void setCustomer(String customer) {
		this.customer = customer;
	}
	
	
}
