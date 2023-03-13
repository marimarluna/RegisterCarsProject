import Axios from 'axios';

let apiUrl = process.env.REACT_APP_API_URL;

const axios = Axios.create({
    baseURL: apiUrl,
    timeout: 10000,
});

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common['Content-Type'] = 'application/json';


export default axios;
