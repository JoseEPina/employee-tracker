const inquirer = require('inquirer');
const { appPrompts } = require('./utils/appPrompts');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const db = require('./db/connection');
const cTable = require('console.table');

const selectTask = async () => {
   // obtain task answer from inquirer prompts and store to answers constant
   const answers = await inquirer.prompt(appPrompts);

   let sql = ``;
   switch (answers.nextTask) {
      case 'view all departments':
         sql = `SELECT * FROM departments;`;
         break;
      case 'view all roles':
         sql = `SELECT * FROM roles;`;
         break;
      case 'view all employees':
         sql = `SELECT * FROM employees;`;
         break;
      case 'add a department':
         sql = `INSERT INTO departments (name)
                  VALUES ('${answers.departmentName}');`;
         break;
      case 'add a role':
         sql = `INSERT INTO roles (title, salary, departmentId)
                  VALUES ('${answers.roleTitle}', '${answers.roleSalary}', '${answers.roleDepartmentId}');`;
         break;
      case 'add an employee':
         break;
      case 'update an employee role':
         break;
      case 'exit':
         db.end();
         return;
         break;
   }

   db.query(sql, (err, rows) => {
      if (err) throw err;
      console.log(`\n ${answers.nextTask}\n`);
      console.table(rows);
      selectTask();
   });

   // const { rows } = await db.query(sql);
   // console.log('~ rows', rows);

   // are we done? When IS NOT 'exit'- then recursive call ask for another task selection
   // When task IS 'exit'- then stop recursive call and exit prompts.
   // return answers.nextTask !== 'exit' ? selectTask() : answers.nextTask;
};

const startApp = async () => {
   db.connect((err) => {
      if (err) throw err;
      selectTask();
   });
};

startApp();
