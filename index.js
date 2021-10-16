const inquirer = require('inquirer');
const { menuOptions } = require('./utils/appPrompts');

const selectTask = async () => {
   // obtain task answer from inquirer prompts and store to answers constant
   const answers = await inquirer.prompt(menuOptions);

   console.log(answers);

   // are we done? When IS NOT 'exit'- then recursive call ask for another task selection
   // When task IS 'exit'- then stop recursive call and exit prompts.
   return answers.task !== 'exit' ? selectTask() : 0;
};

const startApp = async () => {
   let task = await selectTask();
   console.log('~ task', task);
   return;
};

startApp();
