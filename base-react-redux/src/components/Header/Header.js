
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink ,useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiServices';
import {toast} from 'react-toastify'
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
const Header=()=> {
  const account=useSelector(state=>state.user.account);
  const isAuthenticated=useSelector(state=>state.user.isAuthenticated)
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const handleLogin=()=>{
    navigate('/login')
  }
  const handleRegister=()=>{
    navigate('/register')
  }
  const handleLogout=async()=>{
    let res=await logout(account.email,account.refresh_token);
    if(res&&res.EC===0){
      dispatch(doLogout());
      navigate('/login');
    }else{
      toast(res.EM);
    }
  
  }
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink to="/" className='navbar-brand'>Duy Dai</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/users">User</NavLink>
            <NavLink to="/admins">Admin</NavLink>
          </Nav>
          <Nav>
            {isAuthenticated===false ?
              <>
                <button className='btn-login' onClick={()=>handleLogin()}>Log in</button>
                <button className='btn-signup' onClick={()=>handleRegister()}>Sign up</button>
              </>
              :
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item >Log out</NavDropdown.Item>
                <NavDropdown.Item onClick={()=>handleLogout()}>Profile</NavDropdown.Item>
              </NavDropdown>
            }
            <Language/>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;