package com.reversebid.rest.api.utils;

import java.util.Iterator;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.validation.ConstraintViolation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.NoSuchMessageException;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;

import com.reversebid.domain.api.FailureResponseDTO;

@Component
public class ErrorUtils {

	@Autowired
	private MessageSource messageSource;

	@Autowired
	private javax.validation.Validator validator;

	public FailureResponseDTO processFieldErrors(List<FieldError> fieldErrors) {
		FailureResponseDTO failureResponseDTO = new FailureResponseDTO();

		for (FieldError fieldError : fieldErrors) {
			String localizedErrorMessage = resolveLocalizedErrorMessage(fieldError);
			failureResponseDTO.addFieldError(fieldError.getField(), localizedErrorMessage);
		}

		return failureResponseDTO;
	}

	private String resolveLocalizedErrorMessage(FieldError fieldError) {
		Locale currentLocale = LocaleContextHolder.getLocale();
		String localizedErrorMessage = null;
		try {
			localizedErrorMessage = messageSource.getMessage(fieldError, currentLocale);
		} catch (NoSuchMessageException e) {
			String[] fieldErrorCodes = fieldError.getCodes();
			localizedErrorMessage = fieldErrorCodes[fieldErrorCodes.length - 1];
		}
		return localizedErrorMessage;
	}

	public String resolveLocalizedErrorMessage(String errorCode) {
		Locale currentLocale = LocaleContextHolder.getLocale();
		String localizedErrorMessage = null;
		try {
			localizedErrorMessage = messageSource.getMessage(errorCode, null, currentLocale);
		} catch (NoSuchMessageException e) {
			localizedErrorMessage = errorCode;
		}
		return localizedErrorMessage;
	}

	public FailureResponseDTO validateBean(Object bean) {
		Set<ConstraintViolation<Object>> constraintViolations = validator.validate(bean);
		FailureResponseDTO failureResponseDTO = new FailureResponseDTO();
		Iterator<ConstraintViolation<Object>> i = constraintViolations.iterator();
		while (i.hasNext()) {
			ConstraintViolation<?> error = i.next();
			String localizedErrorMessage = resolveLocalizedErrorMessage(error.getMessageTemplate());
			failureResponseDTO.addFieldError(error.getPropertyPath().toString(), localizedErrorMessage);
		}
		if (failureResponseDTO.getErrors().isEmpty()) {
			return new FailureResponseDTO();
		}
		return failureResponseDTO;
	}
	
	/*public void verifyReCaptcha(String remoteAddress, String reCaptchaChallenge, String reCaptchaUserResponse, FailureResponseDTO errors) {
        ReCaptchaImpl reCaptcha = new ReCaptchaImpl();
        reCaptcha.setPrivateKey(UI_Constants.RE_CAPTCHA_PRIVATE_KEY);
        ReCaptchaResponse reCaptchaResponse = reCaptcha.checkAnswer(remoteAddress, reCaptchaChallenge, reCaptchaUserResponse);

        if (!reCaptchaResponse.isValid()) {
        	errors.addFieldError("reCaptchaResponse", "recaptcha.response.incorrect");
        }
	}*/

	public void setMessageSource(MessageSource messageSource) {
		this.messageSource = messageSource;
	}

}
