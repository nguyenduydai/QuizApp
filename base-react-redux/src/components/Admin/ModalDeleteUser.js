import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import {deleteUser} from '../../services/apiServices';
const ModalDeleteUser=(props)=> {
  const {show, setShow,dataDelete,fetchAllUsers} = props;

  const handleClose = () => setShow(false);
  const handleSubmitDelete =async ()=>{

    let res=await deleteUser(dataDelete.id);
    console.log(">>> check res: ", res)
    if(res && res.EC===0){
        toast.success(res.EM);
        handleClose();
        props.setCurrentPage(1);
        await props.fetchUsersWithPaginate(1);
    }
    if(res && res.EC!==0){
        toast.error(res.EM);
    }
  }
 
  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         you sure to delete this user.email = <b>{dataDelete && dataDelete.email?dataDelete.email: ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={()=> handleSubmitDelete() }>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;