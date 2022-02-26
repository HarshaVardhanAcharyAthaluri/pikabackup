package com.asardigital.pikaportalapi.security.payloads;

import java.util.Set;

import com.asardigital.pikaportalapi.model.Customer;

public class ContactReaquest {

	  private String name;
		 
	    private String email;
	    
	    private Set<String> role;
	    
	    private String password;
	    
	    private Customer refCustomeId;
	    
	    private Long contactId;

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public Set<String> getRole() {
			return role;
		}

		public void setRole(Set<String> role) {
			this.role = role;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public Customer getRefCustomeId() {
			return refCustomeId;
		}

		public void setRefCustomeId(Customer refCustomeId) {
			this.refCustomeId = refCustomeId;
		}

		public Long getContactId() {
			return contactId;
		}

		public void setContactId(Long contactId) {
			this.contactId = contactId;
		}

		
}
