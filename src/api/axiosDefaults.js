import axios from "axios";

axios.defaults.baseURL = "https://story-blog-24bc3af065de.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;



export const axiosReq = axios.create();
export const axiosRes = axios.create();