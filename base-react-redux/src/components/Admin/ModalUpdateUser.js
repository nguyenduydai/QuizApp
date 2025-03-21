import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc';
import { toast } from 'react-toastify';
import { putUpdateUser } from '../../services/apiServices';
import _ from 'lodash';

const ModalUpdateUser=(props)=> {
  const {show,setShow,dataUpdate,fetchAllUsers}=props;

 
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[username,setUsername]=useState("");
  const[image,setImage]=useState("");
  const[role,setRole]=useState("");
  const[previewImage,setPreviewImage]=useState("");
  
  const handleClose = () =>{
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreviewImage("");
    props.resetUpdateData();
  } 
  
  useEffect (()=>{
    if(!_.isEmpty(dataUpdate)){
        setEmail(dataUpdate.email);
        setUsername(dataUpdate.username);
        setRole(dataUpdate.role);
        setImage(dataUpdate.image);
        if(dataUpdate.image){
            setPreviewImage(`data:image/jpeg;base64,${image}`);
        }
       
    }
  },[props.dataUpdate]);


  const handleUploadImage=(event)=>{
    if(event.target && event.target.files && event.target.files[0]){
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
        console.log('>>>>>>>>>>>>>>>>',image,'---------',previewImage)
    }
    
  }

  
  const handleSubmitUser=async ()=>{

    let res=await putUpdateUser(dataUpdate.id,username,role,image);
    console.log(">>> check res: ", res)
    if(res && res.EC===0){
        toast.success(res.EM);
        handleClose();
        await props.fetchUsersWithPaginate(props.currentPage);
    }
    if(res && res.EC!==0){
        toast.error(res.EM);
    }
  }
 
  return (
    <>

      <Modal show={show} 
            onHide={handleClose}
            size="xl"
            backdrop="static"
            className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
            <div className="col-md-6">
                <label  className="form-label">Email</label>
                <input disabled type="email" className="form-control" value={email} 
                    onChange={(event)=>setEmail(event.target.value)}/>
            </div>
            <div className="col-md-6">
                <label  disabled className="form-label">Password</label>
                <input type="password" className="form-control" value={password} 
                    onChange={(event)=>setPassword(event.target.value)}/>
            </div>

            <div className="col-md-6">
                <label  className="form-label">Username</label>
                <input type="text" className="form-control" value={username} 
                    onChange={(event)=>setUsername(event.target.value)}/>
            </div>
            <div className="col-md-4">
                <label  className="form-label">Role</label>
                <select className="form-select" value={role}  onChange={(event)=>setRole(event.target.value)}>
                <option selected value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            <div className="col-md-12" >
                <label  className="form-label label-upload" htmlFor='labelUpload'>
                    <FcPlus/>Upload File Image</label>
                <input type="file" hidden id='labelUpload' onChange={(event)=>handleUploadImage(event)}/>
            </div>
            <div className="col-md-12 img-preview" >
                { previewImage?
                <img src={previewImage}/> : <span>Preview Image</span> 
                }
            </div>

        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitUser}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUser;

