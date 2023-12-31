import { useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import Suggestions from "../components/Suggestions";

export default function Home(){

    const [username, setUsername] = useState('');
    const [message, setMessage] = useState(<br></br>)
    const [isUser, setIsUser] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const queryUser = async() => {
        await axios.post('http://127.0.0.1:5000/check_user', {user_id: username})// CHANGE THIS
        .then(res => {
            console.log(res.data.status)
            if (res.data.status === true){
                setIsUser(true);
            }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!username){
            setMessage(<p className="error">Invalid Username. Please try again.</p>)
            return
        }
        queryUser();

        setLoggedIn(true)
    }

    if (!loggedIn && !isUser) {
        return (
            <>
                <img className="title" src={require('../assets/logo.png')}></img>
                <br></br>
                <form className="username">
                    <input type="text" id="username" name="username" placeholder="Username" value = {username} onChange={ (e) => setUsername(e.target.value) }/>
                    {message}
                    <button type="submit" onClick={handleSubmit}>Enter</button>
                </form>
            </>
        )
    }
    else if (isUser){
        
        return(
            <Suggestions username = {username}/>
        )
    }
    else{
        return(
            <Form username = {username}/>
        )
    }
}