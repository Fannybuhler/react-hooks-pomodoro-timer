import React, { useState, useEffect } from "react";
import "./Style/App.css";
import Break from "./components/Break";
import Session from "./components/Session";
import TimeLeft from "./components/TimeLeft";

function App() {
    // const audioElement = useRef(null);
    const [currentSessionType, setCurrentSessionType] = useState("Session"); // 'Session' or 'Break'
    const [intervalId, setIntervalId] = useState(null);
    const [sessionLength, setSessionLength] = useState(60 * 25);
    const [breakLength, setBreakLength] = useState(300);
    const [timeLeft, setTimeLeft] = useState(sessionLength);

    // change timeLeft whenever sessionLength changes
    useEffect(() => {
        setTimeLeft(sessionLength);
    }, [sessionLength]);
    
    useEffect(() => {
        if(timeLeft === 0) {
            if (currentSessionType === "Session") {
                setCurrentSessionType("Break");
                setTimeLeft(breakLength);
            } else if (currentSessionType === "Break") {
                setCurrentSessionType("Session");
                setTimeLeft(sessionLength);
            }
        };
    }, [timeLeft, currentSessionType, breakLength, sessionLength]);

    const decrementBreakLengthByOneMinute = () => {
        const newBreakLength = breakLength - 60;

        if (newBreakLength < 0) {
            setBreakLength(0);
        } else {
            setBreakLength(newBreakLength);
        }
    };

    const incrementBreakLengthByOneMinute = () => {
        setBreakLength(breakLength + 60);
    };

    const decrementSessionLengthByOneMinute = () => {
        const newSessionLength = sessionLength - 60;

        if (newSessionLength < 0) {
            setSessionLength(0);
        } else {
            setSessionLength(newSessionLength);
        }
    };

    const incrementSessionLengthByOneMinute = () => {
        setSessionLength(sessionLength + 60);
    };

    const isStarted = intervalId !== null;
    const handleStartStopClick = () => {
        if (isStarted) {
            clearInterval(intervalId);
            setIntervalId(null);
        } else {
            const newIntervalId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => {
                    const newTimeLeft = prevTimeLeft - 1;
                    if (newTimeLeft >= 0) {
                        return prevTimeLeft - 1;
                    }
                    //audioElement.current.play();
                });
            }, 100);
            setIntervalId(newIntervalId);
        }
    };

    const handleResetButtonClick = () => {
        //audioElement.current.load();
        clearInterval(intervalId);
        setIntervalId(null);
        setCurrentSessionType("Session");
        setSessionLength(60 * 25);
        setBreakLength(60 * 5);
        setTimeLeft(60 * 25);
    };

    return (
        <div className="App">
            <Break
                breakLength={breakLength}
                decrementBreakLengthByOneMinute={
                    decrementBreakLengthByOneMinute
                }
                incrementBreakLengthByOneMinute={
                    incrementBreakLengthByOneMinute
                }
            />
            <TimeLeft
                handleStartStopClick={handleStartStopClick}
                timerLabel={currentSessionType}
                startStopButtonLabel={isStarted ? "Stop" : "Start"}
                timeLeft={timeLeft}
            />
            <Session
                sessionLength={sessionLength}
                decrementSessionLengthByOneMinute={
                    decrementSessionLengthByOneMinute
                }
                incrementSessionLengthByOneMinute={
                    incrementSessionLengthByOneMinute
                }
            />
            <button id="reset" onClick={handleResetButtonClick}>
                Reset
            </button>
            {/* <audio id="beep" ref={audioElement}>
                <source
                    src="https://onlineclock.net/audio/options/default.mp3"
                    type="audio/mpeg"
                />
            </audio> */}
        </div>
    );
}

export default App;
