package com.asardigital.pikaportalapi.configurations;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.asardigital.pikaportalapi.model.Employee;
import com.asardigital.pikaportalapi.model.Role;
import com.asardigital.pikaportalapi.model.RoleEntity;
import com.asardigital.pikaportalapi.repository.EmployeeRepository;
import com.asardigital.pikaportalapi.repository.RoleRepository;

@Configuration
public class DefultSqlRecords {

	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	
	
	public DefultSqlRecords() {
		
		
	}
	public DefultSqlRecords(RoleRepository roleRepository,EmployeeRepository employeeRepository) {
		this.roleRepository = roleRepository;
		this.employeeRepository = employeeRepository;
	}
	
	
	@Bean
	public Employee insertDefultEmployee() {
		if(!employeeRepository.findByName("admin").isPresent()) {
			RoleEntity adminRole =  new RoleEntity();
			if(!roleRepository.findByRole(Role.ROLE_ADMIN).isPresent()) {
				adminRole.setRole(Role.ROLE_ADMIN);
				roleRepository.save(adminRole);
			}
			
			if(!roleRepository.findByRole(Role.ROLE_USER).isPresent()) {
				RoleEntity userRole =  new RoleEntity();
				userRole.setRole(Role.ROLE_USER);
				roleRepository.save(userRole);
			}
			Set<RoleEntity> defultRole = new HashSet<RoleEntity>();
			defultRole.add(adminRole);
			PasswordEncoder passwordEncoder =  new BCryptPasswordEncoder();
			Employee employee = new Employee();
			employee.setName("admin");
			employee.setCompanyName("devlabs");
			employee.setEmail("admin@devlabs.com");
			employee.setPassword(passwordEncoder.encode("admin"));
			employee.setRoles(defultRole);
			employeeRepository.save(employee);
		}
		return employeeRepository.findByName("admin").get();
	}
	
	
}
