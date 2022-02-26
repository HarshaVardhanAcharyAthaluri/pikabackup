package com.asardigital.pikaportalapi.security.payloads;

import java.util.Set;

public class SignupRequest {

	    private String name;
	 
	    private String email;
	    
	    private Set<String> role;
	    
	    private String password;
	    
	    private String companyName;

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

		public String getCompanyName() {
			return companyName;
		}

		public void setCompanyName(String companyName) {
			this.companyName = companyName;
		}
	  
	    
}
