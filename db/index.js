const inquirer = require('inquirer');
const {Pool} = require('pg');
require('dotenv').config();

const entrance = new Pool(
    {
      user: process.env.USER,
      password: process.env.PASSWORD,
      host: 'localhost',
      database: process.env.DATABASE
    },
);
console.log(process.env.USER);
console.log(process.env.PASSWORD);
console.log(process.env.DATABASE);

const options = ["View all employees", "Add employee", "Delete employee", "Update employee role", "View all roles", "Add role", "Delete role", "View all departments", "Add department", "Delete department", "Quit"];
const query = {type: 'list', message: "What would you like to do?", choices: options, name: 'query'};

function recursion() {
    inquirer.prompt(query).then(answer => {handleRequest(answer.query);});
};

function handleRequest(command) {
    switch (command) {
        case "View all employees":

            async function displayEmployees() {
                const ftn = `SELECT e.id, e.first_name, e.last_name, e.role_id, e.manager_id, r.salary, r.title, r.department_id, d.department_name
                 FROM employee e LEFT JOIN role r ON r.id = e.role_id LEFT JOIN department d ON d.id = r.department_id`;

                const res = await entrance.query(ftn);
                console.table(res.rows);
            }

            displayEmployees().then(recursion);

            break;
        case "Add employee":
         
            async function addEmployee() {
                async function addEmp(response) {
                    if (response.m != "null") {
                        response.m = Number(response.m);
                    }

                    const ftn = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${response.fn}', '${response.ln}', ${Number(response.r)}, ${response.m})`;

                    const res = await entrance.query(ftn);
                    console.log("Employee added");
                    recursion();
                };

                const ftn2 = `SELECT title AS "name", id AS "value" FROM role`;
                const role = await entrance.query(ftn2);

                const ftn3 = `SELECT first_name AS "name", id AS "value" FROM employee`;
                const manager = await entrance.query(ftn3);

                var managers = manager.rows;
                managers.push('null');

                var data = [
                    {type: 'input', message: 'Input first name:', name: 'fn'},
                    {type: 'input', message: 'Input last name:', name: 'ln'},
                    {type: 'list', message: 'Select role:', name: 'r', choices: role.rows},
                    {type: 'list', message: 'Select manager:', name: 'm', choices: managers}
                ];

                inquirer.prompt(data).then((answer) => {addEmp(answer)});
            };
            addEmployee();

            break;
        case "Delete employee":
            async function deleteEmp() {
                async function delEmp(response) {
                    const ftn = `DELETE FROM employee WHERE id = ${Number(response.e)}`;

                    const res = await entrance.query(ftn);
                    console.log("Employee deleted");
                    recursion();
                };

                const ftn2 = `SELECT first_name AS "name", id AS "value" FROM employee`;
                const emp = await entrance.query(ftn2);

                inquirer.prompt({type: 'list', message: 'Input employee id:', name: 'e', choices: emp.rows}).then((answer) => {delEmp(answer)});
            };
            deleteEmp();

            break;
        case "Update employee role":
            async function updateEmployee() {
                async function updateEmp(response) {
                    const ftn = `UPDATE employee SET role_id = ${Number(response.r)} WHERE id = ${Number(response.e)}`;

                    const res = await entrance.query(ftn);
                    console.log("Employee updated");
                    recursion();
                }

                const ftn2 = `SELECT title AS "name", id AS "value" FROM role`;
                const role = await entrance.query(ftn2);

                const ftn3 = `SELECT first_name AS "name", id AS "value" FROM employee`;
                const employee = await entrance.query(ftn3);

                var data = [
                    {type: 'list', message: 'Select role:', name: 'r', choices: role.rows},
                    {type: 'list', message: 'Select employee:', name: 'e', choices: employee.rows},
                ];

                inquirer.prompt(data).then((answer) => {updateEmp(answer)});
            };
            updateEmployee();

            break;
        case "View all roles":

            async function displayRoles() {
                const ftn = `SELECT * FROM role LEFT JOIN department ON department.id = role.department_id`;

                const res = await entrance.query(ftn);
                console.table(res.rows);
            }

            displayRoles().then(recursion);

            break;
        case "Add role":

            async function createRole() {
                async function addRole(response) {
                    const ftn = `INSERT INTO role (salary, title, department_id) VALUES (${parseFloat(response.s).toFixed(2)}, '${response.t}', ${Number(response.id)})`;

                    const res = await entrance.query(ftn);
                    console.log("Role added");
                    recursion();
                };

                const ftn2 = `SELECT department_name AS "name", id AS "value" FROM department`;
                const dept = await entrance.query(ftn2);

                var data = [
                    {type: 'input', message: 'Input salary:', name: 's'},
                    {type: 'input', message: 'Input title:', name: 't'},
                    {type: 'list', message: 'Select department:', name: 'id', choices: dept.rows},
                ];

                inquirer.prompt(data).then((answer) => {addRole(answer)});
            };
            createRole();

            break;
        case "Delete role":

            async function deleteRole() {
                async function delRole(response) {
                    const ftn = `DELETE FROM role WHERE id = ${Number(response.r)}`;

                    const res = await entrance.query(ftn);
                    console.log("Role deleted");
                    recursion();
                };

                const ftn2 = `SELECT title AS "name", id AS "value" FROM role`;
                const role = await entrance.query(ftn2);

                inquirer.prompt({type: 'list', message: 'Select role id:', name: 'r', choices: role.rows}).then((answer) => {delRole(answer)});
            };
            deleteRole();

            break;
        case "View all departments":

            async function displayDpt() {
                const ftn = `SELECT id, department_name AS department FROM department`;

                const res = await entrance.query(ftn);
                console.table(res.rows);
            }

            displayDpt().then(recursion);

            break;
        case "Add department":

            async function addDpt(response) {
                const ftn = `INSERT INTO department (department_name) VALUES ('${response.d}')`;

                const res = await entrance.query(ftn);
                console.log("Department added");
                recursion();
            };

            inquirer.prompt({type: 'input', message: 'Input department name:', name: 'd'}).then((answer) => {addDpt(answer)});

            break;
        case "Delete department":
            async function deleteDpt() {
                async function delDpt(response) {
                    const ftn = `DELETE FROM department WHERE id = ${Number(response.d)}`;

                    const res = await entrance.query(ftn);
                    console.log("Department deleted");
                    recursion();
                };

                const ftn2 = `SELECT department_name AS "name", id AS "value" FROM department`;
                const dept = await entrance.query(ftn2);
                
                inquirer.prompt({type: 'list', message: 'Select department:', name: 'd', choices: dept.rows}).then(answer => {delDpt(answer)});
            };

            deleteDpt();

            break;
        case "Quit":
            return;
    }
}

module.exports = {handleRequest};