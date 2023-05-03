import React from 'react'

export const Earned = ({ earned, setEarned, setUserName, userName, setStop, setQuestionNumber }) => {
    //formatting amount
    const convert = (num) => {
        const localeString = new Intl.NumberFormat("en-US").format(num);
        return localeString;
    };

    const handleClick = () => {
        // setting the username to null
        setUserName(null)
        // setting earned to 0 
        setEarned("0")
        // setting stop to false 
        setStop(false)
        //setting question number to 1
        setQuestionNumber(1)
    }
    return (

        <>
            {
                earned < 8000 ?
                    <div className='earnedContent'>
                        <div className="content">
                            <h3 className="endText">You Earned: ${convert(earned)}</h3>
                            <button onClick={handleClick} className='tryAgain'>Try Again</button>
                        </div>
                    </div>
                    :
                    <div className='earnedContent congrats'>
                        <div className="content">
                            <h1 className='endText'>Congratulations {userName}</h1>
                            <h3 className="endText">You Earned: ${convert(earned)}</h3>
                            <button onClick={handleClick} className='tryAgain'>Restart</button>
                        </div>
                    </div>
            }

        </>

    )
}
