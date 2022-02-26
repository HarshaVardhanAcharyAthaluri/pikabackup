package com.asardigital.pikaportalapi.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.asardigital.pikaportalapi.model.Contact;
import com.asardigital.pikaportalapi.model.Employee;
import com.asardigital.pikaportalapi.model.Role;
import com.asardigital.pikaportalapi.model.RoleEntity;
import com.asardigital.pikaportalapi.repository.ContactRepository;
import com.asardigital.pikaportalapi.repository.EmployeeRepository;
import com.asardigital.pikaportalapi.repository.RoleRepository;
import com.asardigital.pikaportalapi.security.JwtUtils;
import com.asardigital.pikaportalapi.security.payloads.ContactReaquest;
import com.asardigital.pikaportalapi.security.payloads.JwtResponse;
import com.asardigital.pikaportalapi.security.payloads.LoginRequest;
import com.asardigital.pikaportalapi.security.payloads.MessageResponse;
import com.asardigital.pikaportalapi.security.payloads.SignupRequest;
import com.asardigital.pikaportalapi.service.ContactDetailsImpl;
import com.asardigital.pikaportalapi.service.EmployeeDetailsImpl;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	@Qualifier("contactAuthenticationManager")
	AuthenticationManager contactAuthenticationManager;
	
	
	@Autowired
	AuthenticationManager employeeAuthenticationManager;
	

	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	ContactRepository contactRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
		Authentication authentication = employeeAuthenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		EmployeeDetailsImpl employeeDetails = (EmployeeDetailsImpl) authentication.getPrincipal();		
		List<String> roles = employeeDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, employeeDetails.getId(), employeeDetails.getUsername(),
				employeeDetails.getEmail(), roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
		if (employeeRepository.existsByName(signUpRequest.getName())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (employeeRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		Employee employee = new Employee(signUpRequest.getName(), 
							 signUpRequest.getEmail(),
							 encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRole();
		Set<RoleEntity> roles = new HashSet<>();

		if (strRoles == null) {
			RoleEntity employeerole = roleRepository.findByRole(Role.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(employeerole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					RoleEntity adminRole = roleRepository.findByRole(Role.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				default:
					RoleEntity userRole = roleRepository.findByRole(Role.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		employee.setRoles(roles);
		employee.setCompanyName(signUpRequest.getCompanyName());
		employeeRepository.save(employee);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
	
	@PostMapping("/contact/signin")
	public ResponseEntity<?> authenticateContact(@RequestBody LoginRequest loginRequest) {

		Authentication authentication = contactAuthenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		
		ContactDetailsImpl contactDetails = (ContactDetailsImpl) authentication.getPrincipal();		
		List<String> roles = contactDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt, contactDetails.getId(), contactDetails.getUsername(),
				contactDetails.getEmail(), roles));
	}
	
	@PostMapping("/contact/signup")
	public ResponseEntity<?> registerContact(@RequestBody ContactReaquest contactRequest) {
		if (contactRepository.existsByName(contactRequest.getName())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (contactRepository.existsByEmail(contactRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}

		// Create new user's account
		Contact contact = new Contact(contactRequest.getName(),	contactRequest.getEmail(), encoder.encode(contactRequest.getPassword()),contactRequest.getRefCustomeId(),contactRequest.getContactId());

		Set<String> strRoles = contactRequest.getRole();
		Set<RoleEntity> roles = new HashSet<>();

		if (strRoles == null) {
			RoleEntity contactRole = roleRepository.findByRole(Role.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role not found."));
			roles.add(contactRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "user":
					RoleEntity adminRole = roleRepository.findByRole(Role.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				default:
					RoleEntity userRole = roleRepository.findByRole(Role.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}

		contact.setRoles(roles);
		contactRepository.save(contact);

		return ResponseEntity.ok(new MessageResponse("Contact registered successfully!"));
	}
}
