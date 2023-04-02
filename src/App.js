import './App.css';
import "./styles.css"
import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'



function App() {

  const[records, setRecords] = useState([]) //We create an array of two items using React's useState hook to rerender the page using new data; 'records' is a state variable and 'setRecords' is the setter function.
  
  function toggleComplete(id, completed){ //this method is used to flip the 'completed' boolean. The id and the current state of the 'completed' variable will be passed in.
    setRecords((prevData) => //the setRecords method will be used to update the existing records
      prevData.map((list) =>  //the .map method is used to create a new array using the items in the existing 'list' array
        list.id === id ? { ...list, completed: !completed } : list //if the id passed in matches the id of an item in the list, the new list will contain an object with the 'completed' variable set to the opposite of the existing object. Otherwise, the existing object is unchanged in the new list.
      )
    );
  };

  useEffect(() =>{ //useEffect is a hook that syncs a component with an external system.
    
    fetch('https://jsonplaceholder.typicode.com/todos/') //the 'fetch' method is used to query the API passed in. It will return a 'Promise Object'.
      .then(response => response.json()) //the 'Promise' Object is then turned into a JSON object using .json()
      .then(data => setRecords(data)) //the JSON object is then used to create the records object using the 'setRecords' method
      .catch(err => console.log(err)) //If there is an error with the request, the console will log it.
      
   
  },[]);

  return (
    <div className="App">
      <ul>
        {records.map((list, index)=> ( //the .map method is used to create list items in HTML by creating a new array using the existing data in 'records'.
          <li id={list.id} key={index} className={`container ${list.completed ? "strike" : ""}`}> {/* Each list item will be created with an id of 'list.id' and key of 'index'. It will be assigned a className depending on the value of its 'list.completed' variable; it's here that the strikethrough will be drawn using the 'strike' CSS class. */}
          userId: {list.userId} <br />
          id: {list.id} <br />
          title: {list.title} <br />
          completed: {String(list.completed) } 
          <input type="checkbox" checked={list.completed} onChange={() => toggleComplete(list.id, list.completed)}/> {/* A checkbox will be added to each list item. Clicking on it will trigger the toggleComplete() method created earlier.*/}
          </li>
        ))}
      </ul>
    </div>
    
  );
  
}

export default App;
