import React from 'react';
import Table from 'react-bootstrap/Table'

export default function TableExample({name,score,rank}) {
return (
	<>

<h1 style = {{textAlign: "center"}}>Leaderboard</h1>

<Table stripped bordered hover size="sm">
  <thead>
    <tr>
    <th width="170">#</th>
      <th width="170">Nombre</th>
      <th width="170">Puntaje</th>
      <th width="870">Fecha</th>
    </tr>
    <th><tr>
      {rank}
    </tr></th>
    <th><tr>
      {name}
    </tr></th>
    
    <th><tr>
      {score}
    </tr></th>
    
  </thead>
  <tbody>


  </tbody>
</Table>

	</>
);
}
