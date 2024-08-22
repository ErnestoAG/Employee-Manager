const inquirer = require('inquirer');
const {handleRequest} = require('./db/index');

const billboard = "***************************************************************\n*                                                             *\n*                                                             *\n*   #######                                                   *\n*   #       #    # #####  #       ####  #   # ###### ######   *\n*   #       ##  ## #    # #      #    #  # #  #      #        *\n*   #####   # ## # #    # #      #    #   #   #####  #####    *\n*   #       #    # #####  #      #    #   #   #      #        *\n*   #       #    # #      #      #    #   #   #      #        *\n*   ####### #    # #      ######  ####    #   ###### ######   *\n*                                                             *\n*   #     #                                                   *\n*   ##   ##   ##   #    #   ##    ####  ###### #####          *\n*   # # # #  #  #  ##   #  #  #  #    # #      #    #         *\n*   #  #  # #    # # #  # #    # #      #####  #    #         *\n*   #     # ###### #  # # ###### #  ### #      #####          *\n*   #     # #    # #   ## #    # #    # #      #   #          *\n*   #     # #    # #    # #    #  ####  ###### #    #         *\n*                                                             *\n*                                                             *\n***************************************************************\n";
const options = ["View all employees", "Add employee", "Delete employee", "Update employee role", "View all roles", "Add role", "Delete role", "View all departments", "Add department", "Delete department", "Quit"];
const query = {type: 'list', message: "What would you like to do?", choices: options, name: 'query'};

console.log(billboard);

async function interface() {
  await inquirer.prompt(query).then(answer => {handleRequest(answer.query);});
};

interface();
