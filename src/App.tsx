import React, { useState } from 'react';
import './App.css';

function App() {
  const [file,addFile]=useState()

  const changeFile=(event:any)=>{
    addFile(event.target.value)
  }

  return (
    <div>
      <input onChange={changeFile} type="file"/>
      <p>{file}</p>
    </div>
  );
}

export default App;
