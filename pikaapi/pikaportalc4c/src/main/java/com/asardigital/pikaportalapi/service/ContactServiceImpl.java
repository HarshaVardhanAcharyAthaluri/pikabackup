package com.asardigital.pikaportalapi.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.asardigital.pikaportalapi.model.Contact;
import com.asardigital.pikaportalapi.repository.ContactRepository;

@Service
public class ContactServiceImpl implements ContactService{

	@Autowired
	ContactRepository contactRepository;
	
	@Override
	public List<Contact> getAllContacts() {
		return contactRepository.findAll();
	}

	@Override
	public Contact getContactById(Long contactId) {
		return contactRepository.findById(contactId).orElse(null);
	}
	
	@Override
	public Contact updateContact(Long contactId, Contact contact) {
		Optional<Contact> cont = contactRepository.findById(contactId);
		Contact existingCont = null;
		if(cont.isPresent()) {
			existingCont = cont.get();
			if(contact.getName()!=null)
				existingCont.setName(contact.getName());
			if(contact.getEmail()!=null)
				existingCont.setEmail(contact.getEmail());
		}
		 contactRepository.save(existingCont);
		 return existingCont;
	}

	@Override
	public String deleteContact(Long contactId) {
		Contact contact = contactRepository.findById(contactId).orElse(null);
		if(contact==null) {
				return "Contact Not Found with "+ contactId; 
		}
		String contactName = contact.getName();
		contactRepository.deleteById(contactId);
		return contactName+ " removed Successfully";
	}

}
