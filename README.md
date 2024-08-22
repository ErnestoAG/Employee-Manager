# Employee-Manager

## Description

The Employee Manager applications allows users to: 

* Add employee fields that contain name, role, and department.
* Add role fields that contain salary, title, department.
* Add department fields that have a department name.
* Delete one instance of employee, role, or department at the time.
* Update employee role by selecting existing roles.
* Display tables with updated data for employees, roles, and departments.
   
 Here is the link to the walkthrough video on Loom: https://www.loom.com/share/543d0036e262421080bb5b9f05ec07c4
 
## Installation

If you are deploying the application from a local environment, you need to run "npm install" on the console to install dependencies. You can set up your own seeds file to populate your table with any data you desire. Use [psql -U username] to install schema and seeds files. You need to create a .env file to set up environment variables. You need USER, PASSWORD, and DATABASE variables to access your PostgreSQL databases. 

## Usage

Upon launch, follow the enquirer prompts that appear on screen. You can select one of the options with the arrow keys and pressing Enter. You can keep selecting more options until you select Quit. If you select Quit, the application will stop running. Display options just display tables, you can use those options to check if your tables are up to date. The other options allow you to create, update and delete fields. Some options require you to input data and select from a list, press Enter to confirm your selections. Be careful when you delete fields, pay attention to the table structure and check for values that cannot be null. The schema file might be useful for understanding table structure and relations.

## Credits

This application wouldn't have been possible without the help of the class content and the support of the TAs. Thanks to the PostgreSQL documentation for clear explanations on how to use queries and other database functions.

## License

Refer to LICENSE in the repo, it should be MIT License.
