package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.example.model.Employee;
import com.example.service.EmployeeService;

@SpringBootApplication
public class EmployeeApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(EmployeeApplication.class, args);
        
        EmployeeService service = context.getBean(EmployeeService.class);
        
        // Let's create and add an employee using our Spring Data JPA setup
        Employee emp = new Employee("Jane Doe");
        System.out.println("Adding employee: " + emp);
        service.addEmployee(emp);
        
        System.out.println("All employees in database:");
        service.getAllEmployees().forEach(System.out::println);
    }
}
