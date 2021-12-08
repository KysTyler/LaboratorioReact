import React from 'react';

function App({name,setName}) {

  return(
    <div className="wrapper">
      <label>
        <p>Enter your name: </p>
      </label>
      <input name="name" onChange={(e) => setName(e.target.value)} value={name}/>
      <button type="submit">Submit</button>
    </div>
  )
}

export default App;