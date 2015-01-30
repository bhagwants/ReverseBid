package com.reversebid.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reversebid.domain.api.FailureResponseDTO;
import com.reversebid.domain.api.IJSONNodeEntity;
import com.reversebid.domain.api.Login;
import com.reversebid.domain.api.RegisterUserForm;
import com.reversebid.domain.api.Response;
import com.reversebid.domain.configurable.Role;
import com.reversebid.domain.configurable.User;
import com.reversebid.rest.api.utils.ErrorUtils;
import com.reversebid.service.dao.RoleDao;
import com.reversebid.service.dao.UserMongoDao;
import com.reversebid.service.interfaces.I_Service;
import com.reversebid.service.security.CustomerToken;

@Service
public class UserService implements I_Service{
	
	private static final Log log = LogFactory.getLog(UserService.class);

	@Autowired
	private UserMongoDao userDao;
	
	@Autowired
	private RoleDao roleDao;
	
	@Autowired
	private ErrorUtils errorUtils;
	
	public Response createUser(RegisterUserForm registerUserForm) {
		Response response = new Response();
		try {
			User user = new User();
			user.setUsername(registerUserForm.getName());
			user.setPassword(registerUserForm.getPassword());
			user.setEmail(registerUserForm.getEmail());
			user.setPhoneNumber(registerUserForm.getPhoneNumber());
			Role role = roleDao.getRoleByName(registerUserForm.getRole());
			//user.setRoleId(role != null? role.getId() : null);
			user = userDao.createUser(user);
			response.setIsError(false);
			response.setMsg("Successfully created the user");
		} catch(Exception ex) {
			response.setIsError(true);
			response.setMsg("Error creating user");
		}
		
		return response;
	}
	
	public IJSONNodeEntity authenticate(Login loginForm) {
		Response loginResponse = new Response();
		FailureResponseDTO errors = null;
		try {
			errors = errorUtils.validateBean(loginForm);
			if (!errors.getErrors().isEmpty()) {
				errors.setValidUser(false);
				return errors;
			}
			if(login(loginForm.getName(), loginForm.getPassword())) {
				loginResponse.setIsError(false);;
				loginResponse.setMsg("Succesfully logged in user " + loginForm.getName());
			} else {
				loginResponse.setIsError(true);;
				loginResponse.setMsg("Failure to log in user " + loginForm.getName());
			}
		} catch(Exception ex) {
			log.error("Could not parse login form data!!", ex);
			errors.setMsg("System processing error: unable to process form data.");
			return errors;
		}
		
		return loginResponse;
	}
	
	private boolean login(String username, String password) {
		
		//create a UsernamePasswordToken using the
		//username and password provided by the user
		
		CustomerToken token = new CustomerToken(username, password);

		try {
			
//			if (rememberMe) {
//				token.setRememberMe(rememberMe);
//			}
			
			//get the user (aka subject) associated with 
			//this request.

			Subject subject = SecurityUtils.getSubject();

			//The use of IniShiroFilter specified in web.xml
			//caused JSecurity to create the DefaultWebSecurityManager object
			//see: http://jsecurity.org/api/org/jsecurity/web/DefaultWebSecurityManager.html
			//This security manager is the default for web-based applications
			//The SecurityUtils was provided that security manager automatically
			//The configuration specified in web.xml caused 
			//a JdbcRealm object to be provided to the SecurityManager
			//so when the login method is called that JdbcRealm
			//object will be used
			//This application uses all the other defaults
			//For example the default authentication query string is
			//"select password from users where username = ?"
			//since the database this application uses (securityDB)
			//has a users table and that table has a column named username
			//and a column named password, the default authentication query
			//string will work
			//The call to login will cause the following to occur
			//Shiro will query the database for a password associated with the 
			//provided username (which is stored in token).  If a password is found 
			//and matches the password
			//provided by the user (also stored in the token), a new Subject will be created that is
			//authenticated.  This subject will be bound to the session for the
			//user who made this request
			//see:  http://shiro.apache.org/static/current/apidocs/org/apache/shiro/authc/Authenticator.html
			//for a list of potential Exceptions that might be generated if
			//authentication fails (e.g. incorrect password, no username found)

			subject.login(token);

			//clear the information stored in the token

			token.clear();
				

		} catch (UnknownAccountException ex) {
			// log.debug("Unknown Account error " + ex.getMessage().toString());
			log.debug("Unknown Account error");
			return false;

		} catch (IncorrectCredentialsException ex) {
			// log.debug("Incorrect Credentials error - " + ex.getMessage().toString());
			log.debug("Incorrect Credentials error");
			return false;
		}

		catch (Exception ex) {			
			log.debug("Login error" + ex.getMessage().toString());
			return false;
		}
		
		return true;
	}
}
