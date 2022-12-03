import axios from 'axios';

const ApiConn = axios.create({
    baseURL: process.env.REACT_APP_URL,
});

export default ApiConn;