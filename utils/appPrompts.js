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
   {
      when: (answers) => answers.nextTask === 'add a department',
      type: 'input',
      name: 'departmentName',
      message: "Enter the department's name (Required): ",
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
];

module.exports = { appPrompts };
