import React, { useEffect } from "react";
import { io } from "socket.io-client";
const App = () => {
  const socket = io("localhost:3000");
  useEffect(()=>{
socket.on("connect",()=>{
  console.log('connected')
})
  },[])
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  );
};

export default App;
