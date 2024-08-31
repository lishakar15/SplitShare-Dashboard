import React from 'react';
import {useState,useEffect} from 'react';
import SideNavBar from './SideNavBar';

const Home = () =>{

    const [name,setName] = useState("");
    useEffect(()=>{
        setName("Lisha");
    },[])
    
    return(
        <>
            <h1>Home {name}</h1>
        </>
    )
}

export default Home;