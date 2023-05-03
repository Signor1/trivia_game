import React, { useEffect, useState } from 'react'
import { ListOfQuestions } from '../data/questions';
import useSound from "use-sound";
import play from "../assets/sounds_play.mp3";
import correct from "../assets/sounds_correct.mp3";
import wrong from "../assets/sounds_wrong.mp3";

export default function Trivia({ setStop, setQuestionNumber, questionNumber }) {
    // state for a single question 
    const [question, setQuestion] = useState(null);
    //state for the selected answer
    const [selectedAnswer, setSelectedAnswer] = useState(null)
    //state for the class names that cause animation on the selected option
    const [className, setClassName] = useState("answer")

    //sound for correct answer
    const [correctAnswer] = useSound(correct);
    //sound for wrong answer
    const [wrongAnswer] = useSound(wrong);
    //initial sound for the start of the quiz
    const [letsPlay] = useSound(play);

    useEffect(() => {
        // play the sound on componentDidMount 
        letsPlay()
    }, [letsPlay]);


    useEffect(() => {
        // setting the question from the list of questions
        setQuestion(ListOfQuestions[questionNumber - 1])
    }, [questionNumber])

    //Custom function for timeout with duration and a callback function as parameters
    const delay = (duration, callback) => {
        setTimeout(() => {
            callback()
        }, duration)
    }

    const handleClick = (a) => {
        setSelectedAnswer(a)
        setClassName("answer active")
        delay(3000, () => setClassName(a.correct ? "answer correct" : "answer wrong"))
        delay(5000, () => {
            if (a.correct) {
                correctAnswer()
                delay(1000, () => {
                    if (ListOfQuestions.length !== questionNumber) {
                        setQuestionNumber(prev => prev + 1);
                        setSelectedAnswer(null);
                    } else {
                        setStop(true);
                        setQuestionNumber(1)
                        setSelectedAnswer(null);
                    }

                })

            } else {
                wrongAnswer();
                delay(1000, () => {
                    setStop(true);
                })

            }

        })
    }
    return (
        <div className='trivia'>
            <div className="question">{question?.question}</div>
            <div className="answers">
                {
                    question?.answers.map((a) => (
                        <div className={selectedAnswer === a ? className : "answer"} onClick={() => handleClick(a)}>{a.text}</div>
                    ))
                }
            </div>
        </div>
    )
}
