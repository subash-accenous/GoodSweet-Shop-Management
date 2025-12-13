import {useState} from 'react';
export default function({newsweet})
{
    const [category,setcategory] =useState("milk-based");
    const [name,setname] = useState("");
    const [price,setprice] = useState(0);
    const [quantity,setquantity] =useState(1);
    return(
        <form className="formrl" onSubmit={(evt)=>{
           evt.preventDefault();
           console.log("calling function");
           newsweet({name:name,price:price,quantity:quantity,category:category});
        }}>
        <div className="formwrap">
         <label htmlFor="name">Name</label>
         <input type="text" id="name" value={name} onChange={(evt)=>(setname(evt.target.value))}/>     
        </div>
        <div className="formwrap">
       <select value={category} onChange={(e) => setcategory(e.target.value)}>
                          <option value="milk-based">milk-based</option>
                          <option value="flour-based">flour-based</option>
                          <option value="dry-fruit">dry-fruit</option>
        </select>
        </div>
        <div className="formwrap">
        <label htmlFor="price">price</label>
         <input type="number" min={0} max={100} id="price" value={price} onChange={(evt)=>(setprice(evt.target.value))}/>
        </div>
        <div className="formwrap">
       <label htmlFor="quantity">quantity</label>
         <input type="number" min={1}  id="quantity" value={quantity} onChange={(evt)=>(setquantity(evt.target.value))}/>
        </div>
        <button type="submit">Add</button>    
        </form>
    );
}