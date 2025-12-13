import { Navigate } from "react-router-dom";
import {useEffect,useState} from "react";
import api from "../api/axios";
import Sweetcard from '../components/Sweetcard.jsx';
import Slider from "@mui/material/Slider";
export default function()
{
    const [value, setValue] = useState([0, 100]);
    const [sweets,setsweets] = useState([]);
    const token = localStorage.getItem("token");
    const [searchq,setsearchq] =useState("");
    const [category,setcategory] =useState("all");
    //re-fetches all available sweets from database
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
    //handles purchase of sweet 
    const handlepurchase=async(obj)=>{
       try{
        const res = await api.post(`api/sweets/${obj._id}/purchase`, {
  quantity: obj.qty
});
       frender();
       alert("sweet purchase success")
       }
       catch(err)
       {
        alert("failed to fetch data your session might be expired")
       }
    }
    //handles search by category,name,price
    const handleqsearch = async(evt)=>
    {
      evt.preventDefault();
      let q="";
      if(searchq)
      {
         q=`name=${searchq}`;
      }
      if(category!="all")
      {
        if(q.length==0)
        {
          q=`category=${category}`;
        }
        else
        {
          q+=`&category=${category}`;
        }
      }
      if(q.length==0)
      {
        q=`minPrice=${value[0]}&maxPrice=${value[1]}`
      }
      else
      {
        q+=`&minPrice=${value[0]}&maxPrice=${value[1]}`
      }
      try{
      const res = await api.get("/api/sweets/search?"+q);
      setsweets(res.data);
      }
      catch(err)
      {
        alert("failed to fetch data your session might be expired");
      }
    }
  // if not logged in → redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  useEffect(()=>{
    frender();
  },[])
    return(
      <>
        <form className="dboardsearch" onSubmit={handleqsearch}>
          <input placeholder="search" onChange={(evt)=>(setsearchq(evt.target.value))}/>
          <button type="submit">search</button>
          <select value={category} onChange={(e) => setcategory(e.target.value)}>
                   <option value="all">all</option>
                   <option value="milk-based">milk-based</option>
                   <option value="flour-based">flour-based</option>
                   <option value="dry-fruit">dry-fruit</option>
          </select>
          <p>₹{value[0]} – ₹{value[1]}+</p>
          <div style={{ maxWidth: "300px" }}>
      <Slider
        value={value}
        onChange={(e, newValue) => setValue(newValue)}
        min={0}
        max={100}
      />
      </div>
        </form>
        <div className="sweetsContdboard">
          {
          sweets.map((sweet)=>{
          return <Sweetcard key={sweet._id} sweet={sweet} handlepurchase={handlepurchase} />
          })
        }
        </div>
        </>
    )
}