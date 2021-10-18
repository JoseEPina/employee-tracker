// EMPLOYEE_TRACKER
const inquirer = require('inquirer'); // gets npm inquirer
// utility arrays and indexex for inquirer display lists
const { appPrompts, DEPT_INDEX, ROLE_INDEX, MGR_INDEX, displayLists } = require('./utils/appPrompts');
const db = require('./db/connection'); // gets mySQL connection object
const cTable = require('console.table'); // gets npm console.table to display SQL data

// selectTasks processes inquirer prompts and corresponding MySQL commands
const selectTask = async () => {
   // presents one menu option and its corresponding inputs
   const answers = await inquirer.prompt(appPrompts);

   let sql = ``; // sql command is built in this variable
   let viewArrayIndex = 0; // index to indicate if we are processing department, role, or manager
   // auxiliary variables
   let roleId = 0;
   let managerId = 0;
   let employeeId = 0;
   let departmentId = 0;

   // determines action dependion on selected main menu option
   // in all cases build a SQL command depending on the task at hand and executes the command
   // by calling executeQuery()
   switch (answers.nextTask) {
      case 'View all departments':
         sql = `SELECT id, name AS department_name FROM departments;`;
         executeQuery(sql, '', viewArrayIndex, answers.nextTask);
         break;
      case 'View all roles':
         sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department_name FROM roles LEFT JOIN departments ON roles.departmentId = departments.id;`;
         executeQuery(sql, '', viewArrayIndex, answers.nextTask);
         break;
      // LEFT JOIN employees - adds manager name to employee data
      // INNER JOIN roles - adds role title to employee data
      // INNER JOIN departments - adds department name to employee data
      case 'View all employees':
         sql = `SELECT employees.id, CONCAT(employees.firstName, ' ', employees.lastName) AS employee, roles.title, departments.name AS department, CONCAT(managers.firstName, ' ', managers.lastName) AS manager
                  FROM employees
                  LEFT JOIN employees AS managers on managers.id = employees.managerId
                  INNER JOIN roles ON roles.id = employees.roleId
                  INNER JOIN departments ON departments.id = roles.departmentId
                  ORDER BY employees.id ASC;`;
         executeQuery(sql, '', viewArrayIndex, answers.nextTask);
         break;
      case 'Add a department':
         sql = `INSERT INTO departments (name)
                  VALUES ('${answers.departmentName}');`;
         executeQuery(sql, answers.departmentName, DEPT_INDEX, answers.nextTask);
         break;
      case 'Add a role':
         departmentId = displayLists[DEPT_INDEX].indexOf(answers.roleDepartmentName) + 1;
         sql = `INSERT INTO roles (title, salary, departmentId)
            VALUES ('${answers.roleTitle}', '${answers.roleSalary}', '${departmentId}');`;
         executeQuery(sql, answers.roleTitle, ROLE_INDEX, answers.nextTask);
         break;
      case 'Add an employee':
         roleId = displayLists[ROLE_INDEX].indexOf(answers.employeeRoleName) + 1;
         managerId = displayLists[MGR_INDEX].indexOf(answers.employeeManagerName);
         // processes employees with manager == 'none' (*** update later to prepared statements)
         if (!managerId) {
            sql = `INSERT INTO employees (firstName, lastName, roleId, managerId)
               VALUES ('${answers.employeeFirstName}', '${answers.employeeLastName}', '${roleId}', NULL);`;
         } else {
            sql = `INSERT INTO employees (firstName, lastName, roleId, managerId)
               VALUES ('${answers.employeeFirstName}', '${answers.employeeLastName}', '${roleId}', '${managerId}');`;
         }
         executeQuery(sql, answers.employeeFirstName + ' ' + answers.employeeLastName, MGR_INDEX, answers.nextTask);
         break;
      case 'Update an employee role':
         employeeId = displayLists[MGR_INDEX].indexOf(answers.updateEmpName);
         roleId = displayLists[ROLE_INDEX].indexOf(answers.updateRoleName) + 1;
         sql = `UPDATE employees SET roleId = ${roleId} WHERE id = ${employeeId};`;
         executeQuery(sql, '', 0, answers.nextTask);
         break;
      case 'Exit':
         db.end(); // ends database connection
         return;
         break;
   }
};

// at start of the program, populates arrays used by inquirer 'choices' arrays with data from the database,
// this arrays are then kept updated with push operations at run time when we add new departments, roles, or
// employees
const dbDataToArray = async () => {
   // populates departments array (for inquirer 'choices')
   sql = `SELECT name FROM departments;`;
   db.query(sql, (err, rows) => {
      if (err) throw err;
      rows.forEach((row) => {
         displayLists[DEPT_INDEX].push(row.name);
      });
   });
   // populates roles array (for inquirer 'choices')
   sql = `SELECT title FROM roles;`;
   db.query(sql, (err, rows) => {
      if (err) throw err;
      rows.forEach((row) => {
         displayLists[ROLE_INDEX].push(row.title);
      });
   });
   // populates employees/managers array (for inquirer 'choices')
   sql = `SELECT CONCAT(firstName, ' ', lastName) AS empName FROM employees;`;
   db.query(sql, (err, rows) => {
      if (err) throw err;
      rows.forEach((row) => {
         displayLists[MGR_INDEX].push(row.empName);
      });
   });
};

// sql - sql command
// selectedName - name to be pushed into displayLists[displayarrayIndex]
// displayArrayIndex - index of subarray. DEPT_INDEX, ROLE_INDEX, MGR_INDEX
// heading - title of the view(s) from inquirer.answers.nextTa
function executeQuery(sql, selectedName, viewArrayIndex, heading) {
   db.query(sql, (err, rows) => {
      if (err) throw err;
      // add new department/role/employee to inquirer arrays
      if (selectedName) {
         displayLists[viewArrayIndex].push(selectedName);
         console.log(`'${heading}' request has been processed.`);
      } else {
         console.log(`\n ${heading}\n`); // displays heading for current operation
         console.table(rows); // display SQL command results (view all dep/roles/emp & update)
      }

      selectTask(); // recursive call to continue presenting main menu until exit
   });
}

// main function
const startApp = async () => {
   console.log(`
*******************************************************************************
*             W E L C O M E   T O   e m p l o y e e - t r a c k e r           *
*******************************************************************************`);
   // initiates connection to database
   db.connect((err) => {
      if (err) throw err; // database connection failed
      dbDataToArray(); // populates arrays used by inquirer 'choices' arrays with data from the database
      selectTask(); // runs inquirer
   });
};

startApp(); // launch employee-tracker app
