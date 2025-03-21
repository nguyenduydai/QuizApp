import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";


const  TableUserPaginate=(props)=>{
    const {listUser,pageCount,currentPage}=props;
    const handlePageClick = (event) => {
        props.fetchUsersWithPaginate(+event.selected+1);
        props.setCurrentPage(+event.selected+1);
    };

    return (
        <>
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
                    return (
                        <tr key={`table-users-${index}`}>
                            <th scope="row">{item.id}</th>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>
                                <button className='btn btn-secondary'>View</button>
                                <button className='btn btn-warning mx-3'
                                    onClick={() => props.handleClickUpdate(item)}>Update</button>
                                <button className='btn btn-danger'
                                    onClick={() => props.handleClickDelete(item)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
                {listUser && listUser.length===0 &&
                    <tr>
                        <td colSpan={'4'}>Not found users {listUser.length}
                        </td>
                    </tr>
                }
            </tbody>
        </table>
        <div className="user-pagination d-flex justify-content-center">
            <ReactPaginate
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={pageCount}
                previousLabel="< previous"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
                forcePage={currentPage-1}
            />
        </div>

        </>

        
    )
}
export default TableUserPaginate;