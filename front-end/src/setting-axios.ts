import axios from "axios";

axios.defaults.baseURL = 'http://localhost:23323';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';