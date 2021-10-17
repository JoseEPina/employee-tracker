//
const DEPT_INDEX = 0; // index of 0 to array of Department options
const ROLE_INDEX = 1; // index of 1 to array of Roles options
const MGR_INDEX = 2; // index of 2 to array of Manager's options

// Array of arrays, of display options
const displayLists = [
   ['D1', 'D2', 'D3'],
   ['R1', 'R2', 'R3'], 
   ['none', 'E1 E11', 'E2 E22', 'E3 E33', 'E4 E44', 'E5 E55']
];
// const displayLists = [[], [], ['none']];

// Inquirer questions for ToDo's
const appPrompts = [
   {
      type: 'list',
      name: 'nextTask',
      message: 'What do you want to do? ',
      choices: [
         'View all departments',
         'View all roles',
         'View all employees',
         'Add a department',
         'Add a role',
         'Add an employee',
         'Update an employee role',
         'Exit',
      ],
      loop: false,
   },
   {
      when: (answers) => answers.nextTask === 'Add a department',
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
      when: (answers) => answers.nextTask === 'Add a role',
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
      when: (answers) => answers.nextTask === 'Add a role',
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
      when: (answers) => answers.nextTask === 'Add a role',
      type: 'list',
      name: 'roleDepartmentName',
      message: "Select the role's deparment that this role belongs to. (Required): ",
      choices: displayLists[DEPT_INDEX],
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      when: (answers) => answers.nextTask === 'Add an employee',
      type: 'input',
      name: 'employeeFirstName',
      message: "Enter the new employee's first name. (Required): ",
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      when: (answers) => answers.nextTask === 'Add an employee',
      type: 'input',
      name: 'employeeLastName',
      message: "Enter the new employee's last name. (Required): ",
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      when: (answers) => answers.nextTask === 'Add an employee',
      type: 'list',
      name: 'employeeRoleName',
      message: "Select the new employee's role. (Required): ",
      choices: displayLists[ROLE_INDEX],
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      when: (answers) => answers.nextTask === 'Add an employee',
      type: 'list',
      name: 'employeeManagerName',
      message: "Select the new employee's Manager. (Required): ",
      choices: displayLists[MGR_INDEX],
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      when: (answers) => answers.nextTask === 'Update an employee role',
      type: 'list',
      name: 'updateEmpName',
      message: 'Select the employee to update. (Required): ',
      choices: displayLists[MGR_INDEX],
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      when: (answers) => answers.nextTask === 'Update an employee role',
      type: 'list',
      name: 'updateRoleName',
      message: "Select the employee's new role. (Required): ",
      choices: displayLists[ROLE_INDEX],
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
];

module.exports = { appPrompts, DEPT_INDEX, ROLE_INDEX, MGR_INDEX, displayLists };
