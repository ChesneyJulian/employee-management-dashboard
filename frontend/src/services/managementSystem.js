import http from '../http-common';

class ManagementDataService {
    getAllDepartments = async () => {
        const departmentData = await http.get("/api/department/all");
        return departmentData;
    }

    employeeLogin = async (email, password) => {
        const employeeData = await http.post("/api/employee/login", email, password);
        console.log(employeeData);
        return employeeData;
    }
};

export default new ManagementDataService();