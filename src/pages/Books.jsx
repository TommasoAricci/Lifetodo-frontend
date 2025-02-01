import React from 'react'
import Navbar from '../components/Navbar'
import Add from '../components/Add/AddButton'

export default function Books() {
  return (
      <>
        <Navbar />
        <Add /* editTodos={editTodos} */ />
        <div className="mainAbout">
          <div id="aboutTitle">
            <h1>My Books</h1>
          </div>
        </div>
  
      </>
    );
}
