package com.asardigital.pikaportalapi.service;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.core.annotation.Order;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.asardigital.pikaportalapi.model.Employee;
import com.fasterxml.jackson.annotation.JsonIgnore;


public class EmployeeDetailsImpl implements UserDetails{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4393123156692725170L;

	private Long id;

	private String name;

	private String email;

	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> authorities;

	public EmployeeDetailsImpl(Long id, String name, String email, String password,	Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
	}

	public static EmployeeDetailsImpl build(Employee employee) {
		
		List<GrantedAuthority> authorities = employee.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getRole().name()))
				.collect(Collectors.toList());

		return new EmployeeDetailsImpl(
				employee.getId(), 
				employee.getName(), 
				employee.getEmail(),
				employee.getPassword(), 
				authorities);
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
		EmployeeDetailsImpl employee = (EmployeeDetailsImpl) o;
		return Objects.equals(id, employee.id);
	}

}
