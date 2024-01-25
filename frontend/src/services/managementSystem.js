import http from '../http-common';
import AuthService from './auth'
class ManagementDataService {
    getAllDepartments = async () => {
        const departmentData = await http.get("/api/department/all");
        return departmentData;
    }

    employeeLogin = async (email, password) => {
        const employeeData = await http.post("/api/employee/login", { email, password });
        AuthService.saveToken(employeeData.data.token);
        return employeeData.data;
    }

    fetchProjects = async (id) => {
        const employeeProjectData = await http.post("/api/employee/your-projects", { "id": id });
        return employeeProjectData;
    }

    createProject = async (title, description, employeeIds) => {
        const newProjectData = await http.post("/api/projects/create", {title, description, employeeIds});
        return newProjectData;
    }

    fetchEmployees = async () => {
        const employeeData = await http.get("/api/employee/all");
        return employeeData;
    }
};

export default new ManagementDataService();