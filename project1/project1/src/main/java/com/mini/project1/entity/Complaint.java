package com.mini.project1.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class Complaint {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private long userId;

    @Column
    private String complaintType;

    @Column(columnDefinition = "TEXT")
    private String image;

    @Column
    private String description;

    @Column
    private String status;

    @Column
    private long contactNumber;

    @Column
    private long upvote;

    @Column
    private long downvote;
}
