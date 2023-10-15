import { useState, useEffect } from "react";
import axios from "axios";

export default function Suggestions(prop){
    const [username, setUsername] = useState(prop.username)
    const [suggestion, setSuggestion] = useState('')
    const [response, setResponse] = useState()
    const [disabled, setDisabled] = useState(false)
    const [userData, setUserData] = useState()

    // useEffect( ()=>{
    //     let processing = true;
    //     fetchUser(processing)
    //     fetchSuggestion(processing)
    //     return () => {
    //         processing = false;
    //     }
    // })

    // const fetchUser = async(processing) => {
    //     await axios.get('http://localhost:4000/users')
    //     .then(res => {
    //         if (processing){
    //             setUserData(res.data)
    //         }
    //     })
    //     .catch(err => console.log(err))
    // }

    // const fetchSuggestion = async(processing) => {
    //     await axios.get('http://localhost:4000/suggestion', {user_id: username})
    //     .then(res => {
    //         if (processing){
    //             setSuggestion(res.data.status)
    //         }
    //     })
    //     .catch(err => console.log(err))
    // }

    // const updatePref = async(data) => {
    //     await axios.post('http://localhost:4000/update_preferences', data)
    //     .then(res => console.log(res))
    // }
    
    const handleDislike = (e) =>{
        setResponse(<p className="response">Thank you for the feedback! We will avoid this meal in the future!</p>)
        setDisabled(true)
        // const data = {
        //     user_id: username,
        //     preferences: [...userData.preferences, "not " + suggestion]
        // }
        // updatePref(data)
    }

    const handleLike = (e) =>{
        setResponse(<p className="response">Thank you for the feedback! This meal will be added to your preferences!</p>)
        setDisabled(true)
        // const data = {
        //     user_id: username,
        //     preferences: [...userData.preferences, suggestion]
        // }
        // updatePref(data)
    }

    return(
        <>
        <h3 className="welcome">Welcome {username}!</h3>
        <p className="suggestion">On today's personalized menu we a have special suggestion for you today: {suggestion}</p>
        <p className="feedback">Do you like the meals suggested???</p>
        <div className="buttons">
            <button type="button" className="like" disabled = {disabled} onClick={handleLike}>:)</button>
            <button type="button" className="dislike" disabled = {disabled} onClick={handleDislike}>:(</button>
        </div>
        
        {response}
        </>
    )
}