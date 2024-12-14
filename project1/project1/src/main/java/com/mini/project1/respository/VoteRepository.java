package com.mini.project1.respository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mini.project1.entity.Votes;

@Repository
public interface VoteRepository extends JpaRepository<Votes, Long> {

    Votes findByComplaintIdAndUserId(Long complaintId, Long userId);
    
}
