package com.mini.project1.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mini.project1.entity.Votes;
import com.mini.project1.respository.VoteRepository;

@Service
public class VoteService {
    
    @Autowired 
    private VoteRepository voteRepository;

    public void vote(long complaintId, long userId) {
        Votes vote=Votes.builder().complaintId(complaintId).userId(userId).build();
        voteRepository.save(vote);
    }

    public boolean getVote(long complaintId, long userId) {
        Votes vote=voteRepository.findByComplaintIdAndUserId(complaintId, userId);
        return vote==null;
    }
}
