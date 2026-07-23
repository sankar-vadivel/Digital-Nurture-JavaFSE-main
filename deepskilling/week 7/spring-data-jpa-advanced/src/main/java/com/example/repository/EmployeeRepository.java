package com.example.repository;

import com.example.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // JPQL Query for High Salary Employees
    @Query("SELECT e FROM Employee e WHERE e.salary >= :minSalary")
    List<Employee> findHighSalaryEmployees(double minSalary);

    // JPQL Inner Join Query
    @Query("SELECT e FROM Employee e JOIN e.department d WHERE d.name = :deptName")
    List<Employee> findByDepartmentName(String deptName);
}
