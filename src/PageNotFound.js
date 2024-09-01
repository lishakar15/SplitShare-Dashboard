import React from 'react'

const PageNotFound = () => {

  const styleObj ={
    width:"100%",
    height:"50vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  }
  const errMsgStyleObj = {
    color:"red",
    backgroundColor:"grey",
    padding:"80px 50px 80px 50px",
  }

  return (
    <div className="container" style={styleObj}>   
      <h1 style ={errMsgStyleObj}>404 Page Not Found</h1>
    </div>
  )
}

export default PageNotFound;
