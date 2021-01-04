import {axiosClient} from "./axiosClient";

export const loginAPI = ({ email, password }) => {
  return axiosClient.post("/auth/signin", { email, password });
};

export const loginFacebookAPI = ({ oAuthAccessToken }) => {
  return axiosClient.post("/auth/signin/oauth/facebook", { oAuthAccessToken });
};

export const loginGoogleAPI = ({ oAuthAccessToken }) => {
  return axiosClient.post("/auth/signin/oauth/google", { oAuthAccessToken });
};

export const signupAPI = ({ email, password }) => {
  return axiosClient.post("/auth/signup", { email, password });
};

export const verifySignupAPI = ({verifySignupToken}) => {
  return axiosClient.post(`/auth/signup/verify-email`, {verifySignupToken})
}

export const addAccount = () => {};

export const signoutAPI = () => {
  // return axiosClient.post("/auth/signout");
  return true;
};

export const getUserAPI = () => {
  return axiosClient.get("/user");
};

export const logoutAPI = () => {
  // return axiosClient.post(`/auth/signout`);
  return true;
};

export const forgetPasswordAPI = ({email, password}) => {
  return axiosClient.post(`/auth/forget-password`, {email, password})
}

export const verifyEmailAPI = ({verifyChangePasswordToken}) => {
  return axiosClient.post(`/auth/forget-password/verify-email`, {verifyChangePasswordToken})
}
