import { jwtDecode } from 'jwt-decode';

class AuthService {
    // save jwt which is returned from server to local storage
    saveToken(token) {
        localStorage.setItem('id_token', token);
    };
    // remove token from local storage thus ending authentication
    destroyToken() {
        localStorage.removeItem('id_token');
        return;
    }
    // retrieve token from local storage
    getToken() {
        return localStorage.getItem('id_token');
    };
    // decodes token and checks expiration 
    tokenExpired(token){
        try {
            const decoded = jwtDecode(token);
            if (decoded.exp < Date.now() / 1000) {
                // if decoded.exp is less than current time then expired = true
            return true;
            } else return false;
        } catch (err) {
            return true;
        }
    };
    // checks that token exists and whether or not it is expired
    checkToken() {
        const token = this.getToken();
        // if no token or if token is expired, return false so authentication is invalid
        if (!token || this.tokenExpired(token)) {
            return false
        } else {
            return true;
        }
    };
    // decode token and return data
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