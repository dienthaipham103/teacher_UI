import {axiosClient} from './axiosClient';

export const addAccountAPI = data => {
  return new Promise(resolve => setTimeout(() => resolve(true), 1000));
};

export const getChildOfQuizAPI = id => {
  return axiosClient.get(`/quiz/${id}/not-registered-child`);
};

export const assignChildToTestAPI = ({ data, id }) => {
  return axiosClient.post(`test/add-user-to-quiz/${id}`, data);
};

export const childDoTestAPI = ({ id, user }) => {
  return axiosClient.post(`/quiz/${id}/process`, { user });
};

export const getListQuizOfChildAPI = () => {
  return axiosClient.get(`/user/child/quiz`);
};

export const submitQuizAPI = ({ data, id }) => {
  return axiosClient.post(`quiz/${id}/submit`, data);
};

export const getResultOfQuizAPI = ({ data, id }) => {
  return axiosClient.get(`user/child/${data.user}/quiz/${id}/result`);
};

// dien-dev

export const getAllStudentAPI = ({ page = 1, limit = 20 }) => {
  return axiosClient.get(`/user/child/all?page=${page}&limit=${limit}`);
};

export const createNewStudentAPI = (data) => {
  return axiosClient.post(`user/child`, data);
};

export const editStudentAPI = ({ data, id }) => {
  return axiosClient.put(`user/child/${id}`, data);
};

export const deleteStudentAPI = ({ id }) => {
  return axiosClient.delete(`user/child/${id}`);
};

export const getRegisterQuizStudentAPI = ({ id }) => {
  return axiosClient.get(`test/user/${id}/registered`);
};

export const getInprocessQuizStudentAPI = ({ id }) => {
  return axiosClient.get(`test/user/${id}/in-process`);
};

export const  getSubmitQuizStudentAPI = ({ id }) => {
  return axiosClient.get(`test/user/${id}/submitted`);
};

export const getCompleteQuizStudentAPI = ({ id }) => {
  return axiosClient.get(`test/user/${id}/completed`);
};

// for practice
export const getInprocessPracticeStudentAPI = ({ id }) => {
  return axiosClient.get(`practice/in-process/${id}`);
};

export const getDonePracticeStudentAPI = ({ id }) => {
  return axiosClient.get(`practice/done/${id}`);
};




export const changePasswordAPI = ({password, newPassword}) => {
  return axiosClient.post(`user/change-password`, {password, newPassword});
};
