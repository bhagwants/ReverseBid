package com.reversebid.service.security;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.shiro.authc.AccountException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.AuthorizationException;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.reversebid.domain.configurable.Role;
import com.reversebid.domain.configurable.User;


public class MongoRealm extends AuthorizingRealm {

	private boolean permissionsLookupEnabled = true;

	//@Autowired
	//private MongoTemplate mongoTemplateUser;
	
	@Autowired
	private MongoOperations mongoOperations;
	
	
	private final Log log = LogFactory.getLog(MongoRealm.class);
	
	/**
     * Enables lookup of permissions during authorization.  The default is "true" - meaning that only roles
     * are associated with a user.  Set this to true in order to lookup roles <b>and</b> permissions.
     *
     * @param permissionsLookupEnabled true if permissions should be looked up during authorization, or false if only
     *                                 roles should be looked up.
     */
    public void setPermissionsLookupEnabled(boolean permissionsLookupEnabled) {
        this.permissionsLookupEnabled = permissionsLookupEnabled;
    }
    
	protected AuthenticationInfo doGetAuthenticationInfo(
			AuthenticationToken token) throws AuthenticationException {

		log.debug("doGetAuthenticationInfo");
		
		SimpleAuthenticationInfo info = null;
		
//		if (token instanceof CustomerToken) {
//			
//			log.debug("Authetication by customer specific login");
//			
//			CustomerToken upToken = (CustomerToken) token;
//			String username = upToken.getUsername();
//	
//			// Null username is invalid
//			if (username == null) {
//				throw new AccountException(
//						"Null usernames are not allowed by this realm.");
//			}
//	
//			try {
//				
//				String password = getPasswordForUser(username, upToken.getCustomer());
//	
//				if (password == null) {
//					throw new UnknownAccountException("No account found for user ["
//							+ username + "]");
//				}
//	
//				Vector<String> principals = new Vector<String>();
//				principals.add(username);
//				principals.add(upToken.getCustomer());
//				
//				info = new SimpleAuthenticationInfo(principals,
//						password.toCharArray(), getName());
//	
//			} catch (Exception e) {
//				
//				final String message = "There was an error while authenticating user ["
//						+ username + "]";
//				/*
//				if (log.isErrorEnabled()) {
//					log.error(message, e);
//				}*/
//	
//				throw new AuthenticationException(message, e);
//			}
//	
//			return info;
//			
//		} else 
		if (token instanceof UsernamePasswordToken) {
			
			log.debug("Authetication by login");
			
			UsernamePasswordToken upToken = (UsernamePasswordToken) token;
			String username = upToken.getUsername();
	
			// Null username is invalid
			if (username == null) {
				throw new AccountException(
						"Null usernames are not allowed by this realm.");
			}
	
			try {
				
				String password = getPasswordForUser(username);
	
				if (password == null) {
					throw new UnknownAccountException("No account found for user ["
							+ username + "]");
				}
	
				info = new SimpleAuthenticationInfo(username,
						password.toCharArray(), getName());
	
			} catch (Exception e) {
				final String message = "There was an error while authenticating user ["
						+ username + "]";
				if (log.isErrorEnabled()) {
					log.error(message, e);
				}
	
				throw new AuthenticationException(message, e);
			}
	
			return info;
		}
		
		return info;
	}

	private String getPasswordForUser(String username) {
		return getPasswordForUser(username, null);
	}
	
	private String getPasswordForUser(String username, String customer) {

		String result = null;
		
		User existingUser = mongoOperations.findOne(new Query(
                Criteria.where("username").is(username)
            ), User.class);
		
		if (existingUser != null) {
			result = existingUser.getPassword();
		}

		return result;
	}

	
	@SuppressWarnings("rawtypes")
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(
			PrincipalCollection principals) {

		// null usernames are invalid
		if (principals == null) {
			throw new AuthorizationException(
					"PrincipalCollection method argument cannot be null.");
		}

		
		String username = (String) getAvailablePrincipal(principals);
		
		Set<String> roleNames = null;
		Set<String> permissions = null;
		
		User existingUser = mongoOperations.findOne(new Query(
                Criteria.where("username").is(username)
            ), User.class);
		if (existingUser != null) {
			
			List<Role> roles = existingUser.getRoles();	
			roleNames = extractRoleNames(roles);
			
			if (permissionsLookupEnabled) {
				permissions = extractPermissions(roles);
			}
		}
		
		SimpleAuthorizationInfo info = new SimpleAuthorizationInfo(roleNames);
		info.setStringPermissions(permissions);
		return info;

	}

	protected Set<String> extractRoleNames(List<Role> roles) {
		
		Set<String> roleNames = new LinkedHashSet<String>();
		
		if (roles != null) for (int r=0; r < roles.size(); r++ ) {
				roleNames.add(roles.get(r).getRoleName());
			
		}
	
		return roleNames;
		
	}
	

	protected Set<String> extractPermissions(List<Role> roles)  {
		
		Set<String> permissionNames = new LinkedHashSet<String>();
	
//		if (roles != null) for (int r=0; r < roles.size(); r++ ) {
//			
//			List<Permission>permissions = roles.get(r).getPermissions();
//			if (permissions != null) for (int p=0; p < permissions.size(); p++ ) {
//				permissionNames.add(permissions.get(p).getName());
//			
//			}
//		
//		}

		return permissionNames;
	}

	
}
