import React, { useState, useEffect } from 'react'
import './App.css'
import api from './api/api'
import axios from 'axios'
import Elements from './Elements'
import { nanoid } from "nanoid"

function Questionss(props) {
    const [allQuestions, setAllQuestions] = useState([])
    const [selectedAnswer, setSelectedAnswer] = useState()
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [checkAnswerBtn, setCheckAnswerBtn] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const allQuestionsAnswered= allQuestions.every(question => question.selectedAnswer !== "");
    useEffect(() => {
        async function getData() {
            const response = await api.get();
            const newArray = []
            setAllQuestions(() => {
                for (let i = 0; i < 5; i++) {
                    newArray.push({ id: nanoid(), selectedAnswer:'', ...response.data.results[i] })
                }
                return newArray
            }
            )
        } getData()
    }, [])

    useEffect(()=>{
        if(allQuestions.length !==0 && allQuestionsAnswered){
            let correctAnswers=0;

            allQuestions.forEach(question=>{
                if(question.selectedAnswer===question.correct_answer)
                correctAnswers++;
            });
            setCorrectAnswersCount(correctAnswers);
        }
    },[allQuestions])

    const handleSelectAnswer = (id, answer) => {
        setAllQuestions(prevQuestionsArray => (
            prevQuestionsArray.map(question => (
                question.id === id
                    ? { ...question, selectedAnswer: answer }
                    : question
            ))
        ));
    }

    const displayQuestions = allQuestions.map(item => {
        return <Elements
            id={item.id}
            key={item.id}
            correctAnswer={item.correct_answer}
			incorrectAnswers={item.incorrect_answers}
            questioon={item.question}
            selectedAnswer={item.selectedAnswer}
            handleSelectAnswer={handleSelectAnswer}
        />
    })
   function checkAnswers(){
		if (allQuestionsAnswered) {
			setIsGameOver(true);
		}
	}
    function resetGame(){
        setIsGameOver(false);
        setCheckAnswerBtn(false);
        props.handleGameStart();
    }
    return (
        <div className='all-elements'>
            {displayQuestions}
            {isGameOver &&
					<h3>
						You scored {correctAnswersCount}/5 correct answers
					</h3>
				}
            <button className='check-btn' onClick={isGameOver ? resetGame: checkAnswers}>{isGameOver ? "Play again" : "Check answers"}</button>
        </div>
    )
}
export default Questionss;