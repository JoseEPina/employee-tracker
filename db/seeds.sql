INSERT INTO departments 
   (name)
VALUES 
  ('PMO'),
  ('Engineering'),
  ('Sales'),
  ('Finances'),
  ('Legal'),
  ('Operations');

INSERT INTO ROLES
   (title, salary, departmentId)
VALUES 
   ('Project Leader',90000.00,1),
   ('PMO Manager',120000.00,1),
   ('Paralegal',75000.00,5),
   ('Legal Lead',95000.00,5),
   ('Sr Sales Rep',75000.00,3),
   ('Sales Lead',110000.00,3),
   ('Jr Engineer',80000.00,2),
   ('Sr Engineer',102000.00,2),
   ('Engineer Lead',125000.00,2),
   ('Accountant',85000.00,4),
   ('Accountant CPA',98000.00,4),
   ('Tech Support',65000.00,6),
   ('Tech Support Lead',85000.00,6);

INSERT INTO employees
   (firstName, lastName, roleId, managerId)
VALUES
   ('Pinoccio','Geppetto',2,NULL),
   ('Sherill','Brasuell',2,1),
   ('Rodolfo','Sciarretta',4,1),
   ('Wilda','Vitagliano',13,1),
   ('Sueann','Larkan',9,1),
   ('Francesco','Shurman',11,1),
   ('Duane','Mustin',6,1),
   ('Charlott','Maged',1,2),
   ('Cristal','Amoruso',1,2),
   ('Buck','Sabedra',1,2),
   ('Kathryne','Yoshina',1,2),
   ('Jazmin','Bathurst',1,2),
   ('Laci','Gambino',3,3),
   ('Lyn','Ciani',3,3),
   ('Mozell','Frankovich',3,3),
   ('Dominga','Hartfield',5,7),
   ('Anton','Dalmau',5,7),
   ('Cristi','Zaker',5,7),
   ('Alfredo','Younie',5,7),
   ('Lu','Aveles',5,7),
   ('Sheryl','Ferrall',5,7),
   ('Mallory','Haslip',5,7),
   ('Lino','Haigler',7,5),
   ('Fabian','Martincic',7,5),
   ('Malorie','Lyseski',8,5),
   ('Julie','Goodaker',8,5),
   ('Kyoko','Clarke',8,5),
   ('Deedra','Holder',8,5),
   ('Denise','Steier',8,5),
   ('Joya','Lyon',10,6),
   ('Genaro','Cashdollar',10,6),
   ('Tatum','Hurta',10,6),
   ('Mary','Shelsy',10,6),
   ('Modesto','Nian',12,4),
   ('Sammie','Konarski',12,4),
   ('Darline','Windover',12,4),
   ('Kelle','Mcgeady',12,4),
   ('Jina','Horton',12,4);
   