package com.mini.project1.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mini.project1.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

    Users findByUsernameAndPassword(String username, String password);

    Users findByUsernameAndEmail(String username, String email);

    Users findByEmailAndPassword(String email, String password);

    Users findByEmail(String email);

}
