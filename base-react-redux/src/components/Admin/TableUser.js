import { useEffect, useState } from "react";
const TableUser=(props)=>{

    const {listUser}=props;

    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th >Action</th>
                </tr>
            </thead>
            <tbody>
                {listUser && listUser.length>0 &&
                listUser.map((item,index)=>{
                    <tr key={`table-users-${index}`}>
                    <th scope="row">{item.id}</th>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                        <button className='btn btn-secondary'>View</button>
                        <button className='btn btn-warning mx-3'
                        onClick={()=> props.handleClickUpdate(item)}>Update</button>
                        <button className='btn btn-danger'
                        onClick={()=> props.handleClickDelete(item)}>Delete</button>
                    </td>
                    </tr>
                })}
                {listUser && listUser.length===0 && 
                <tr>
                    <td colSpan={'4'}>Not found users
                    </td>
                </tr>}
            </tbody>
        </table>
    )
}
export default TableUser;