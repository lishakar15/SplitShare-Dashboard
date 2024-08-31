import React from 'react';
import {useState,useEffect} from 'react';

const Home = () =>{

    const [name,setName] = useState("");
    useEffect(()=>{
        alert("Greet");
        setName("Lisha");
    },[])
    
    return(
        <>
            <h1>Home {name}</h1>
        </>
    )
}

export default Home;