package com.asardigital.pikaportalapi.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.asardigital.pikaportalapi.model.Contact;
import com.asardigital.pikaportalapi.service.ContactService;

@RestController
public class ContactController {
	
	@Autowired
	ContactService contactService;
	
	@GetMapping("/contact/all")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<List<Contact>> getAllContacts(){
		return new ResponseEntity<List<Contact>>(contactService.getAllContacts(),HttpStatus.OK);
	}
	
	@GetMapping("/contact/{contactId}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<Contact> getContactById(@PathVariable Long contactId){
		return new ResponseEntity<Contact>(contactService.getContactById(contactId),HttpStatus.OK);
	}
	
	@PutMapping("/contact/{contactId}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
	public ResponseEntity<Contact> updateContact(@PathVariable("contactId") Long contactId,@RequestBody Contact contact){
		Contact existContact = contactService.updateContact(contactId, contact);
		return new ResponseEntity<Contact>(existContact,HttpStatus.CREATED);
	}
	
	@DeleteMapping("/contact/{contactId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<String> deleteContact(@PathVariable("contactId") Long contactId){
		return new ResponseEntity<String>(contactService.deleteContact(contactId),HttpStatus.OK);
	}
}
