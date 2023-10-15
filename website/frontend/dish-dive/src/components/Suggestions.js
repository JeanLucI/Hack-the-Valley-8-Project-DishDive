import { useState, useEffect } from "react";
import axios from "axios";

export default function Suggestions(prop){
    const [username, setUsername] = useState(prop.username)
    const [suggestion, setSuggestion] = useState('Brocoli')
    const [response, setResponse] = useState()
    const [disabled, setDisabled] = useState(false)
    const [preferences, setPreferences] = useState([])
    const [userData, setUserData] = useState()

    useEffect( ()=> {
        let processing = true;
        fetchUser(processing, prop.username)
        fetchSuggestion(processing)
        return () => {
            processing = false;
        }
    },[])

    const fetchUser = async(processing, username) => {
        const data = {params: {user_id: username}}
        await axios.get('http://127.0.0.1:5000/fetch_user', data)
        .then(res => {
            if(processing){
                setPreferences(res.data.preferences)
                setUserData(res.data)
            }
        })
        .catch(err => console.log(err))
    }

    const fetchSuggestion = async(processing) => {
        const data = {params: {user_id: username}}
        await axios.get('http://127.0.0.1:5000/fetch_suggestion', data)
        .then(res => {
            if (processing){
                setSuggestion(res.data.suggestion)
            }
        })
        .catch(err => console.log(err))
    }

    const updatePref = async(data) => {
        await axios.post('http://127.0.0.1:5000/update_preferences', data)
        .then(res => console.log(res))
    }
    
    const handleDislike = (e) =>{
        setResponse(<p className="response">Thank you for the feedback! We will avoid this meal in the future!</p>)
        setDisabled(true)
        const data = {
            user_id: username,
            preferences: [...preferences, "not " + suggestion]
        }
        updatePref(data)
    }

    const handleLike = (e) =>{
        setResponse(<p className="response">Thank you for the feedback! This meal will be added to your preferences!</p>)
        setDisabled(true)
        const data = {
            user_id: username,
            preferences: [...preferences, suggestion]
        }
        updatePref(data)
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