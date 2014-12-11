package com.reversebid.rest.api.controller;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mongodb.BasicDBObject;
import com.mongodb.gridfs.GridFSDBFile;
import com.reversebid.service.MultimediaService;

@RestController
public class MultimediaController {
	
	@Autowired
	private MultimediaService service;
	
	
	@RequestMapping(value="/api/multimedia/1.0/upload", method=RequestMethod.POST)
    public @ResponseBody String handleFileUpload(
            @RequestParam("files[]") MultipartFile file){
		String name = file.getOriginalFilename();
        if (!file.isEmpty()) {
            try {
            	BasicDBObject metadata = new BasicDBObject();
                metadata.put("contentType", file.getContentType());
                service.saveImage(file.getInputStream(), name, metadata);
                return "You successfully uploaded " + name + " into " + name + " content type " + file.getContentType();
            } catch (Exception e) {
                return "You failed to upload " + name + " => " + e.getMessage();
            }
        } else {
            return "You failed to upload " + name + " because the file was empty.";
        }
    }
	
	@RequestMapping(value = "/api/multimedia/1.0/image/{name}")
    public @ResponseBody byte[] showImage(@PathVariable String name) {
        byte[] b;
        try {
        	GridFSDBFile file = service.getByFileName(name);
            if(file != null) {
            	b = IOUtils.toByteArray(file.getInputStream());
            	return b;
            }
        } catch(Exception ex) {
        	return ("Failed to get image by name " + name).getBytes();
        }
        
        return ("Failed to get image by name " + name).getBytes();
        
    }

}
