import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {FcPlus} from 'react-icons/fc';
import { toast } from 'react-toastify';
import { postCreateUser } from '../../services/apiServices';


const ModalCreateUser=(props)=> {
  const {show,setShow}=props;

  const handleClose = () =>{
    props.setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("");
    setImage("");
    setPreviewImage("");
  } 
 
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[username,setUsername]=useState("");
  const[image,setImage]=useState("");
  const[role,setRole]=useState("USER");
  const[previewImage,setPreviewImage]=useState("");
  
  const handleUploadImage=(event)=>{
    if(event.target && event.target.files && event.target.files[0]){
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0])
    }
    
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  
  const handleSubmitUser=async ()=>{
    if(!validateEmail(email)){
        toast.error("invalid email");
        return;
    }
    if(!password){
        toast.error("invalid password");
        return;
    }
    let res=await postCreateUser( email,password,username,role,image);
    console.log(">>> check res: ", res)
    console.log(">>> check roleeeeeeeee: ",role);

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
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={show} 
            onHide={handleClose}
            size="xl"
            backdrop="static"
            className='modal-add-user'>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
            <div className="col-md-6">
                <label  className="form-label">Email</label>
                <input type="email" className="form-control" value={email} 
                    onChange={(event)=>setEmail(event.target.value)}/>
            </div>
            <div className="col-md-6">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control" value={password} 
                    onChange={(event)=>setPassword(event.target.value)}/>
            </div>

            <div className="col-md-6">
                <label  className="form-label">Username</label>
                <input type="text" className="form-control" value={username} 
                    onChange={(event)=>setUsername(event.target.value)}/>
            </div>
            <div className="col-md-4">
                <label className="form-label">Role</label>
                <select className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            <div className="col-md-12" >
                <label  className="form-label label-upload" htmlFor='labelUpload'>
                    <FcPlus/>Upload File Image</label>
                <input type="file" hidden id='labelUpload'onChange={(event)=>handleUploadImage(event)}/>
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

export default ModalCreateUser;

