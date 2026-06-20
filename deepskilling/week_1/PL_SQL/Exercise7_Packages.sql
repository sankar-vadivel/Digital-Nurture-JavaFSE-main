CREATE OR REPLACE PACKAGE CustomerManagement AS
    PROCEDURE AddNewCustomer(p_id IN NUMBER, p_name IN VARCHAR2, p_dob IN DATE, p_balance IN NUMBER);
    PROCEDURE UpdateCustomerDetails(p_id IN NUMBER, p_name IN VARCHAR2);
    FUNCTION GetCustomerBalance(p_id IN NUMBER) RETURN NUMBER;
END CustomerManagement;
/

CREATE OR REPLACE PACKAGE BODY CustomerManagement AS
    PROCEDURE AddNewCustomer(p_id IN NUMBER, p_name IN VARCHAR2, p_dob IN DATE, p_balance IN NUMBER) IS
    BEGIN
        INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified)
        VALUES (p_id, p_name, p_dob, p_balance, SYSDATE);
        COMMIT;
    END AddNewCustomer;

    PROCEDURE UpdateCustomerDetails(p_id IN NUMBER, p_name IN VARCHAR2) IS
    BEGIN
        UPDATE Customers
        SET Name = p_name
        WHERE CustomerID = p_id;
        COMMIT;
    END UpdateCustomerDetails;

    FUNCTION GetCustomerBalance(p_id IN NUMBER) RETURN NUMBER IS
        v_balance NUMBER;
    BEGIN
        SELECT Balance INTO v_balance FROM Customers WHERE CustomerID = p_id;
        RETURN v_balance;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 0;
    END GetCustomerBalance;
END CustomerManagement;
/

CREATE OR REPLACE PACKAGE EmployeeManagement AS
    PROCEDURE HireNewEmployee(p_id IN NUMBER, p_name IN VARCHAR2, p_position IN VARCHAR2, p_salary IN NUMBER, p_dept IN VARCHAR2);
    PROCEDURE UpdateEmployeeDetails(p_id IN NUMBER, p_position IN VARCHAR2, p_salary IN NUMBER);
    FUNCTION CalculateAnnualSalary(p_id IN NUMBER) RETURN NUMBER;
END EmployeeManagement;
/

CREATE OR REPLACE PACKAGE BODY EmployeeManagement AS
    PROCEDURE HireNewEmployee(p_id IN NUMBER, p_name IN VARCHAR2, p_position IN VARCHAR2, p_salary IN NUMBER, p_dept IN VARCHAR2) IS
    BEGIN
        INSERT INTO Employees (EmployeeID, Name, Position, Salary, Department, HireDate)
        VALUES (p_id, p_name, p_position, p_salary, p_dept, SYSDATE);
        COMMIT;
    END HireNewEmployee;

    PROCEDURE UpdateEmployeeDetails(p_id IN NUMBER, p_position IN VARCHAR2, p_salary IN NUMBER) IS
    BEGIN
        UPDATE Employees
        SET Position = p_position, Salary = p_salary
        WHERE EmployeeID = p_id;
        COMMIT;
    END UpdateEmployeeDetails;

    FUNCTION CalculateAnnualSalary(p_id IN NUMBER) RETURN NUMBER IS
        v_salary NUMBER;
    BEGIN
        SELECT Salary INTO v_salary FROM Employees WHERE EmployeeID = p_id;
        RETURN v_salary * 12;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RETURN 0;
    END CalculateAnnualSalary;
END EmployeeManagement;
/

CREATE OR REPLACE PACKAGE AccountOperations AS
    PROCEDURE OpenNewAccount(p_acc_id IN NUMBER, p_cust_id IN NUMBER, p_type IN VARCHAR2, p_balance IN NUMBER);
    PROCEDURE CloseAccount(p_acc_id IN NUMBER);
    FUNCTION GetTotalBalance(p_cust_id IN NUMBER) RETURN NUMBER;
END AccountOperations;
/

CREATE OR REPLACE PACKAGE BODY AccountOperations AS
    PROCEDURE OpenNewAccount(p_acc_id IN NUMBER, p_cust_id IN NUMBER, p_type IN VARCHAR2, p_balance IN NUMBER) IS
    BEGIN
        INSERT INTO Accounts (AccountID, CustomerID, AccountType, Balance, LastModified)
        VALUES (p_acc_id, p_cust_id, p_type, p_balance, SYSDATE);
        COMMIT;
    END OpenNewAccount;

    PROCEDURE CloseAccount(p_acc_id IN NUMBER) IS
    BEGIN
        DELETE FROM Accounts WHERE AccountID = p_acc_id;
        COMMIT;
    END CloseAccount;

    FUNCTION GetTotalBalance(p_cust_id IN NUMBER) RETURN NUMBER IS
        v_total NUMBER;
    BEGIN
        SELECT SUM(Balance) INTO v_total FROM Accounts WHERE CustomerID = p_cust_id;
        RETURN NVL(v_total, 0);
    END GetTotalBalance;
END AccountOperations;
/
