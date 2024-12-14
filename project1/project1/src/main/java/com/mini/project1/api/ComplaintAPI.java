package com.mini.project1.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mini.project1.entity.Complaint;
import com.mini.project1.service.ComplaintService;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/complaint")
public class ComplaintAPI {
    
    @Autowired
    private ComplaintService complaintService;


    @CrossOrigin
    @PostMapping("/register")
    public ResponseEntity<Long> registerComplaint(@RequestBody Complaint complaint) {
        System.out.println(complaint);
        return ResponseEntity.ok(complaintService.registerComplaint(complaint));
    }

    @CrossOrigin
    @PutMapping("/upvote/{complaintId}/{userId}")
    public ResponseEntity<Long> upVote(@PathVariable long complaintId, @PathVariable long userId) {
        long upvote = complaintService.upVote(complaintId, userId);
        return ResponseEntity.ok(upvote);
    }

    @CrossOrigin
    @PutMapping("/downvote/{complaintId}/{userId}")
    public ResponseEntity<Long> downVote( @PathVariable long complaintId, @PathVariable long userId) {
        long downvote = complaintService.downvote(complaintId, userId);
        return ResponseEntity.ok(downvote);
    }

    @CrossOrigin
    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody Complaint complaint) {
        complaintService.update(complaint);
        return ResponseEntity.ok("Update successful");
    }

    @CrossOrigin
    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    @CrossOrigin
    @GetMapping("/incomplete")
    public ResponseEntity<List<Complaint>> incompleteComplaints() {
        return ResponseEntity.ok(complaintService.incompleteComplaints());
    }

    @CrossOrigin
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Complaint>> findAllByUserId(@PathVariable long userId) {
        return ResponseEntity.ok(complaintService.findAllByUserId(userId));
    }

}
