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
};

export default new ManagementDataService();