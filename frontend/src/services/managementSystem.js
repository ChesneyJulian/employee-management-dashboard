import http from '../http-common';

class ManagementDataService {
    getAllDepartments = async () => {
        const departmentData = await http.get("/api/department/");
        return departmentData;
    };
};

export default new ManagementDataService();