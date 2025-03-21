import Select from 'react-select';
import { useState } from 'react';
import { getAllQuizForAdmin, getAllUsers,postAssignQuiz } from "../../../services/apiServices";
import {toast} from 'react-toastify'

const AssignQuiz =(props)=>{
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz,setListQuiz]=useState([]);
    const [listUser,setListUser]=useState([]);
    const [selectedUser,setSelectedUser]=useState([]);
    useEffect(() => {
        fetchQuiz();
        fetchUser();
    }, [])
 
    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz=res.DT.map(item=>{
                return{
                    value:item.id,
                    label:`${item.id}.${ item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    const fetchUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newUser=res.DT.map(item=>{
                return{
                    value:item.id,
                    label:`${item.id}.${item.username}-${email}`
                }
            })
            setListUser(newUser)
        }
    }
    const handleAssign=async()=>{  
        let res= await postAssignQuiz(selectedQuiz.value,selectedUser.id);
        if(res && res.EC===0){
            toast.success(rs.EM);
        
        }else{
            toast.error(rs.EM);
        }
    }


    return (
        <div className="assign-quiz-container">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select User:</label>
                    <Select
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                        options={listUser}
                    />
                </div>
                <div>
                    <button className='btn btn-warning' onClick={()=>handleAssign()}>Assign</button>
                </div>
        </div>
    )
}
export default AssignQuiz