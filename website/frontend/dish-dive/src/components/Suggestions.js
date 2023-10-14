import { useState } from "react";

export default function Suggestions(prop){
    const [username, setUsername] = useState(prop.username)
    const [suggestions, setSuggestions] = useState('')
    const [response, setResponse] = useState()
    const [disabled, setDisabled] = useState(false)

    const handleDislike = (e) =>{
        setResponse(<p className="response">Thank you for the feedback! We will avoid these foods in the future!</p>)
        setDisabled(true)
    }

    const handleLike = (e) =>{
        setResponse(<p className="response">Thank you for the feedback! These meals will be added to your preferences!</p>)
        setDisabled(true)
    }

    return(
        <>
        <h3 className="welcome">Welcome {username}!</h3>
        <p className="suggestion">On today's personalized menu we a have special suggestion for you today: {suggestions}</p>
        <p className="feedback">Do you like the meals suggested???</p>
        <div className="buttons">
            <button type="button" className="like" disabled = {disabled} onClick={handleLike}>:)</button>
            <button type="button" className="dislike" disabled = {disabled} onClick={handleDislike}>:(</button>
        </div>
        
        {response}
        </>
    )
}