import {axiosClient} from "./axiosClient";

export const getListQuizAPI = ({ page = 1, limit = 10 }) => {
  return axiosClient.get(`/quiz/all/available`);
};

export const getListExpiredQuizAPI = () => {
  return axiosClient.get(`/quiz/all/expired`);
};

export const getNotRegisterChildAPI = () => {
  return axiosClient.get(`/quiz/all/not-registered-child`);
};

export const getQuizInfoAPI = ({ id }) => {
  return axiosClient.get(`quiz/${id}`);
};


// api for pratice
export const getListPraticeAPI = () => {
  return axiosClient.get(`/quiz/practice`);
};

export const getPracticeIdAPI = ({quizId, userId}) => {
  return axiosClient.get(`/practice/${quizId}/${userId}`);
}

export const getPracticeHistoryAPI = ({combinedId}) => {
  return axiosClient.get(`/practice/get-practice-by-id/${combinedId}`);
}

// api for creating test
export const createQuizAPI = data => {
  return axiosClient.post(`quiz`, data);
};

// api for update test info
export const updateQuizAPI = ({id, data}) => {
  return axiosClient.put(`quiz/${id}`, data);
};

// api for uploading image - COVER IMAGE
export const getImageUrlAPI = ({id}) => {
  return axiosClient.get(`quiz/get-put-quiz-cover-url/${id}`);
};

// api for get questions of a quiz
export const getQuestionsAPI = ({id}) => {
  return axiosClient.get(`quiz/${id}/question`);
};

// api for create a questions of a quiz
export const createQuestionAPI = ({id, data}) => {
  return axiosClient.post(`quiz/${id}/question`, data);
};

// api for create a questions of a quiz
export const updateQuestionAPI = ({id, questionId, data}) => {
  return axiosClient.put(`quiz/${id}/question/${questionId}`, data);
};

// api for uploading image - QUESTIONS IMAGES
export const getQuestionImageUrlAPI = ({id, questionId}) => {
  return axiosClient.get(`quiz/${id}/question/get-put-question-image-url/${questionId}`);
};

// api for deleting a question
export const deleteQuestionAPI = ({id, questionId}) => {
  return axiosClient.delete(`quiz/${id}/question/${questionId}`);
};

// tracking a quiz
export const getDoneQuizListAPI = ({id}) => {
  return axiosClient.get(`test/quiz/${id}`);
};


// get question of a quiz
