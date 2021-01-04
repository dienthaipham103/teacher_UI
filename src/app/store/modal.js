import { createSlice } from "@reduxjs/toolkit";

const initialState = { visible: false };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: {
      reducer: (_, actions) => {
        console.log('openModal reducer - actions', actions);
        return actions.payload;
      },
      prepare: (modalName, modalProps) => {
        console.log('openModal prepare modalName', modalName);
        console.log('openModal prepare modalProps', modalProps);
        return { payload: { modalName, modalProps } };
      }
    },
    closeModal: () => {
      return {};
    },
    offVisible(state, action) {
      state.visible = false;
    },
    onVisible(state, action) {
      state.visible = true;
    }
  }
});

export const { openModal, closeModal, onVisible, offVisible } = modalSlice.actions;

export default modalSlice.reducer;
