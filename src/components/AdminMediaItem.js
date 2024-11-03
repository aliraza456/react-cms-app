import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteMediaItem } from "../features/mediaItemsSlice";
import { Modal, ModalHeader, ModalBody, Button } from "reactstrap";
import UpdateMediaItem from "./UpdateMediaItem";

const AdminMediaItem = ({ mediaItem }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const dispatch = useDispatch();

  return (
    <>
      <tr>
        <td>{mediaItem.title}</td>
        <td>{mediaItem.status}</td>
        <td>{mediaItem.description}</td>
        <td>
          <img width="150" src={mediaItem.imageUrl} alt="example" />
        </td>
        <td>
          <Button color="success" onClick={toggle}>
            Edit
          </Button>
        </td>
        <td>
          <Button
            color="danger"
            onClick={() => dispatch(deleteMediaItem(mediaItem.id))}
          >
            Delete
          </Button>
        </td>
      </tr>
      <Modal toggle={toggle} isOpen={modal}>
        <ModalHeader toggle={toggle}>Edit Content</ModalHeader>
        <ModalBody>
          <UpdateMediaItem mediaItem={mediaItem} toggle={toggle} />
        </ModalBody>
      </Modal>
    </>
  );
};

export default AdminMediaItem;