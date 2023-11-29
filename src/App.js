import React from 'react';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import View from './components/pages/View';
import update from './components/pages/addUpdate';
import Header from './components/Header';
import DashBoard from './components/pages/DashBoard';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Header/>
        <ToastContainer position="top-center"/>
        <Routes>
          <Route exact path="/" Component={DashBoard}/>
          <Route path="/add" Component={update}/>;
          <Route path="/update/:id" Component={update}/>
          <Route path="/view/:id" Component={View}/>;
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
