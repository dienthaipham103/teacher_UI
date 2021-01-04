import axios from 'axios';
import queryString from 'query-string';
import { logout } from 'app/store/auth';

const axiosClient = axios.create({
  baseURL: 'https://api.wiiquiz.com',
  headers: {
    'content-type': 'application/json'
  },
  paramsSerializer: params => queryString.stringify(params)
});

const setupInterceptors = (store, history) => {
  axiosClient.interceptors.request.use(async config => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  });
  
  axiosClient.interceptors.response.use(
    response => {
      if (response && response.data) {
        return response.data;
      }
      return response;
    },
    error => {
      console.log({error});
      if (error.response.status === 401) {
        console.log({debug: error.config});
        const refreshToken = localStorage.getItem('refreshToken');
        return axios.post('https://api.wiiquiz.com/auth/refresh-token', {refreshToken})
            .then((res) => {
              console.log(res);
              localStorage.setItem('accessToken', res.data.accessToken);
              localStorage.setItem('refreshToken', res.data.refreshToken);
              error.config.headers['Authorization'] = 'Bearer ' + res.data.accessToken;
              return axios.request(error.config)
                  .then(response => {
                    if (response && response.data) {
                      return response.data;
                    }
                    return response;
                  })
                  .catch(e => {throw e});
            })
            .catch((err) => {
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              store.dispatch(logout());
              return Promise.reject(err);
            });
      } else {
        history.push('/');
        return Promise.reject(error);
      }
    }
  );
}

export {
  axiosClient,
  setupInterceptors,
};
