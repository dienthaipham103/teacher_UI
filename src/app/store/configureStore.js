import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import modal from "./modal";
import auth from "./auth";
import quizzes from "./quiz";
import user from "./user";
import student from "./student";
import account from "./account";
import doTest from "./doTest";

const reducer = combineReducers({ modal, auth, quizzes, user, student, account, doTest });

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production"
});

export default store;

/**
 * let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer
  },
  middleware
});

sagaMiddleware.run(saga);
 */
