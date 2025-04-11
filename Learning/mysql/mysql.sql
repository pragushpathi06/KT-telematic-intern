CREATE DATABASE ktt-learning;


-- create table

CREATE TABLE intern_details (
  intern_id VARCHAR(10) PRIMARY KEY,
  name VARCHAR(20),
  gender CHAR(1) check (gender in('M','F','O')),
  dob DATE,
  college_mail_id VARCHAR(50) unique,
  personal_mail_id VARCHAR(50) unique,
  phone_number BIGINT,
  "10th_mark" FLOAT CHECK ("10th_mark" BETWEEN 0 AND 100),
  "12th_mark" FLOAT CHECK ("12th_mark" BETWEEN 0 AND 100),
  "Cgpa" FLOAT ("Cgpa" BETWEEN 0 AND 10),
  permanent_address VARCHAR(100),
  city VARCHAR(30),
  state VARCHAR(30),
  nationality VARCHAR(20) default 'Indian'
);


-- INSERT

insert into intern_details(
   intern_id, name, gender, dob, college_mail_id, personal_mail_id, phone_number,
  "10th_mark", "12th_mark","Cgpa", permanent_address, city, state, nationality
) values (
  'intern01','Pragushpathi','M','2002-10-06','pragushpathi.ct21@bitsathy.ac.in','pragushpathi06102002@gmail.com',
9895959834,64,79.6,7.81,'123 Main Street','Madurai','TamilNadu','Indian'
);

INSERT INTO intern_details (
  intern_id, name, gender, dob, college_mail_id, personal_mail_id, phone_number,
  "10th_mark", "12th_mark", "Cgpa", permanent_address, city, state, nationality
) VALUES (
  'intern02', 'Arjun', 'M', '2001-11-15', 
  'arjun@bitsathy.ac.in', 'arjun007@gmail.com', 9123456780,
  88.4, 86.2, 8.5, '456 Lake View', 'Salem', 'Tamil Nadu', 'Indian'
);

INSERT INTO intern_details (
  intern_id, name, gender, dob, college_mail_id, personal_mail_id, phone_number,
  "10th_mark", "12th_mark", "Cgpa", permanent_address, city, state
) VALUES (
  'intern03', 'Divya', 'F', '2002-02-08', 
  'divya@bitsathy.ac.in', 'divya_123@gmail.com', 9988776655,
  91.0, 94.0, 9.1, '12 Rose Garden', 'Erode', 'Tamil Nadu'
);

INSERT INTO intern_details (
  intern_id, name, gender, dob, college_mail_id, personal_mail_id, phone_number,
  "10th_mark", "12th_mark", "Cgpa", permanent_address, state
) VALUES (
  'intern04', 'Manoj', 'M', '2003-07-05', 
  'manoj@bitsathy.ac.in', 'manojmail@gmail.com', 9090909090,
  85.0, 82.5, 8.0, '89 Green Street', 'Karnataka'
);

INSERT INTO intern_details (
  intern_id, name, gender, dob, college_mail_id, phone_number,
  "10th_mark", "12th_mark", "Cgpa"
) VALUES (
  'intern05', 'Sneha', 'F', '2001-09-23', 
  'sneha@bitsathy.ac.in', 9876012345,
  97.0, 95.5, 9.6
);

INSERT INTO intern_details (
  intern_id, name, gender, dob, college_mail_id, phone_number,
  "10th_mark", "12th_mark", "Cgpa"
) VALUES (
  'intern06', 'Rahul M', 'M', '2002-01-15',
  'rahulm@bitsathy.ac.in', 9876543001,
  85.0, 88.0, 8.2
);

INSERT INTO intern_details (
  intern_id, name, gender, dob, college_mail_id, personal_mail_id, phone_number,
  "10th_mark", "12th_mark", "Cgpa", permanent_address, city, state
) VALUES (
  'intern07', 'Divya R', 'F', '2003-06-12',
  'divyar@bitsathy.ac.in', 'divya.raj@gmail.com', 9876543002,
  92.5, 94.0, 9.4, 'No.42 MG Street', 'Erode', 'Tamil Nadu'
);

INSERT INTO intern_details (
  intern_id, name, gender, dob, college_mail_id, phone_number,
  "10th_mark", "12th_mark", "Cgpa", city
) VALUES (
  'intern08', 'Karthik N', 'M', '2001-12-30',
  'karthikn@bitsathy.ac.in', 9876543003,
  78.5, 81.0, 7.8, 'Salem'
);

INSERT INTO intern_details (
  intern_id, name, gender, dob, college_mail_id, phone_number,
  "10th_mark", "12th_mark", "Cgpa", permanent_address
) VALUES (
  'intern09', 'Ananya V', 'F', '2002-10-10',
  'ananyav@bitsathy.ac.in', 9876543004,
  89.0, 91.5, 8.9, 'Flat 23, Green Towers'
);

INSERT INTO intern_details (
  intern_id, name, gender, dob, college_mail_id, phone_number,
  "10th_mark", "12th_mark", "Cgpa", state, nationality
) VALUES (
  'intern10', 'Vikram S', 'M', '2002-05-05',
  'vikrams@bitsathy.ac.in', 9876543005,
  90.0, 87.0, 8.5, 'Kerala', 'Indian'
);

