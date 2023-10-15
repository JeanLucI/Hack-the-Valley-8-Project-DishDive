import { useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import Suggestions from "../components/Suggestions";

export default function Home(){

    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('')
    const [isUser, setIsUser] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    // const queryUser = async() => {
    //     await axios.get('http://localhost:4000/test')// CHANGE THIS
    //     .then(res => {
    //         if (res){
    //             setIsUser(true);
    //         }
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!username){
            setMessage(<p className="error">Invalid Username. Please try again.</p>)
            return
        }
        // queryUser();
        if(username === 'Jean'){
            setIsUser(true)
        }

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