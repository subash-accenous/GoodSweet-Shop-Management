import {useState} from 'react';
import api from "../api/axios";
export default function()
{
    const [username,setusername] =useState("");
    const [password,setpassword] =useState("");
    const handlelogin =async(e)=>{
    e.preventDefault();
     try {
      const res = await api.post("/api/auth/login", {
        username,
        password,
      });
      //token recieved from backend response after successfully login
      const token = res.data.token;

      // store token in locale storage replacing any oldtoken
      localStorage.setItem("token", token);

      alert("Login successful");
    } catch (err) {
      alert("Invalid credentials");
    }
    }
    return(
        <form className="formrl">
        <div className="formwrap">
        <label htmlFor="unameform">Username</label>
        <input id="unameform" type="text" value={username} onChange={(evt)=>(setusername(evt.target.value))} required />    
        </div>
        <div className="formwrap">
        <label htmlFor="passform">Password</label>
        <input id="passform" type="text" value={password} onChange={(evt)=>(setpassword(evt.target.value))} required />
        </div>
        <button type="submit" onClick={handlelogin}>Login</button>
        </form>
    );
}