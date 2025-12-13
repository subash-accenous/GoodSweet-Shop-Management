import {useState} from 'react';
import api from "../api/axios";
export default function ()
{
    const [username,setusername] =useState("");
    const [password,setpassword] =useState("");
    const [role, setRole] = useState("user");
    const handleregister =async(e)=>{
        e.preventDefault();
         try {
          const res = await api.post("/api/auth/register", {
            username,
            password,
            role
          });
          //message recieved from backend response after successfully login
          alert("register successful");
        } catch (err) {
            console.log(err);
          alert("Invalid credentials");
        }
        }
    return(
        <form className="formrl" onSubmit={handleregister}>
        <div className="formwrap">
        <label htmlFor="unameform">Username</label>
        <input id="unameform" type="text" value={username} onChange={(evt)=>(setusername(evt.target.value))} required />    
        </div>
        <div className="formwrap">
        <label htmlFor="passform">Password</label>
        <input id="passform" type="text" value={password} onChange={(evt)=>(setpassword(evt.target.value))} required />
        </div>
        <div className="formwrap">
        <select value={role} onChange={(e) => setRole(e.target.value)}>
         <option value="user">user</option>
         <option value="admin">admin</option>
        </select>
        </div>
        <button type="submit" >Register</button>
        </form>
    );
}