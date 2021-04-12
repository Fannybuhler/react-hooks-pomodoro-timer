import React from 'react'

const SessionLength = (props) => {
    function decreaseSession() {
        if (props.breakLength === 1) {
            return;
        }

        props.decreaseSession()
    }

    function increaseSession() {
        if (props.sessionLength === 60) {
            return;
        }

        props.increaseSession()        
    }

    return (
        <div className="length-box">
            <button onClick={decreaseSession}>Down</button>
            <p>{props.sessionLength}</p>
            <button onClick={increaseSession}>Up</button>
        </div>
    )
}

export default SessionLength
