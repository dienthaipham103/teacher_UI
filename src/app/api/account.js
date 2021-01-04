import {axiosClient} from './axiosClient';

export const getAccountAPI = () => {
    return axiosClient.get(`/user`);
}

export const changeUsernameAPI = ({username}) => {
    return axiosClient.put(`/user`, {username});
}