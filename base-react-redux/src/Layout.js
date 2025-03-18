import HomePage from './components/Home/HomePage';
import DashBoard from './components/Admin/DashBoard';
import ManageUser from './components/Admin/ManageUser';
import Admin from './components/Admin/Admin';
import User from './components/User/User';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import App from './App';
import { Route ,Routes} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ListQuiz from './components/User/ListQuiz';
import ManageQuiz from './components/Admin/Quizs/ManageQuiz';
import Questions from './components/Admin/Question/Questions';
import PrivateRoute from './routes/PrivateRoute';
import { Suspense } from 'react';

const NotFound=()=>{
    return (
        <div className='container mt-3 alert alert-danger'>
            404 Not found
        </div>
    )
}

const Layout=()=>{
    return(
        <Suspense fallback={<div>loading...</div>}>
        <Routes>
            <Route path="/" element={<App />} >
                <Route index element={<HomePage />} />
                <Route path="users" element={
                    <PrivateRoute>
                        <ListQuiz />
                    </PrivateRoute>
                }/>
            </Route>
            <Route path="/quiz/:id" element={<ListQuiz />} />
            <Route path="/admins" element={
                <PrivateRoute>
                    <Admin />
                </PrivateRoute>} >
                <Route index element={<DashBoard />} />
                <Route path="manage-users" element={<ManageUser />} />
                <Route path="manage-quizzes" element={<ManageQuiz />} />
                <Route path="manage-questions" element={<Questions />} />

            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
        />
        </Suspense>
    )
}
export default Layout;