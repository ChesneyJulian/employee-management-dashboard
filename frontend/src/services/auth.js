import { jwtDecode } from 'jwt-decode';

class AuthService {
    saveToken(token) {
        localStorage.setItem('id_token', token);
    };

    destroyToken() {
        localStorage.removeItem('id_token');
        return;
    }

    getToken() {
        return localStorage.getItem('id_token');
    };

    tokenExpired(token){
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                // if decoded.exp is less than current time then yes expired
            return true;
            } else return false;
        } catch (err) {
            return false;
        }
    };
    
    checkToken() {
        const token = this.getToken();
        return !!token && !this.tokenExpired(token);
    };

    decodeToken() {
        const token = this.getToken();
        if (token) {
            return jwtDecode(token);
        } else {
            return false;
        }
    }
};

export default new AuthService();