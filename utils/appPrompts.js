// Inquirer questions for ToDo's
const appPrompts = [
   {
      type: 'list',
      name: 'nextTask',
      message: 'What do you want to do? ',
      choices: [
         'view all departments',
         'view all roles',
         'view all employees',
         'add a department',
         'add a role',
         'add an employee',
         'update an employee role',
         'exit',
      ],
      loop: false,
   },
];

module.exports = { appPrompts };
