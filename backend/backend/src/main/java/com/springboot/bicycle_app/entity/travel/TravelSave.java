package com.springboot.bicycle_app.entity.travel;

import com.springboot.bicycle_app.dto.travel.TravelSaveDto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name="travel_save")
@Getter
@Setter
public class TravelSave {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sid;

    @Column(name="uid", length = 30, nullable = false)
    private String uid;

    @Column(name="fid", columnDefinition = "JSON")
    private String fid;

    @Column(name="hid", columnDefinition = "JSON")
    private String hid;

    @Column(name="rid", columnDefinition = "JSON")
    private String rid;
}