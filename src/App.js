import logo from './logo.svg';
import './App.css';
import "./styles.css"
import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'



function App() {

  const[records, setRecords] = useState([]) //We create an array of two items using React's useState hook. 'setRecords' will be used to change the
  
  function(id, completed){
    setRecords((prevData) =>
      prevData.map((list) =>
        list.id === id ? { ...list, completed: !completed } : list
      )
    );
  };

  useEffect(() =>{
    
    fetch('https://jsonplaceholder.typicode.com/todos/')
      .then(response => response.json())
      .then(data => setRecords(data))
      .catch(err => console.log(err))
      
   
  },[]);

  return (
    <div className="App">
      <ul>
        {records.map((list, index)=> (
          <li id={list.id} key={index} className={`container ${list.completed ? "strike" : ""}`}>
          userId: {list.userId} <br />
          id: {list.id} <br />
          title: {list.title} <br />
          completed: {String(list.completed) } 
          <input type="checkbox" checked={list.completed} onChange={() => toggleComplete(list.id, list.completed)}/>
          </li>
        ))}
      </ul>
    </div>
    
  );
  
}

export default App;
