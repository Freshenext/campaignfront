import axios from 'axios';

// dev
const baseURL = 'http://localhost:5000';

// prod
// const baseURL : "https://campaignapi.francis.center/"

export default axios.create({
    baseURL
})