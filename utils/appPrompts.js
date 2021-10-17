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
   {
      when: (answers) => answers.nextTask === 'add a role',
      type: 'input',
      name: 'roleTitle',
      message: "Enter the new role's title (Required): ",
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      when: (answers) => answers.nextTask === 'add a role',
      type: 'number',
      name: 'roleSalary',
      message: "Enter the new role's salary (Required): ",
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      when: (answers) => answers.nextTask === 'add a role',
      type: 'number',
      name: 'roleDepartmentId',
      message: 'Enter the deparment ID for the new role. (Required): ',
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
