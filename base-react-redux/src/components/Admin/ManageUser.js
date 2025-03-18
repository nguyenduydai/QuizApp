import ModalCreateUser from "./ModalCreateUser";
import {FcPlus} from 'react-icons/fc';
import TableUser from './TableUser'
import { getAllUsers,getUsersWithPaginate } from "../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
import { useState,useEffect } from "react";
const ManageUser=(props)=>{
    const LIMIT_USER=3;
    const [pageCount,setPageCount]=useState(0);
    const [currentPage,setCurrentPage]=useState(1);
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [listUser,setListUser]=useState([]);
    const [dataUpdate,setDataUpdate]=useState({});
    const [dataDelete,setDataDelete]=useState({});
    useEffect(()=>{
        fetchUsersWithPaginate(1);
    },[])
    const fetchAllUsers=async()=>{
        let res=await getAllUsers();
        if(res.EC===0){
            setListUser(res.DT)
        }
    }

    const fetchUsersWithPaginate=async(page)=>{
        let res=await getUsersWithPaginate(page,LIMIT_USER);
        if(res.EC===0){
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    }

    const handleClickUpdate  =(user)=>{
        setShowModalUpdateUser(true);
        setDataUpdate(user)
    }

    const resetUpdateData  =()=>{
        setDataUpdate({})
    }
    const handleClickDelete=(user)=>{
        setShowModalDeleteUser(true);
        setDataDelete(user)
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                ManageUser 
            </div>
            <div className="users-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={()=>setShowModalCreateUser(true)}> <FcPlus/>Add new users</button>
                </div>
                <div className="table-users-container">
                    {/* <TableUser listUser={listUser}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}/> */}

                    <TableUserPaginate listUser={listUser}
                        handleClickUpdate={handleClickUpdate}
                        handleClickDelete={handleClickDelete}
                        fetchUsersWithPaginate={fetchUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}/>
                </div>
                <ModalCreateUser show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchAllUsers={fetchAllUsers}
                    fetchUsersWithPaginate={fetchUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalUpdateUser show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    resetUpdateData={resetUpdateData}
                    fetchAllUsers={fetchAllUsers}
                    fetchUsersWithPaginate={fetchUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalDeleteUser show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchAllUsers={fetchAllUsers}
                    fetchUsersWithPaginate={fetchUsersWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}
export default ManageUser;