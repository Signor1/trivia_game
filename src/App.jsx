import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { MoneyPyramid } from "./data/MoneyPyramid";
import Trivia from "./components/Trivia";
import Timer from "./components/Timer";
import Start from "./components/Start";
import { Earned } from "./components/Earned";
import { ListOfQuestions } from './data/questions';



function App() {
  //username 
  const [userName, setUserName] = useState(null)
  //Question - setting the current question number
  const [questionNumber, setQuestionNumber] = useState(1);
  //state for setting stop for the game
  const [stop, setStop] = useState(false)
  //state for seeting amount earned
  const [earned, setEarned] = useState("0")

  //using useMemo hook to hold the money pyraid data
  const MoneyPyramidData = useMemo(() => MoneyPyramid, []);

  useEffect(() => {
    //If the length of the list of questions is not equal to questionNumber, set the Earned amount to the amount that matches the questionNumber - 1 and id of the moneypyraid data. Else If the length of the list of questions is not equal, set the Earned amount to the amount that matches the questionNumber and id of the moneypyraid data
    if (ListOfQuestions.length !== questionNumber) {
      questionNumber > 1 && setEarned(MoneyPyramid.find((m) => m.id === questionNumber - 1).amount)
    } else {
      questionNumber > 1 && setEarned(MoneyPyramid.find((m) => m.id === questionNumber).amount)
    }

  }, [questionNumber])

  //formatting amount
  const convert = (num) => {
    const localeString = new Intl.NumberFormat("en-US").format(num);
    return localeString;
  };

  return <div className="app">
    {
      userName ? (
        <>
          <div className="main">
            {
              stop ? <Earned earned={earned} setUserName={setUserName} userName={userName} setStop={setStop} setQuestionNumber={setQuestionNumber} setEarned={setEarned} /> : (<>
                <div className="top">
                  <div className="timer">
                    <Timer setStop={setStop} questionNumber={questionNumber} />
                  </div>
                </div>
                <div className="bottom">
                  <Trivia setStop={setStop} setQuestionNumber={setQuestionNumber} questionNumber={questionNumber} />
                </div>

              </>)
            }
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {
                MoneyPyramidData.map((money) => (
                  <li className={questionNumber === money.id ? "moneyListItem active" : "moneyListItem"}>
                    <span className="moneyListItemNumber">{money.id}</span>
                    <span className="moneyListItemAmount">$ {convert(money.amount)}</span>
                  </li>
                ))
              }

            </ul>
          </div>
        </>
      ) : <Start setUserName={setUserName} userName={userName} />
    }


  </div>;
}

export default App;
