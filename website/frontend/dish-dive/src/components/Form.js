import { useState } from 'react'
import axios from 'axios'
import Suggestions from './Suggestions'

export default function Form(prop){
    const [username, setUsername] = useState(prop.username)
    const [tags, setTags] = useState([])
    const [pref, setPref] = useState([])
    const [selectValue, setSelectValue] = useState('')
    const [filters, setFilters] = useState(['Select Filter','Eco-friendly','Vegan','Vegetarian','Meat-lover'])
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleChange = (e) => {
        const value = e.target.value
        setSelectValue(value)
        if(!tags.includes(value) && value !== 'Select Filter'){
            setTags([...tags, value])
        }
    }

    const handlePos = (e) => {
        if (e.key !== 'Enter') {
            return
        }
        const value = e.target.value
        if(!value.trim()) {
            return
        }
        setPref([...pref, value])
        e.preventDefault()
        e.target.value = ''
    }

    const handleNeg = (e) => {
        if (e.key !== 'Enter') {
            return
        }
        const value = "not " + e.target.value
        if(!value.trim()) {
            return
        }
        setPref([...pref, value])
        e.preventDefault()
        e.target.value = ''
    }

    const post = async() => {
        // const data = {
        //     user_id: username,
        //     preferences: pref,
        //     filters: tags
        // }

        // await axios.post('http://localhost:4000/users', data)
        // .then(res => console.log(res.data))

        setIsLoggedIn(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(tags)
        console.log(pref)

        post()
    }

    const deleteTag = (index) => {
        setTags(tags.filter((el, i) => i !== index))
    }

    const deletePref = (index) => {
        setPref(pref.filter((el, i) => i !== index))
    }

    const SelectDropdown = () =>{
        return (
            <select value={selectValue} onChange={handleChange}>
                {
                    filters.map( (filter)=>{
                        return (<option value = {filter} key = {filter}>{filter}</option>)
                    })
                }
            </select>
        )
    }

    const Tags = () => {
        return(
            <div className="tag-container">
                { tags.map((tag, index) => (
                    <div className='tag-item' key={index}>
                        <span className='text'>{tag}</span>
                        <span className='close' onClick={() => deleteTag(index)}>&times;</span>
                    </div>
                ))}
            </div>
        )
    }

    const Pref = () =>{
        return(
            <div className="tag-container">
                { pref.map((tag, index) => (
                    <div className='tag-item' key={index}>
                        <span className='text'>{tag}</span>
                        <span className='close' onClick={() => deletePref(index)}>&times;</span>
                    </div>
                ))}
            </div>
        )
    }

    if (isLoggedIn){
        return(
            <Suggestions username = {username} />
        )
    }

    return(
        <form className="firstForm">
            <label>Enter food items you like one by one!</label>
            <input type="text" className="preferences" placeholder="Yummy!" onKeyDown={handlePos}/>
            <label>What is food that makes your stomach turn!?</label>
            <input type="text" className="preferences" placeholder="Yuck!" onKeyDown={handleNeg}/>
            <Pref />

            <label>Select a few additional filters!</label>
            <SelectDropdown />
            <Tags />

            <button type="submit" onClick={handleSubmit}>Submit</button>
        </form>
    )
}