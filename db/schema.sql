DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
   id INTEGER AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR (30) NOT NULL
);

CREATE TABLE roles (
   id INTEGER AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL(8,2) NOT NULL,
   departmentId INTEGER,
   CONSTRAINT fk_department 
      FOREIGN KEY (departmentId) 
      REFERENCES departments (id) 
      ON DELETE SET NULL
);

CREATE TABLE employees (
   id INTEGER AUTO_INCREMENT PRIMARY KEY,
   firstName VARCHAR(30) NOT NULL,
   lastName VARCHAR(30) NOT NULL,
   roleId INTEGER,
   managerId INTEGER,
   CONSTRAINT fk_role 
      FOREIGN KEY (roleId) 
      REFERENCES roles (id) 
      ON DELETE SET NULL,
   CONSTRAINT fk_manager 
      FOREIGN KEY (managerId)
      REFERENCES employees (id) 
      ON DELETE SET NULL
);