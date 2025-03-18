import logo from './logo.svg';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCounter, decreaseCounter } from './redux/action/counterAction';
import Header from './components/Header/Header';
import { Link, Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import PerfectScrollbar from 'react-perfect-scrollbar'

const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header/>
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <PerfectScrollbar>
            <Outlet/>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default App;
