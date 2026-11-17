import axios from "axios";

import { useState,useEffect, } from "react";

import BASE_URL from "../config";

function Getproduct()
{
    let [data,setData] = useState([])
    const fetchdata = async()=>{
        try{
            const result = await axios.get(`${BASE_URL}/api/product`);
            setData(result.data)   
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchdata()
    },[]);

    return (
        <div>
            <h1>GameZone Components</h1>

            {data.map((item) => (
                <div key={item._id}>

                    <h3>{item.name}</h3>

                    <p>Category: {item.category}</p>

                    <p>Brand: {item.brand}</p>

                    <p>Price: ₹{item.price}</p>

                    <p>Stock: {item.stock}</p>

                    {item.image && (
                        <img
                            src={`${BASE_URL}${item.image}`}
                            alt={item.name}
                            width="150"
                        />
                    )}

                    <hr />

                </div>
            ))}
        </div>
    );
}

export default Getproduct;