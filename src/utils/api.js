import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://52.77.226.235:5000/explorer',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }
});
/*
  NOTE: intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired or user is no longer
 authenticated.
 logout the user if the token has expired
*/

api.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject(err);
  }
);

export default api;
