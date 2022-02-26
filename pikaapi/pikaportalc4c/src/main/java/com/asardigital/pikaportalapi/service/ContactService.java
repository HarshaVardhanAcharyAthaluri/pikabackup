package com.asardigital.pikaportalapi.service;

import java.util.List;

import com.asardigital.pikaportalapi.model.Contact;


public interface ContactService {

	public Contact updateContact(Long contactId,Contact contact);
	public String deleteContact(Long contactId);
	public List<Contact> getAllContacts(); 
	public Contact getContactById(Long contactId);
}
