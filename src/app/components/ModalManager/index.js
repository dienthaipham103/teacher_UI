import React from "react";
import { useSelector, useDispatch } from "react-redux";
import _isEmpty from "lodash/isEmpty";

import AssginChildToTest from "./AssignChildToTest";
import { closeModal } from "app/store/modal";

const modalLookup = {
  ["AssginChildToTest"]: AssginChildToTest
};

function ModalManager() {
  const props = useSelector(state => state.modal);
  const dispatch = useDispatch();

  let renderModal;

  if (!_isEmpty(props) && props.modalName) {
    const { modalName, modalProps = {} } = props;
    const ModalComponent = modalLookup[modalName];
    renderModal = (
      <ModalComponent
        defaultCancel={() => dispatch(closeModal())}
        {...modalProps}
      />
    );
  }
  return <span>{renderModal}</span>;
}

export default ModalManager;
