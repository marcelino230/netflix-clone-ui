import axios from "axios";

// Base Url to make same starting of an url
const instance = axios.create({
    baseURL:"https:api.themoviedb.org/3",
});
export default instance;