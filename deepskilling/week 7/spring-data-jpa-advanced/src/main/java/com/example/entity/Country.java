package com.example.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "country")
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "country_code", unique = true, nullable = false)
    private String countryCode;

    @Column(name = "country_name", nullable = false)
    private String countryName;

    public Country() {}

    public Country(String countryCode, String countryName) {
        this.countryCode = countryCode;
        this.countryName = countryName;
    }

    public Long getId() { return id; }
    public String getCountryCode() { return countryCode; }
    public String getCountryName() { return countryName; }

    @Override
    public String toString() {
        return "Country{code='" + countryCode + "', name='" + countryName + "'}";
    }
}
