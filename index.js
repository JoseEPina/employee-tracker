const inquirer = require('inquirer');
const { appPrompts } = require('./utils/appPrompts');
const Department = require('./lib/Department');
const Employee = require('./lib/Employee');
const Role = require('./lib/Role');
const db = require('./db/connection');

const selectTask = async () => {
   // obtain task answer from inquirer prompts and store to answers constant
   const answers = await inquirer.prompt(appPrompts);

   switch (answers.nextTask) {
      case 'view all departments':
         console.log(`~ answers.nextTask`, answers.nextTask);
         const sql = `SELECT * FROM departments`;

         db.query(sql, (err, rows) => {
            console.log('Enter db.query: ');
            if (err) throw err;
            console.log('display rows:\n', rows);
         });
         console.log('Exit')
         break;
      case 'view all roles':
         console.log(`~ answers.nextTask`, answers.nextTask);
         break;
      case 'view all employees':
         console.log(`~ answers.nextTask`, answers.nextTask);
         break;
      case 'add a department':
         console.log(`~ answers.nextTask`, answers.nextTask);
         break;
      case 'add a role':
         console.log(`~ answers.nextTask`, answers.nextTask);
         break;
      case 'add an employee':
         console.log(`~ answers.nextTask`, answers.nextTask);
         break;
      case 'update an employee role':
         console.log(`~ answers.nextTask`, answers.nextTask);
         break;
      case 'exit':
         console.log(`~ answers.nextTask`, answers.nextTask);
         break;
   }
   // are we done? When IS NOT 'exit'- then recursive call ask for another task selection
   // When task IS 'exit'- then stop recursive call and exit prompts.
   return answers.nextTask !== 'exit' ? selectTask() : answers.nextTask;
};

const startApp = async () => {
   let nextTask = await selectTask();
   db.end();
   return;
};

startApp();
