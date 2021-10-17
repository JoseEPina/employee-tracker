const inquirer = require('inquirer');
const {appPrompts, DEPT_INDEX, ROLE_INDEX, MGR_INDEX, displayLists} = require('./utils/appPrompts');
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
   let employeeId = 0;
   let departmentId = 0;
   switch (answers.nextTask) {
      case 'View all departments':
         sql = `SELECT * FROM departments;`;
         executeQuery(sql, selectedName, displayArrayIndex, answers.nextTask);
         break;
      case 'View all roles':
         sql = `SELECT * FROM roles;`;
         executeQuery(sql, selectedName, displayArrayIndex, answers.nextTask);
         break;
      case 'View all employees':
         sql = `SELECT * FROM employees;`;
         executeQuery(sql, selectedName, displayArrayIndex, answers.nextTask);
         break;
      case 'Add a department':
         sql = `INSERT INTO departments (name)
                  VALUES ('${answers.departmentName}');`;
         executeQuery(sql, answers.departmentName, DEPT_INDEX, answers.nextTask);
         break;
      case 'Add a role':
         departmentId = displayLists[DEPT_INDEX].indexOf(answers.departmentName);
         sql = `INSERT INTO roles (title, salary, departmentId)
            VALUES ('${answers.roleTitle}', '${answers.roleSalary}', '${departmentId + 1}');`;
         executeQuery(sql, answers.roleTitle, ROLE_INDEX, answers.nextTask);
         break;
      case 'Add an employee':
         roleId = displayLists[ROLE_INDEX].indexOf(answers.employeeRoleName) + 1;
         managerId = displayLists[MGR_INDEX].indexOf(answers.employeeManagerName) + 1;
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


// sql - sql command
// selectedName - name to be pushed into displayLists[displayarrayIndex]
// displayArrayIndex - index of subarray. DEPT_INDEX, ROLE_INDEX, MGR_INDEX
// heading - title of the view(s) from inquirer.answers.nextTask
function executeQuery(sql, selectedName, displayArrayIndex, heading) {
   db.query(sql, (err, rows) => {
      if (err) throw err;
      if (selectedName) {
         displayLists[displayArrayIndex].push(selectedName);
      }
      console.log(`\n ${heading}\n`);
      console.table(rows);
      
      selectTask();
   });
}


const startApp = async () =>
{
   db.connect((err) => {
      if (err) throw err;
      selectTask();
   });
};

startApp();