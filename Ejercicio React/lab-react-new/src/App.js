import './App.css';
import {Button} from "react-bootstrap";
import Formulario from './components/formulario';
import Scoreboard from './components/scoreboard'
import React, {useState, useRef, useEffect} from "react";
import { useInterval } from './useIntervalN';
import {
    CANVAS_SIZE,
    SNAKE_START,
    APPLE_START,
    SCALE,
    SPEED,
    DIRECTIONS
} from './constants'

function App () {
  const [score,setScore] = useState(0);
  const canvasRef = useRef();
  const [snake,setSnake] = useState(SNAKE_START);
  const [apple,setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0,-1]);
  const [speed,setSpeed] = useState(null);
  const [gameOver,setGameover] = useState(false);

  useInterval(() => gameLoop(),speed);

  const endGame = () => {
    setSpeed(null);
    setGameover(true);
    setScore(0);
  };

  const moveSnake = ({ keyCode }) =>
  keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);

  /*function createApple(){
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE))); 
  }*/

  const createApple = () =>
  apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  /*function checkCollision (piece,snk = snake){
    if(
      piece[0] * SCALE >= CANVAS_SIZE[0] || 
      piece[0] < 0 || 
      piece[1] * SCALE >= CANVAS_SIZE[1] || 
      piece[1] < 0
      ){return true;}

      for(const segment of snk){
        if(piece[0] === segment[0] && piece[1] === segment[1]) return true;
      }
      return false;
  }*/

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    ){return true;}
      

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]){return true;}     
    }
    return false;
  };

  const checkAppleCollision = newSnake => {
    if(newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]){
      let newApple = createApple();
      setScore(score+100);
      while(checkCollision(newApple,newSnake)){
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () =>{
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if(checkCollision(newSnakeHead)) endGame ();
    if(!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);

  };

  function startGame(){
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0,-1]);
    setSpeed(SPEED);
    setGameover(false);
    setRank(rank+1);
  }

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE,0,0,SCALE,0,0);
    context.clearRect(0,0,  window.innerWidth, window.innerHeight);
    context.fillStyle = "blue";
    snake.forEach(([x,y]) => context.fillRect(x,y,1,1));
    context.fillStyle = "pink";
    context.fillRect(apple[0],apple[1],1,1);
  }, [snake,apple,gameOver])

  const [name,setName] = useState("");
  const [rank,setRank] = useState(0);
  return (
    <div role="button" tabIndex = "0" onKeyDown ={e => moveSnake(e)}>
      <header className="App-header">
        <Formulario name ={name} setName={setName}/>
      </header>
      <p></p>
      <button onClick = {startGame} class="glow-on-hover">Start Game</button>
      <p></p>
      <canvas style = {{border: "1px solid black"}} id= "canva"
      ref = {canvasRef}
      width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && <div id= "gameO">Game Over!</div>}
      <p id="score">Score: {score} </p>
      <Scoreboard 
      name ={name} 
      score = {score}
      rank = {rank}
      />
      
    </div>
  );
}

export default App;
