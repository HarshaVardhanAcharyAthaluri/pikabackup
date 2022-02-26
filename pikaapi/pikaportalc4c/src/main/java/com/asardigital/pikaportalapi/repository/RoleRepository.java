package com.asardigital.pikaportalapi.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.asardigital.pikaportalapi.model.Role;
import com.asardigital.pikaportalapi.model.RoleEntity;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity, Long>{

	Optional<RoleEntity> findByRole(Role role);
}
