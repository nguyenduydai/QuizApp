import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import {deleteUser} from '../../services/apiServices';
const ModalResult=(props)=> {
  const {show, setShow,dataModalResult} = props;

  const handleClose = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                Total question : <b>{dataModalResult.countTotal}</b>
            </div>
            <div>
                Total correct answer : <b>{dataModalResult.countCorrect}</b>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>handleClose}>
            Show answers
          </Button>
          <Button variant="primary" onClick={()=> handleClose }>
            close
            </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;