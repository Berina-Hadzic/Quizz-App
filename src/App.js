
import { useState } from 'react';
import './App.css';
import Questionss from './Questionss';

function App() {
const [startQuiz,setStartQuiz]=useState(false)
  function startQuizz(){
    setStartQuiz(true)
  }
  const handleGameStart = () => setStartQuiz(prevState => !prevState);

  return (
    <main>
      {startQuiz ?
      <Questionss handleGameStart={handleGameStart} />
      :
      <div className="main--div">
        <h1 className="main--title">Quizzical</h1>
        <h3 className="main--h3">Some description if needed</h3>
        <div className="main--btn" onClick={startQuizz}>Start quiz</div>
      </div>}
    </main>
  );
}
export default App;
