// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react';
import {useState} from 'react';

function Greeting({initialName}) {
  const [name, setName] = useState(initialName);

  function handleChange(event) {
    setName(event.target.value);
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Amparo" />
}

export default App
