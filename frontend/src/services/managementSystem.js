import http from '../http-common';
import AuthService from './auth'
class ManagementDataService {
    getYourDepartment = async (departmentId) => {
        const departmentData = await http.post("/api/department/your-department", { departmentId });
        return departmentData;
    }

    getAllDepartments = async () => {
        const departmentData = await http.get("/api/department/all");
        return departmentData;
    }

    createDepartment = async (title, locationId) => {
        const departmentData = await http.post("/api/department/create", { title, locationId });
        return departmentData;
    }

    deleteDepartment = async (id) => {
        const deletedDepartment = await http.post("/api/department/delete", { id });
        return deletedDepartment;
    }

    getLocations = async () => {
        const locationData = await http.get("/api/location/all");
        return locationData;
    }

    createLocation = async (address, employeeParking) => {
        const locationData = await http.post("/api/location/create", { address, employeeParking });
        return locationData;
    }

    employeeLogin = async (email, password) => {
        const employeeData = await http.post("/api/employee/login", { email, password });
        AuthService.saveToken(employeeData.data.token);
        return employeeData.data;
    }

    createEmployee = async (firstName, lastName, departmentId, email, password, phoneNumber, admin) => {
        const employeeData = await http.post("/api/employee/create", {firstName, lastName, departmentId, email, password, phoneNumber, admin});
        return employeeData;
    }

    deleteEmployee = async (id) => {
        const employeeData = await http.post("/api/employee/delete", {id});
        return employeeData;
    }

    singleEmployeeInfo = async (id) => {
        const employeeData = await http.post("/api/employee/", {'id': id});
        return employeeData;
    }

    editEmployeeInfo = async (employeeId, phoneNumber, email) => {
        const updatedData = await http.put("/api/employee/edit", {employeeId, phoneNumber, email});
        return updatedData;
    }

    fetchEmployees = async () => {
        const employeeData = await http.get("/api/employee/all");
        return employeeData;
    }

    fetchProjects = async (id) => {
        const employeeProjectData = await http.post("/api/employee/your-projects", { "id": id });
        return employeeProjectData;
    }

    fetchAllProjets = async () => {
        const projectData = await http.get("/api/projects/all");
        return projectData;
    }

    createProject = async (title, description, employeeIds) => {
        const newProjectData = await http.post("/api/projects/create", {title, description, employeeIds});
        return newProjectData;
    }

    deleteProject = async (id) => {
        const deletedProject = await http.post("/api/projects/delete", {id});
        return deletedProject;
    }

    fetchSingleProject = async (projectId) => {
        const projectData = await http.post("/api/projects/", {"projectId": projectId});
        return projectData;
    }

    updateTaskData = async (id, description, inProgress, completed) => {
        const updatedTaskData = await http.put("/api/tasks/edit", {id, description, inProgress, completed});
        return updatedTaskData;
    }

    createTask = async (title, description, inProgress, completed, projectId) => {
        const newTaskData = await http.post("/api/tasks/create", {title, description, inProgress, completed, projectId});
        return newTaskData;
    }

    addTimecard = async (date, hoursWorked, worker) => {
        const newTimecardData = await http.post("/api/timesheet/create", { date, hoursWorked, worker });
        return newTimecardData;
    }

    getTimecards = async (employeeId) => {
        const timecardData = await http.post("/api/timesheet/", { employeeId });
        return timecardData;
    }
};

export default new ManagementDataService();