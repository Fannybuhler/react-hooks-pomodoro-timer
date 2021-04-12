import React from 'react'

const BreakLength = (props) => {
    function decreaseCounter() {
        if (props.breakLength === 1) {
            return;
        }

        props.decreaseBreak()
    }

    function increaseCounter() {
        if (props.breakLength === 60) {
            return;
        }

        props.increaseBreak()        
    }

    return (
        <div className="length-box">
            <button onClick={decreaseCounter}>Down</button>
            <p>{props.breakLength}</p>
            <button onClick={increaseCounter}>Up</button>
        </div>
    )
}

export default BreakLength