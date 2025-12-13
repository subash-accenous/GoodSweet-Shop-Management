import {v4 as uuid} from 'uuid';
import {useState} from 'react';
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom"
export default function({sweet,handlepurchase,deletesweet,editsweet,restocksweet})
{
    const [ename,setename] =useState(sweet.name);
    const [rquantity,setrquantity] =useState(1);
    const [eprice,seteprice]=useState(sweet.price);
    const path=useLocation().pathname;
    const token = localStorage.getItem("token");
            let role = null;
            if (token) {
                const decoded = jwtDecode(token);
                // ADMIN or USER
                role = decoded.role; 
               }
    const [qty,setqty] = useState(1)
    let qlimit=[];
    for(let i=0;i<=sweet?.quantity;i++)
    {
        qlimit.push(i);
    }
    return(
    <div className="sweetcard">
        <h1>{sweet?.name}</h1>
         <h1>{sweet?.price}</h1>
         <h1>{sweet?.category}</h1>
         <form onSubmit={(evt)=>{
            evt.preventDefault();
            handlepurchase({qty:qty,_id:sweet._id});
            }}>
         <select value={qty} onChange={(evt)=>(setqty(evt.target.value))}>
         {
            qlimit.map((ele)=>{
            return <option key={uuid()} value={ele}>{ele}</option>
         })
         }
         </select>
         <button disabled={sweet.quantity==0} type="submit">purchase</button>   
         </form>

        {role && role=="admin" && path=="/admin" && <button onClick={()=>(deletesweet(sweet._id))}>delete</button>}
        {role && role=="admin" && path=="/admin" && 
        <form className="formrl" onSubmit={(evt)=>{
            evt.preventDefault();
            editsweet(sweet._id,{price:eprice,name:ename});
        }}>
            <div className="formwrap">
         <label htmlFor="ename">Name</label>
         <input type="text" id="ename" value={ename} onChange={(evt)=>(setename(evt.target.value))}/>     
        </div>
        <div className="formwrap">
        <label htmlFor="eprice">price</label>
         <input type="number" min={0} max={100} id="eprice" value={eprice} onChange={(evt)=>(seteprice(evt.target.value))}/>
        </div>
        <button type="submit">edit</button>
        </form>
            }
            {role && role=="admin" && path=="/admin" &&
            <form className="formrap" onSubmit={(evt)=>{
                evt.preventDefault();
                restocksweet(sweet._id,{quantity:rquantity})
            }}> 
            <div className="formwrap">
                   <label htmlFor="rquantity">increase quantity BY</label>
                     <input type="number" min={1}  id="rquantity" value={rquantity} onChange={(evt)=>(setrquantity(evt.target.value))}/>
            </div>
            <button type="submit">Restock</button>
            </form>
            }
    </div>
    );
}