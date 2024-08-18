const inquirer = require('inquirer');
const {Pool} = require('pg');

const entrance = new Pool(
    {
      user: "postgres",
      password: "Erness33",
      host: 'localhost',
      database: 'company_db'
    },
);

function handleRequest(command) {
    switch (command) {
        case "View all employees":

            async function displayEmployees() {
                const ftn = `SELECT * FROM employee JOIN role ON role.id = employee.role_id`;

                const res = await entrance.query(ftn);
                console.log("id     First Name     Last Name     Salary     Title                    Manager");
                console.log("--     ----------     ---------     ------     -----                    -------");
                for (let i = 0; i < res.rows.length; i++) {
                    var fname = res.rows[i].first_name;
                    var lname = res.rows[i].last_name;
                    var salary = res.rows[i].salary;
                    var title = res.rows[i].title;
                    var id = JSON.stringify(res.rows[i].id);
                    var space = 15 - fname.length;
                    var lspace = 14 - lname.length;
                    var ispace = 7 - id.length;
                    var tspace = 25 - title.length;
                    var wspace = 11 - salary.length;
                    for (let j = 0; j < space; j++) {
                        fname = fname + " ";
                    }
                    for (let q = 0; q < lspace; q++) {
                        lname = lname + " ";
                    }
                    for (let k = 0; k < ispace; k++) {
                        id = id + " ";
                    }
                    for (let l = 0; l < wspace; l++) {
                        salary = salary + " ";
                    }
                    for (let m = 0; m < tspace; m++) {
                        title = title + " ";
                    }
                    console.log(`${id}${fname}${lname}${salary}${title}${res.rows[i].manager_id}`);
                }
            }

            displayEmployees();

            break;
        case "Add employee":

            var data = [];

            async function addEmp(response) {
                const ftn = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;

                const res = await entrance.query(ftn, response);
                console.log("Employee added");
            };
            
            inquirer.prompt({type: 'input', message: 'Input first name:', name: 'fn'}).then((answer) => data.push(answer.fn));
            inquirer.prompt({type: 'input', message: 'Input last name:', name: 'ln'}).then((answer) => data.push(answer.ln));
            inquirer.prompt({type: 'input', message: 'Input role id:', name: 'r'}).then((answer) => data.push(Number(answer.r)));
            inquirer.prompt({type: 'input', message: 'Input manager id:', name: 'm'}).then((answer) => data.push(Number(answer.m)));
            addEmp(data);

            break;
        case "Update employee role":

            var data = [];
            
            async function updateEmp(response) {
                const ftn = `UPDATE employee SET role_id = $1 WHERE id = $2`;

                const res = await entrance.query(ftn, response);
                console.log("Employee updated");
            }

            inquirer.prompt({type: 'input', message: 'Input role id:', name: 'r'}).then((answer) => data.push(answer.r));
            inquirer.prompt({type: 'input', message: 'Input employee id:', name: 'id'}).then((answer) => data.push(answer.id));
            updateEmp(data);

            break;
        case "View all roles":

            async function displayRoles() {
                const ftn = `SELECT * FROM role JOIN department ON department.id = role.department_id`;

                const res = await entrance.query(ftn);
                console.log("id     Salary     Title                    Department");
                console.log("--     ------     -----                    ----------");
                for (let i = 0; i < res.rows.length; i++) {
                    var salary = res.rows[i].salary;
                    var id = JSON.stringify(res.rows[i].id);
                    var title = res.rows[i].title;
                    var space = 11 - salary.length;
                    var ispace = 7 - id.length;
                    var tspace = 25 - title.length;
                    for (let j = 0; j < space; j++) {
                        salary = salary + " ";
                    }
                    for (let k = 0; k < ispace; k++) {
                        id = id + " ";
                    }
                    for (let l = 0; l < tspace; l++) {
                        title = title + " ";
                    }
                    console.log(`${id}${salary}${title}${res.rows[i].department_name}`);
                }
            }

            displayRoles();

            break;
        case "Add role":

            var data = [];

            async function addRole(response) {
                const ftn = `INSERT INTO role (salary, title, department_id) VALUES ($1, $2, $3)`;

                const res = await entrance.query(ftn, response);
                console.log("Role added");
            };
            
            inquirer.prompt({type: 'input', message: 'Input salary:', name: 'salary'}).then((answer) => data.push(Number(answer.salary)));
            inquirer.prompt({type: 'input', message: 'Input title:', name: 'title'}).then((answer) => data.push(answer.title));
            inquirer.prompt({type: 'input', message: 'Input department id:', name: 'id'}).then((answer) => data.push(answer.id));
            addRole(data);

            break;
        case "Delete role":

            var data = [];

            async function delRole(response) {
                const ftn = `DELETE FROM role WHERE id = $1`;
                data.push(Number(response));

                const res = await entrance.query(ftn, data);
                console.log("Role deleted");
            };
            
            inquirer.prompt({type: 'input', name: 'id', message: 'Input role id:'}).then(answer => {delRole(answer.id);});

            break;
        case "View all departments":

            async function displayDpt() {
                const ftn = `SELECT id, department_name AS department FROM department`;

                const res = await entrance.query(ftn);
                console.log("id     Department");
                console.log("--     ----------");
                for (let i = 0; i < res.rows.length; i++) {
                    var id = JSON.stringify(res.rows[i].id);
                    var ispace = 7 - id.length;
                    for (let k = 0; k < ispace; k++) {
                        id = id + " ";
                    }
                    console.log(`${id}${res.rows[i].department}`);
                }
            }

            displayDpt();

            break;
        case "Add department":

            var data = [];

            async function addDpt(response) {
                data.push(response);
                const ftn = `INSERT INTO department (department_name) VALUES ($1)`;

                const res = await entrance.query(ftn, data);
                console.log("Department added");
            };
            
            inquirer.prompt({type: 'input', name: 'dpt', message: 'Input department name:'}).then(answer => {addDpt(answer.dpt);});

            break;
        case "Delete department":

            var data = [];

            async function delDpt(response) {
                data.push(Number(response));
                const ftn = `DELETE FROM department WHERE id = $1`;

                const res = await entrance.query(ftn, data);
                console.log("Department deleted");
            };
            
            inquirer.prompt({type: 'input', name: 'dpt', message: 'Input department id:'}).then(answer => {delDpt(answer.dpt);});

            break;
        case "Quit":
            return;
    }
}

module.exports = {handleRequest};