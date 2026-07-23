package com.example.entity;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name = "skill")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany(mappedBy = "skills")
    private Set<Employee> employees = new HashSet<>();

    public Skill() {}

    public Skill(String name) {
        this.name = name;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public Set<Employee> getEmployees() { return employees; }
}
