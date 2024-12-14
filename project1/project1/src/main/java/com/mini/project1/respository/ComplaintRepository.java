package com.mini.project1.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mini.project1.entity.Complaint;

@Repository
public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    public List<Complaint> findAllByUserId(long userId);

    public List<Complaint> findByStatus(String pending);

}
