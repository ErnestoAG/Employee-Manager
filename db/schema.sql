DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

\c company_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    salary DECIMAL NOT NULL,
    title VARCHAR(30) NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employee (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
);