const inquirer = require('inquirer');
const { menuOptions } = require('./utils/appPrompts');

async function selectTask() {
   return await inquirer.prompt(menuOptions);
}

const startApp = async () => {
   let task = await selectTask();
   console.log('~ task', task);
};

startApp();
