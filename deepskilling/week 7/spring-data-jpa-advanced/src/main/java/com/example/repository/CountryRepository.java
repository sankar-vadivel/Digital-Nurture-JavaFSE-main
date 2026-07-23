package com.example.repository;

import com.example.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

    // Query Methods
    List<Country> findByCountryNameContaining(String text);
    List<Country> findByCountryNameStartingWith(String prefix);
    List<Country> findTop2ByOrderByCountryNameAsc();

    // HQL / JPQL Query
    @Query("SELECT c FROM Country c WHERE c.countryCode = :code")
    Country getCountryByCodeHql(@Param("code") String code);

    // Native Query
    @Query(value = "SELECT * FROM country WHERE country_name LIKE %:keyword%", nativeQuery = true)
    List<Country> searchCountriesNative(@Param("keyword") String keyword);
}
