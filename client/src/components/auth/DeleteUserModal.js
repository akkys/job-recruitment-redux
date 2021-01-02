import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteUserModal = (props) => {
  return (
    <Modal
      show={props.deleteModalVisible}
      onHide={() => props.setDeleteModalVisible(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-danger" style={{ fontWeight: "500" }}>
          Confirm Message for {props.user.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        Your account will be deleted permanently. Are you sure? <br /> Please
        <code> Confirm </code>to Delete.
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => props.setDeleteModalVisible(false)}
        >
          Close
        </Button>
        <Button
          variant="danger"
          onClick={() => props.deleteHandler(props.user)}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteUserModal;
