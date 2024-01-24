import http from '../http-common';
import AuthService from './auth'
class ManagementDataService {
    getAllDepartments = async () => {
        const departmentData = await http.get("/api/department/all");
        return departmentData;
    }

    employeeLogin = async (email, password) => {
        // console.log(email, password);
        const employeeData = await http.post("/api/employee/login", { email, password });
        console.log('employee data ', employeeData);
        AuthService.saveToken(employeeData.data.token);
        return employeeData.data;
    }

    fetchProjects = async (id) => {
        console.log('EMPLOYEE ID ', id)
        const employeeProjectData = await http.post("/api/employee/your-projects", { "id": id });
        console.log('Your Projets ', employeeProjectData)
        return employeeProjectData;
    }
};

export default new ManagementDataService();