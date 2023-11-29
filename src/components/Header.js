import React , {useEffect,useState} from "react";
import {Link,useLocation} from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [activeTab, setActiveTab]=useState("DashBoard");
    const location=useLocation();
    useEffect(()=>{
if(location.pathname === "/"){
    setActiveTab("DashBoard");

}else if(location.pathname === "/add"){
  setActiveTab("addUpdate")
}
    },[location])
  return (
    <div className="header">
      <p className="logo">User Management System</p>
      <div className="head-right">
        <Link to ="/">
            <p className={`${activeTab === "DashBoard" ? "active" : ""}`} onClick={()=> setActiveTab("DashBoard")}>DashBoard</p>
        </Link>
        <Link to ="/add">
            <p className={`${activeTab === "addUpdate" ? "active" : ""}`} onClick={()=> setActiveTab("update")}>Add User</p>
        </Link>
       
      </div>
    </div>
  )
}

export default Header
