import { useEffect, useState } from 'react'

export default function Timer({ setStop, questionNumber }) {
    const [timer, setTimer] = useState(30);

    useEffect(() => {
        // if the timer elapses, stop the quiz 
        if (timer === 0) return setStop(true);
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [setStop, timer]);

    useEffect(() => {
        // if the question number changes, the timer will be set to 30 
        setTimer(30)
    }, [questionNumber])
    return timer;
}
