import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import {useState,useEffect} from 'react';
import Sweetcard from '../components/Sweetcard.jsx';
import NewSweet from '../components/NewSweet.jsx';
export default function()
{
    const [sweets,setsweets] = useState([]);
    const token = localStorage.getItem("token");
        let role = null;
        if (token) {
            const decoded = jwtDecode(token);
            // ADMIN or USER
            role = decoded.role; 
           }
     if (role=="user") {
        alert("Only admins can access the Admin page");
        return <Navigate to="/dashboard" replace />;
      }
      else if(!token){
        alert("login to access admin page");
        return <Navigate to="/login" replace />
      }
      //handles adding of new sweet to database
      const newsweet =async(body)=>{
        console.log("newsweet function called");
        try
        {
        const res = await api.post(`api/sweets`,body);
        frender();
        alert("new sweet added");
        }
        catch(err)
        {
          alert("failed to fetch data your session might be expired");
        }
      }
      //handles pruchase of sweet
      const handlepurchase=async(obj)=>{
       try{
        const res = await api.post(`api/sweets/${obj._id}/purchase`, {
  quantity: obj.qty
});
       frender();
       alert("sweet purchase success");
       }
       catch(err)
       {
        alert("failed to purchase data your session might be expired")
       }
    }
    //handles uppdating sweet information
    const editsweet=async(id,body)=>{
       try{
        const res = await api.put(`api/sweets/${id}`,body);
        frender();
        alert("updated sweet");
       }
       catch(err)
       {
        alert("failed to update sweet your session might be expired")
       }
    }
    //handles restocking of sweet quantity increasing
    const restocksweet=async(id,body)=>{
    try{
      const res = await api.post(`api/sweets/${id}/restock`,body);
      frender();
      alert("restocked sweet");
    }
    catch(err)
       {
        alert("failed to restock sweet your session might be expired")
       }
    }
    //handles deletion of sweet
    const deletesweet=async(id)=>{
        try{
        const res = await api.delete(`api/sweets/${id}`);
       frender();
       alert("sweet deleted");
       }
       catch(err)
       {
        alert("failed to delete data your session might be expired")
       }
    }
      async function frender()
    {
      console.log("frender called");
      try{
   const res = await api.get("/api/sweets");
   setsweets(res.data);
      }
      catch(err)
      {
        alert("failed to fetch data your session might be expired");
      }
    }
    useEffect(()=>{
        frender();
      },[]);
    return (
      <>
        <div className="sweetsContdboard">
        {
          sweets.map((sweet)=>{
          return <Sweetcard key={sweet._id} sweet={sweet} handlepurchase={handlepurchase} deletesweet={deletesweet} editsweet={editsweet} restocksweet={restocksweet}/>
          })
        }
        </div>
        <NewSweet newsweet={newsweet}/>
      </>
    );
}