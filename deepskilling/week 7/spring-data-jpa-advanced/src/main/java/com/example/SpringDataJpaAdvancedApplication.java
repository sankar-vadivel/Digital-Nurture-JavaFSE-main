package com.example;

import com.example.entity.*;
import com.example.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class SpringDataJpaAdvancedApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringDataJpaAdvancedApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(CountryRepository countryRepo, EmployeeRepository empRepo) {
        return args -> {
            System.out.println("=== Week 7: Advanced Spring Data JPA & ORM Demo ===\n");

            // 1. Save Countries
            countryRepo.save(new Country("IND", "India"));
            countryRepo.save(new Country("USA", "United States"));
            countryRepo.save(new Country("IDN", "Indonesia"));
            countryRepo.save(new Country("GBR", "United Kingdom"));

            // Query Methods Demo
            System.out.println("-- Query Method: Containing 'In' --");
            countryRepo.findByCountryNameContaining("In").forEach(System.out::println);

            System.out.println("\n-- Query Method: Starting With 'Un' --");
            countryRepo.findByCountryNameStartingWith("Un").forEach(System.out::println);

            // HQL & Native Query Demo
            System.out.println("\n-- HQL Query: Get IND --");
            System.out.println(countryRepo.getCountryByCodeHql("IND"));

            System.out.println("\n-- Native Query: Keyword 'dia' --");
            countryRepo.searchCountriesNative("dia").forEach(System.out::println);

            // 2. ORM Mapping Demo (Department - Employee - Skill)
            Department dept = new Department("Engineering");
            Employee emp1 = new Employee("Rajakumaran P", 85000.0);
            Employee emp2 = new Employee("Priya Sharma", 92000.0);

            Skill javaSkill = new Skill("Java 17");
            Skill springSkill = new Skill("Spring Boot 3");

            emp1.addSkill(javaSkill);
            emp1.addSkill(springSkill);
            emp2.addSkill(javaSkill);

            dept.addEmployee(emp1);
            dept.addEmployee(emp2);

            empRepo.save(emp1);
            empRepo.save(emp2);

            System.out.println("\n-- JPQL Query: Employees in Engineering --");
            empRepo.findByDepartmentName("Engineering").forEach(e -> 
                System.out.println("Employee: " + e.getName() + " | Salary: Rs." + e.getSalary())
            );
        };
    }
}
