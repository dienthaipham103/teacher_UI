import {axiosClient} from './axiosClient';

export const getTestAPI = ({id}) => {
    return axiosClient.get(`/test/process/${id}`);
}

export const getRemainTimeAPI = ({id}) => {
    return axiosClient.get(`/test/process/remaining/${id}`);
}

export const updateOneAnswerAPI = ({data, id}) => {
    return axiosClient.put(`/test/process/update/${id}`, data);
}

export const submitAPI = ({id}) => {
    return axiosClient.post(`/test/process/submit/${id}`);
}
// export const changeUsernameAPI = ({username}) => {
//     return axiosClient.put(`/user`, {username});
// }


export const getPracticeAPI = ({id}) => {
    return axiosClient.get(`/practice/process/${id}`);
}

export const resetPracticeAPI = ({id}) => {
    return axiosClient.post(`/practice/process/undone/${id}`);
}

export const getPracticeRemainTimeAPI = ({id}) => {
    return axiosClient.get(`/practice/process/remaining/${id}`);
}

export const updatePracticeOneAnswerAPI = ({data, id}) => {
    return axiosClient.put(`/practice/process/update/${id}`, data);
}

export const submitPracticeAPI = ({id}) => {
    return axiosClient.post(`/practice/process/submit/${id}`);
}