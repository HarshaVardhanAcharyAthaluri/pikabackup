package com.asardigital.pikaportalapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asardigital.pikaportalapi.model.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long>{
	
	Optional<Employee> findByName(String name);
	Optional<Employee> findByEmail(String email);
	Boolean existsByName(String name);
	Boolean existsByEmail(String email);

}
