package com.asardigital.pikaportalapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asardigital.pikaportalapi.model.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long>{

	Optional<Contact> findByName(String name);
	Optional<Contact> findByEmail(String email);
	Boolean existsByName(String name);
	Boolean existsByEmail(String email);
}
