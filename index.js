const inquirer = require('inquirer');
const { appPrompts, DEPT_INDEX, ROLE_INDEX, MGR_INDEX, displayLists } = require('./utils/appPrompts');
const db = require('./db/connection');
const cTable = require('console.table');

const selectTask = async () => {
   // obtain task answer from inquirer prompts and store to answers constant
   const answers = await inquirer.prompt(appPrompts);

   let sql = ``;
   let viewArrayIndex = 0;
   let selectedName = ``;
   let roleId = 0;
   let managerId = 0;
   let employeeId = 0;
   let departmentId = 0;

   switch (answers.nextTask) {
      case 'View all departments':
         sql = `SELECT id, name AS department_name FROM departments;`;
         executeQuery(sql, selectedName, viewArrayIndex, answers.nextTask);
         break;
      case 'View all roles':
         sql = `SELECT roles.id, roles.title, roles.salary, departments.name AS department_name FROM roles LEFT JOIN departments ON roles.departmentId = departments.id;`;
         executeQuery(sql, selectedName, viewArrayIndex, answers.nextTask);
         break;
      case 'View all employees':
         sql = `SELECT employees.id, CONCAT(employees.firstName, ' ', employees.lastName) AS employee, roles.title, departments.name AS department, CONCAT(managers.firstName, ' ', managers.lastName) AS manager
                  FROM employees
                  LEFT JOIN employees AS managers on managers.id = employees.managerId
                  INNER JOIN roles ON roles.id = employees.roleId
                  INNER JOIN departments ON departments.id = roles.departmentId
                  ORDER BY employees.id ASC;`;
         executeQuery(sql, selectedName, viewArrayIndex, answers.nextTask);
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
         roleId = displayLists[ROLE_INDEX].indexOf(answers.updateRoleName) + 1; // roleId = array[index].indexOf(elem) + 1
         sql = `UPDATE employees SET roleId = ${roleId} WHERE id = ${employeeId};`;
         executeQuery(sql, '', 0, answers.nextTask);
         break;
      case 'Exit':
         db.end();
         return;
         break;
   }
};

const dbDataToArray = async () => {
   sql = `SELECT name FROM departments;`;
   db.query(sql, (err, rows) => {
      if (err) throw err;
      rows.forEach((row) => {
         displayLists[DEPT_INDEX].push(row.name);
      });
   });
   sql = `SELECT title FROM roles;`;
   db.query(sql, (err, rows) => {
      if (err) throw err;
      rows.forEach((row) => {
         displayLists[ROLE_INDEX].push(row.title);
      });
   });
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
      if (selectedName) {
         displayLists[viewArrayIndex].push(selectedName);
         console.log(`'${heading}' request has been processed.`);
      } else {
         console.log(`\n ${heading}\n`);
         console.table(rows);
      }

      selectTask();
   });
}

const startApp = async () => {
   db.connect((err) => {
      if (err) throw err;
      dbDataToArray();
      selectTask();
   });
};

startApp();
