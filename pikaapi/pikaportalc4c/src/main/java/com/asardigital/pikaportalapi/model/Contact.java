package com.asardigital.pikaportalapi.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "contact", uniqueConstraints = { @UniqueConstraint(columnNames = "name"), @UniqueConstraint(columnNames = "email") })
public class Contact {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Long contactId;
	private String name;
	private String email;
	@JsonIgnore
	private String password;

	@OneToOne(cascade = CascadeType.MERGE)
	@JoinColumn(name = "contact_cutomer_id", referencedColumnName = "id")
	private Customer refCustomeId;
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "contact_roles",joinColumns  = @JoinColumn(name = "contact_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<RoleEntity> roles = new HashSet<>();
	
	public Contact() {
	}
	
	public Contact(String name, String email, String password,Customer refCustomeId,Long contactId) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.refCustomeId = refCustomeId;
		this.contactId = contactId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

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

	public Set<RoleEntity> getRoles() {
		return roles;
	}

	public void setRoles(Set<RoleEntity> roles) {
		this.roles = roles;
	}

	public Long getContactId() {
		return contactId;
	}

	public void setContactId(Long contactId) {
		this.contactId = contactId;
	}
	
	
	
}
