package com.mini.project1.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mini.project1.entity.Complaint;
import com.mini.project1.respository.ComplaintRepository;

@Service
public class ComplaintService {
    
    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private VoteService voteService;

    public long registerComplaint(Complaint complaint){
        complaint = complaintRepository.save(complaint);
        return complaint.getId();
    }

    public long upVote(long complaintId, long userId){
        Complaint complaint=complaintRepository.findById(complaintId).get();
        if(voteService.getVote(complaintId, userId)){
            complaint.setUpvote(complaint.getUpvote()+1);
            complaintRepository.save(complaint);
            voteService.vote(complaintId, userId);
        }
        return complaint.getUpvote();
    }

    public long downvote(long complaintId, long userId){
        Complaint complaint=complaintRepository.findById(complaintId).get();
        if(voteService.getVote(complaintId, userId)){
            voteService.vote(complaintId, userId);
            complaint.setDownvote(complaint.getDownvote()+1);
            complaintRepository.save(complaint);
        }
        return complaint.getDownvote();
    }

    public void update(Complaint complaint){
        Complaint complaint1=complaintRepository.findById(complaint.getId()).get();
        if(complaint1==null) return;
        complaint1.setImage(complaint.getImage());
        complaint1.setStatus(complaint.getStatus());
        complaintRepository.save(complaint1);
    }

    public List<Complaint> getAllComplaints() {
        List<Complaint> complaints=complaintRepository.findByStatus("Pending");
        return complaints;
    }

    public List<Complaint> findAllByUserId(long userId) {
        List<Complaint> complaints=complaintRepository.findAllByUserId(userId);
        return complaints;
    }

    public List<Complaint> incompleteComplaints()  {
        List<Complaint> complaints=complaintRepository.findByStatus("Pending");
        complaints.addAll(complaintRepository.findByStatus("In Progress"));
        return complaints;
    }
}
