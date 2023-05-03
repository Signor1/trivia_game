import React, { useRef, useState } from 'react'
import { GithubLogo } from "phosphor-react"
import useSound from "use-sound";
import game from "../assets/main.mp3";

export default function Start({ setUserName, userName }) {
    //error msg
    const [error, setError] = useState(false);
    //inputRef
    const inputRef = useRef()

    const [playGame, { stop }] = useSound(game);

    const handleClick = () => {
        //if the input is empty set error to true else, set the value to the username
        if (inputRef.current.value === "") {
            setError(true);
        } else {
            //stop the sound
            stop()
            setUserName(inputRef.current.value);
        }

    }
    return (
        <div className='start' >

            <div className="content" >
                <div className="github">
                    <a href="https://github.com/Signor1" target='_blank' rel='noreferrer'>
                        <GithubLogo size={25} />
                    </a>
                </div>
                <div className="wrapper">
                    <label>Enter Your Username To Start </label>
                    <input type="text" placeholder='Enter Your Username' className='startInput' ref={inputRef} onFocus={() => playGame()} />
                    {
                        error && <code>Enter username!</code>
                    }
                    <div className="btn">
                        <button className='startButton' onClick={handleClick}>Start Quiz</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
