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

    employeeLogin = async (email, password) => {
        const employeeData = await http.post("/api/employee/login", { email, password });
        AuthService.saveToken(employeeData.data.token);
        return employeeData.data;
    }

    singleEmployeeInfo = async (id) => {
        const employeeData = await http.post("/api/employee/", {'id': id});
        return employeeData;
    }

    editEmployeeInfo = async (employeeId, phoneNumber, email) => {
        const updatedData = await http.put("/api/employee/edit", {employeeId, phoneNumber, email});
        return updatedData;
    }

    fetchProjects = async (id) => {
        const employeeProjectData = await http.post("/api/employee/your-projects", { "id": id });
        return employeeProjectData;
    }

    fetchEmployees = async () => {
        const employeeData = await http.get("/api/employee/all");
        return employeeData;
    }

    createProject = async (title, description, employeeIds) => {
        const newProjectData = await http.post("/api/projects/create", {title, description, employeeIds});
        return newProjectData;
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
};

export default new ManagementDataService();