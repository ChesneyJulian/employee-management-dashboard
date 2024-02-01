# employee-management-dashboard
## Description
An employee management system dashboard that allows employees and administrators to access information regarding the organization's employees, departments, and projects. This application offers an environment for a general employee as well as capabilities for an admin employee. Admin employees have the ability to add employees, departments, and office locations to the database, as well as delete projects and employee accounts from the database. This project utilizes VueJS, Vite, and Axios on the frontend and Node.js, Express, and Sequelize on the backend. 

## Usage
Admin accounts must be used to create employee accounts. Once an account is created, a user may login with their credentials and use the dashboard to navigate the different sections of the application. This project is not yet deployed, so it may be served locally by cloning the repository, creating a dotenv file containing environment variables, and running 'npm run dev' from the root of the project.

## Resources
View all package.json for a comprehensive list of technologies used.

[axios](https://www.npmjs.com/package//axios) - Allows frontend to make requests to database server

[VueJS](https://vuejs.org/) - Frontend framework

[Vite](https://vitejs.dev/) - Build and serve frontend

[Vuex](https://vuex.vuejs.org/) - State management on frontend

[Vuetify](https://vuetifyjs.com/en/) - Vue component UI framework

[json-web-token](https://www.npmjs.com/package/jsonwebtoken) - User authentication

[Sequelize](https://www.npmjs.com/package/sequelize) - Database management