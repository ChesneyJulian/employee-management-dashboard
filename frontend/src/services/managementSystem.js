import http from '../http-common';
import AuthService from './auth'
class ManagementDataService {
    getAllDepartments = async () => {
        const departmentData = await http.get("/api/department/all");
        return departmentData;
    }

    employeeLogin = async (email, password) => {
        console.log(email, password);
        const employeeData = await http.post("/api/employee/login", { email, password });
        AuthService.saveToken(employeeData.data);
        return employeeData;
    }
};

export default new ManagementDataService();