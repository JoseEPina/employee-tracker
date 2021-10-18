# Employee Tracker

![License Badge](./assets/badge.svg)

## Description

The intended purpose of this application is to help non-developers view and interact with information stored in databases. This application is a _Content Management System (CMS)_ which presents the user/client with a series of prompts to view, manage business departments, assign business roles, and add or edit employees within the company.

My application makes use of the [MySQL 2](https://www.npmjs.com/package/mysql2) package to connect to a MySQL database and perform queries, while [Inquirer.js](https://www.npmjs.com/package/inquirer) package is used to present the user with prompts. Since the application's interactions are mainly done in _Command Line Interface (CLI)_, the [console.table](https://www.npmjs.com/package/console.table) package was also impletended in order to print MySQL rows to the console.

## Table of Contents

-  [User Story](#user-story)
-  [Acceptance Criteria](#acceptance-criteria)
-  [Installation](#installation)
-  [Usage](#usage)
-  [Output Example](#output-example)
-  [License](#license)
-  [Questions](#questions)

## User Story

```
- AS A business owner
- I WANT to be able to view and manage the departments, roles, and employees in my company
- SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
- GIVEN a command-line application that accepts user input
- WHEN I start the application
- THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
- WHEN I choose to view all departments
- THEN I am presented with a formatted table showing department names and department ids
- WHEN I choose to view all roles
- THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
- WHEN I choose to view all employees
- THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- WHEN I choose to add a department
- THEN I am prompted to enter the name of the department and that department is added to the database
- WHEN I choose to add a role
- THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
- WHEN I choose to add an employee
- THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
- WHEN I choose to update an employee role
- THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Installation

1. Create a repository in your GitHUb account, i.e. "employee-tracker".

2. In your local computer, move to the parent Git folder (or create it) where you will install the _"Employee Tracker"_ application.

3. With the terminal prompt active, clone the application repository into your local repository by entering this command (remove single quotes): 'git clone git@github.com:UserName/employee-tracker.git'

4. Install [node.js](https://nodejs.org/en/) (follow node.js instructions).

5. Install the npm [inquirer.js](https://www.npmjs.com/package/inquirer) package (follow inquirer instructions).

6. Install the npm [MySQL 2](https://www.npmjs.com/package/mysql2) package (follow MySql 2 instructions).

7. Install the npm [console.table](https://www.npmjs.com/package/console.table) package (follow console.table instructions).

8. Stage, Commit, and Push to your repository.

9. Make sure to update your .gitignore file as needed.

## Usage

1. After completing Installation Instructions, you will need to concect to the MySQL server to create the database tables.

2. In order to connect to MySQL, open a command prompt and enter the following command: _mysql -u root -p_

3. Once you have successfully connected to MySQL, create the database by entering: _source db/db.sql_

4. Once that is complete, create the database tables by entering: _source db/schema.sql_

5. Now run the application by entering: **_node index_** in the terminal prompt, from your local main branch .

6. You will be prompted throught the terminal to select an action to start adding information to the database. Please note that these are marked as **(Required)**.

7. Once you are satisfied with your results, please remember to select _*'Exit'*_ in the inquirer prompts to leave the application.

## Output Example

### Generated Command Line Output:

![Example-01](./assets/demo-01.png)

![Example-02](./assets/demo-02.png)

## Output Video Example

[Link to video on Google Drive](https://drive.google.com/file/d/1-F9kfCntNPUXOWgp4zKo_X7PHeSwKeKB/view)

## License

Copyright (c) 2021 Jose E Pina. All rights reserved.

Licensed under the [MIT License](https://choosealicense.com/licenses/mit).

## Questions

README Generator created by [JoseEPina](https://github.com/JoseEPina).

For any additional questions or comments, please send a message to the following address:

GitHub Email Address: <jose.edpina@gmail.com>
