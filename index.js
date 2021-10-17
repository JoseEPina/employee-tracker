const inquirer = require('inquirer');
const { appPrompts, DEPT_INDEX, ROLE_INDEX, MGR_INDEX, displayLists } = require('./utils/appPrompts');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const db = require('./db/connection');
const cTable = require('console.table');

const selectTask = async () => {
   // obtain task answer from inquirer prompts and store to answers constant
   const answers = await inquirer.prompt(appPrompts);

   let sql = ``;
   let displayArrayIndex = 0;
   let selectedName = ``;
   let roleId = 0;
   let managerId = 0;
   switch (answers.nextTask) {
      case 'View all departments':
         sql = `SELECT * FROM departments;`;
         break;
      case 'View all roles':
         sql = `SELECT * FROM roles;`;
         break;
      case 'View all employees':
         sql = `SELECT * FROM employees;`;
         break;
      case 'Add a department':
         displayArrayIndex = DEPT_INDEX;
         selectedName = answers.departmentName;
         sql = `INSERT INTO departments (name)
                  VALUES ('${answers.departmentName}');`;
         break;
      case 'Add a role':
         displayArrayIndex = ROLE_INDEX;
         selectedName = answers.roleDepartmentName;
         roleId = displayLists[DEPT_INDEX].indexOf(selectedName);
         selectedName = answers.roleTitle;
         //adding 1 to roleId to convert from array index to table ID.
         sql = `INSERT INTO roles (title, salary, departmentId)
            VALUES ('${answers.roleTitle}', '${answers.roleSalary}', '${roleId + 1}');`;
         break;
      case 'Add an employee':
         const MY_NULL_CONDITION = 1;
         displayArrayIndex = MGR_INDEX;
         selectedName = answers.employeeRoleName;
         roleId = displayLists[ROLE_INDEX].indexOf(selectedName) + 1;
         selectedName = answers.employeeManagerName;
         managerId = displayLists[displayArrayIndex].indexOf(selectedName) + 1;
         selectedName = answers.employeeFirstName + ' ' + answers.employeeLastName;
         if (managerId === MY_NULL_CONDITION) {
            sql = `INSERT INTO employees (firstName, lastName, roleId, managerId)
               VALUES ('${answers.employeeFirstName}', '${answers.employeeLastName}', '${roleId}', NULL);`;
         } else {
            sql = `INSERT INTO employees (firstName, lastName, roleId, managerId)
               VALUES ('${answers.employeeFirstName}', '${answers.employeeLastName}', '${roleId}', '${managerId}');`;
         }
         break;
      case 'Update an employee role':
         break;
      case 'Exit':
         db.end();
         return;
         break;
   }
   db.query(sql, (err, rows) => {
      if (err) throw err;
      if (selectedName) {
         displayLists[displayArrayIndex].push(selectedName);
      }
      console.log(`\n ${answers.nextTask}\n`);
      console.table(rows);

      selectTask();
   });

};

const startApp = async () => {
   db.connect((err) => {
      if (err) throw err;
      selectTask();
   });
};

startApp();
