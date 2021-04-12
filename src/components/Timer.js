import React from "react";
import { useState, useEffect} from "react";

const Timer = (props) => {
    let [isSession, setIsSession] = useState(true);
    let [timerSecond, setTimerSecond] = useState(0);
	let [intervalID, setIntervalID] = useState(0);

	useEffect(() => {
		props.toggleInterval(isSession)
	}, [isSession])

	useEffect(() => {
		console.log(timerSecond)
	}, [timerSecond])

	function play() {
		let interval = setInterval(decreaseTimer, 1000)
		setIntervalID(intervalID = interval)
	}

	function pause() {
		clearInterval(intervalID)
	}
	
	function reset() {
		pause()
		props.resetTimer()
		setTimerSecond(timerSecond = 0)
	}


	function decreaseTimer() {
		switch(timerSecond) {
			case 0:
				console.log("entered case 0")
				if(props.timerMinute === 0) {
					console.log("timer minute is 0")
					if(isSession) {
						setIsSession(false)
					} else {
						setIsSession(true)
					}
				}

				props.updateTimerMinute()
				setTimerSecond(59)
				
				break;
			default:
				console.log("entered default")
				setTimerSecond(timerSecond => timerSecond - 1)
				break;
		}
	}

    return (
        <section className="timer-box">
            <div>
                <h4>{isSession === true ? "Session" : "Break"}</h4>
                <span>{props.timerMinute}</span>
                <span>:</span>
                <span>
                    {timerSecond === 0
                        ? "00"
                        : timerSecond < 10
                        ? "0" + timerSecond
                        : timerSecond}
                </span>
            </div>
			<div>
				<button onClick={play}>Play</button>
				<button onClick={pause}>Pause</button>
				<button onClick={reset}>Reset</button>
			</div>
        </section>
    );
};

// const Timer = () => {
//     const [second, setSecond] = useState("00");
//     const [minute, setMinute] = useState("00");
//     const [isActive, setIsActive] = useState(false);
//     const [counter, setCounter] = useState(0);

//     useEffect(() => {
//         let intervalId;

//         if (isActive) {
//             intervalId = setInterval(() => {
//                 const secondCounter = counter % 60;
//                 const minuteCounter = Math.floor(counter / 60);

//                 const computedSecond =
//                     String(secondCounter).length === 1
//                         ? `0${secondCounter}`
//                         : secondCounter;
//                 const computedMinute =
//                     String(minuteCounter).length === 1
//                         ? `0${minuteCounter}`
//                         : minuteCounter;

//                 setSecond(computedSecond);
//                 setMinute(computedMinute);

//                 setCounter((counter) => counter + 1);
//             }, 1000);
//         }

//         return () => clearInterval(intervalId);
//     }, [isActive, counter]);

//     function stopTimer() {
//         setIsActive(false);
//         setCounter(0);
//         setSecond("00");
//         setMinute("00");
//     }

//     return (
//         <div className="container">
//             <div className="time">
//                 <span className="minute">{minute}</span>
//                 <span>:</span>
//                 <span className="second">{second}</span>
//             </div>
//             <div className="buttons">
//                 <button
//                     onClick={() => setIsActive(!isActive)}
//                     className="start"
//                 >
//                     {isActive ? "Pause" : "Start"}
//                 </button>
//                 <button onClick={stopTimer} className="reset">
//                     Reset
//                 </button>
//             </div>
//         </div>
//     );
// };

export default Timer;
