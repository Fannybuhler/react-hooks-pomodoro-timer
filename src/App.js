import React, { useState, useEffect } from "react";
import "./Style/App.css";
import Timer from "./components/Timer";
import BreakLength from "./components/BreakLength";
import SessionLength from "./components/SessionLength";

function App() {
    const [breakLength, setBreaklength] = useState(5);
    const [sessionLength, setSessionlength] = useState(25);
    let [timerMinute, setTimerMinute] = useState(25);

    function onIncreaseBreakLength() {
		setBreaklength(breakLength + 1)
	}

	function onDecreaseBreakLength() {
		setBreaklength(breakLength - 1)
	}

	function onIncreaseSessionLength() {
		setSessionlength(sessionLength + 1)
		setTimerMinute(timerMinute + 1)
	}

	function onDecreaseSessionLength() {
		setSessionlength(sessionLength - 1)
		setTimerMinute(timerMinute - 1)
	}

	function onUpdateTimerMinute() {
		setTimerMinute(timerMinute - 1)
	}

	function onToggleInterval(isSession) {
		if(isSession) {
			setTimerMinute(timerMinute = sessionLength)
			console.log('set timer to session length')
		} else {
			setTimerMinute(timerMinute = breakLength)
			console.log('set timer to break length')
		}
	}

	function onResetTimer() {
		setTimerMinute(sessionLength)
		console.log("reset timer")
	}

    return (
        <div className="App">
            <h1>Hello World</h1>
            <BreakLength
                breakLength={breakLength}
                increaseBreak={onIncreaseBreakLength}
				decreaseBreak={onDecreaseBreakLength}
            />
            <SessionLength 
				sessionLength={sessionLength}
				increaseSession={onIncreaseSessionLength}
				decreaseSession={onDecreaseSessionLength} />
            <Timer 
				timerMinute={timerMinute}
				breakLength={breakLength}
				updateTimerMinute={onUpdateTimerMinute}
				toggleInterval={onToggleInterval}
				resetTimer={onResetTimer} />
        </div>
    );
}

export default App;
