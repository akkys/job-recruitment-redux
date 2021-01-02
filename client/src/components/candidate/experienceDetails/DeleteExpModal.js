import React from "react";
import { Button, Modal } from "react-bootstrap";

const DeleteExpModal = (props) => {
  return (
    <Modal
      show={props.deleteModalVisible}
      onHide={() => props.setDeleteModalVisible(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-danger" style={{ fontWeight: "500" }}>
          Confirm Message
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        This experience will be deleted permanently. Are you sure? <br /> Please
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
          onClick={() => props.deleteHandler(props.experience)}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteExpModal;
