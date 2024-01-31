import axios from 'axios';

// allows vue frontend to make requests to server
export default axios.create({
    baseURL: "http://localhost:8080/",
    headers: {
        "Content-type": "application/json"
    }
});