INSERT INTO intern_details (
  intern_id, name, gender, dob, college_mail_id, personal_mail_id, phone_number,
  "10th_mark", "12th_mark", "Cgpa", permanent_address, city, state, nationality
) VALUES
  ('intern11', 'Sanjay D', 'M', '2001-08-08', 'sanjayd@bitsathy.ac.in', 'sanjay.dev@gmail.com', 9876543006, 91.0, 89.0, 8.7, '12 Pine Road', 'Coimbatore', 'Tamil Nadu', 'Indian'),
  ('intern12', 'Harini M', 'F', '2002-03-19', 'harinim@bitsathy.ac.in', NULL, 9876543007, 96.5, 98.2, 9.8, NULL, 'Madurai', 'Tamil Nadu', 'Indian'),
  ('intern13', 'Mohammed A', 'M', '2001-04-11', 'mohammeda@bitsathy.ac.in', 'mohammed.az@gmail.com', 9876543008, 88.0, 86.5, 8.4, '7 Crescent St', 'Tirunelveli', 'Tamil Nadu', 'Indian');


select * from intern_details;


delete from intern_details where intern_id!='intern01';

select * from intern_details where personal_mail_id is null and permanent_address is null and city is null and  state is null;

select * from intern_details where personal_mail_id is null or permanent_address is null or city is null or state is null;4

-- keyword SELECT, INSERT, UPDATE, DELETE
-- 
-- FROM, WHERE, AND, OR, NOT
-- 
-- IN, BETWEEN, LIKE, IS NULL
-- 
-- ORDER BY, GROUP BY, HAVING, DISTINCT
-- 
-- CREATE, ALTER, DROP, TABLE
-- 
-- PRIMARY KEY, FOREIGN KEY, UNIQUE, DEFAULT, CHECK
-- 
-- JOIN, ON, AS, LIMIT


create table student(roll_no int Primary key, name varchar(20), age DATE, city varchar(20));

truncate table student;

alter table intern_details add column role varchar(15) default 'intern'

select * from intern_details order by intern_id DESC limit 2

select * from intern_details where "10th_mark" = (select max("10th_mark") from intern_details);

select count(*) from intern_details

select * from  intern_details where "12th_mark" > 80;

SELECT gender, AVG("10th_mark") AS avg_10th
FROM intern_details
GROUP BY gender;

CREATE TABLE intern_project (
  intern_id VARCHAR(10),
  project_name VARCHAR(100),
  FOREIGN KEY (intern_id) REFERENCES intern_details(intern_id)
);

CREATE TABLE intern_certifications (
  intern_id VARCHAR(10),
  certification_name VARCHAR(100),
  issued_by VARCHAR(50),
  issue_date DATE,
  validity_months INT,
  FOREIGN KEY (intern_id) REFERENCES intern_details(intern_id)
);


INSERT INTO intern_certifications (intern_id, certification_name, issued_by, issue_date, validity_months)
VALUES 
  ('intern05', 'AWS Cloud Practitioner', 'Amazon', '2024-06-01', 36),
  ('intern06', 'Python for Data Science', 'Coursera', '2024-03-15', 12),
  ('intern09', 'Cybersecurity Essentials', 'Cisco', '2023-12-10', 24);


INSERT INTO intern_project (
  intern_id, project_name
) VALUES
  ('intern03', 'College Event Tracker'),
  ('intern04', 'Online Voting System'),
  ('intern05', 'Smart Attendance System'),
  ('intern06', 'Library Management Portal'),
  ('intern07', 'E-Waste Collection App'),
  ('intern08', 'Virtual Internship Dashboard'),
  ('intern09', 'Automated Resume Screener'),
  ('intern10', 'College Bus Tracking System'),
  ('intern12', 'Campus Placement Insights');




------------inner JOIN

SELECT d.intern_id, d.name, p.project_name
FROM intern_details d
INNER JOIN intern_project p ON d.intern_id = p.intern_id;

----------LEFT JOIN

SELECT d.intern_id, d.name, p.project_name
FROM intern_details d
LEFT JOIN intern_project p ON d.intern_id = p.intern_id;

SELECT d.intern_id, d.name, p.project_name
FROM intern_details d
LEFT JOIN intern_project p ON d.intern_id = p.intern_id order by intern_id;

----------RIGHT JOIN
SELECT d.intern_id, d.name, p.project_name
FROM intern_details d
RIGHT JOIN intern_project p ON d.intern_id = p.intern_id;


--------------FULL OUTER JOIN
SELECT d.intern_id, d.name, p.project_name
FROM intern_details d
FULL OUTER JOIN intern_project p ON d.intern_id = p.intern_id;

---------------SELF JOIN
SELECT DISTINCT A.intern_id AS intern1, B.intern_id AS intern2, A.city
FROM intern_details A
JOIN intern_details B 
  ON A.city = B.city 
  AND A.intern_id < B.intern_id;


SELECT DISTINCT A.intern_id AS intern1, B.intern_id AS intern2, A.city
FROM intern_details A
JOIN intern_details B 
  ON A.city = B.city 
  AND A.intern_id <> B.intern_id;


----subquery

SELECT name, (SELECT MAX("Cgpa") FROM intern_details) AS max_cgpa
FROM intern_details;

-----Column Subquery
SELECT name
FROM intern_details
WHERE intern_id IN (
  SELECT intern_id
  FROM intern_project
);

------Row Subquery

SELECT name
FROM intern_details
WHERE (intern_id, city) = (
  SELECT intern_id, city
  FROM intern_details
  WHERE name = 'Sneha'
);

-------table subquery
SELECT *
FROM (
  SELECT intern_id, "Cgpa"
  FROM intern_details
  WHERE "Cgpa" > 9
) AS high_cgpa_interns;


---view
CREATE VIEW intern_summary AS
SELECT intern_id, name, "10th_mark", "12th_mark", "Cgpa"
FROM intern_details
WHERE "Cgpa" > 8.5;

---------Modifying Views (Replace)
CREATE OR REPLACE VIEW intern_summary AS
SELECT intern_id, name, city, "Cgpa"
FROM intern_details
WHERE "Cgpa" > 9.0;



------Dropping Views
DROP VIEW intern_summary;
