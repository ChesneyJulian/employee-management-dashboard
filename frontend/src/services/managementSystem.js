import http from '../http-common';
import AuthService from './auth'

// axios queries to server (database)
class ManagementDataService {
    // fetch department by departmentId
    getYourDepartment = async (departmentId) => {
        const departmentData = await http.post("/api/department/your-department", { departmentId });
        return departmentData;
    }
    // fetch all departments
    getAllDepartments = async () => {
        const departmentData = await http.get("/api/department/all");
        return departmentData;
    }
    // create new department
    createDepartment = async (title, locationId) => {
        try { const departmentData = await http.post("/api/department/create", { title, locationId });
        return departmentData; } catch (err) {
            return;
        }
    }
    // delete department by department id
    deleteDepartment = async (id) => {
        const deletedDepartment = await http.post("/api/department/delete", { id });
        return deletedDepartment;
    }
    // fetch all locations
    getLocations = async () => {
        const locationData = await http.get("/api/location/all");
        return locationData;
    }
    // create new location
    createLocation = async (address, employeeParking) => {
        try { const locationData = await http.post("/api/location/create", { address, employeeParking });
        return locationData; } catch (err) {
            return;
        }
    }
    // use employee data to login and save token which is signed and returned on server
    employeeLogin = async (email, password) => {
        try {
            const employeeData = await http.post("/api/employee/login", { email, password });
            AuthService.saveToken(employeeData.data.token);
            return employeeData.data;
        } catch (err) {
            return;
        }
    }
    // create new employee
    createEmployee = async (firstName, lastName, departmentId, email, password, phoneNumber, admin) => {
       try { const employeeData = await http.post("/api/employee/create", {firstName, lastName, departmentId, email, password, phoneNumber, admin});
        return employeeData; } catch (err) {
            return;
        }
    }
    // delete employee by employee id
    deleteEmployee = async (id) => {
        const employeeData = await http.post("/api/employee/delete", {id});
        return employeeData;
    }
    // fetch single employee info by employee id
    singleEmployeeInfo = async (id) => {
        const employeeData = await http.post("/api/employee/", {'id': id});
        return employeeData;
    }
    // edit single employee info
    editEmployeeInfo = async (employeeId, phoneNumber, email) => {
        try {
            const updatedData = await http.put("/api/employee/edit", {employeeId, phoneNumber, email});
            return updatedData;
        } catch (err) {
            return;
        }
    }
    // fetch all employees
    fetchEmployees = async () => {
        const employeeData = await http.get("/api/employee/all");
        return employeeData;
    }
    // fetch employee's projects through employee id
    fetchProjects = async (id) => {
        const employeeProjectData = await http.post("/api/employee/your-projects", { "id": id });
        return employeeProjectData;
    }
    // fetch all projects
    fetchAllProjets = async () => {
        const projectData = await http.get("/api/projects/all");
        return projectData;
    }
    // create new project
    createProject = async (title, description, employeeIds) => {
       try { 
        const newProjectData = await http.post("/api/projects/create", {title, description, employeeIds});
        if (newProjectData) return newProjectData; 
    } catch (err) {
            return;
        }
    }
    // delete project by project id
    deleteProject = async (id) => {
        const deletedProject = await http.post("/api/projects/delete", {id});
        return deletedProject;
    }
    // fetch single project by project id
    fetchSingleProject = async (projectId) => {
        const projectData = await http.post("/api/projects/", {"projectId": projectId});
        return projectData;
    }
    // update task data by task id
    updateTaskData = async (id, description, inProgress, completed) => {
        const updatedTaskData = await http.put("/api/tasks/edit", {id, description, inProgress, completed});
        return updatedTaskData;
    }
    // create new task
    createTask = async (title, description, inProgress, completed, projectId) => {
      try { const newTaskData = await http.post("/api/tasks/create", {title, description, inProgress, completed, projectId});
        return newTaskData; } catch (err) {
            return;
        }
    }
    // create timecard (timesheet on server) for employee
    addTimecard = async (date, hoursWorked, worker) => {
        try {
            const newTimecardData = await http.post("/api/timesheet/create", { date, hoursWorked, worker });
            return newTimecardData;
        } catch (err) {
            return;
        }
    }
    // fetch all timecards by employeeId
    getTimecards = async (employeeId) => {
        const timecardData = await http.post("/api/timesheet/", { employeeId });
        return timecardData;
    }
};

export default new ManagementDataService();