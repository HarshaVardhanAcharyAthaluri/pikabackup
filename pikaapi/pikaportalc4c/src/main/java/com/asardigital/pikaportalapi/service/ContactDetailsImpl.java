package com.asardigital.pikaportalapi.service;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.core.annotation.Order;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.asardigital.pikaportalapi.model.Contact;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class ContactDetailsImpl implements UserDetails{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1617889403338341439L;

	private Long id;

	private String name;

	private String email;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public ContactDetailsImpl(Long id, String name, String email, String password,	Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
	}

	public static ContactDetailsImpl build(Contact contact) {
		List<GrantedAuthority> authorities = contact.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getRole().name()))
				.collect(Collectors.toList());
		return new ContactDetailsImpl(contact.getId(),contact.getName(),contact.getEmail(),contact.getPassword(),authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Long getId() {
		return id;
	}

	public String getEmail() {
		return email;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return name;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ContactDetailsImpl contact = (ContactDetailsImpl) o;
		return Objects.equals(id, contact.id);
	}

	
}
