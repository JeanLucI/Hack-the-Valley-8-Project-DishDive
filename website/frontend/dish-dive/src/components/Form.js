import { useState } from 'react'

export default function Form(prop){
    const [tags, setTags] = useState([])
    const [preferences, setPreferences] = useState([])
    const [selectValue, setSelectValue] = useState('')
    const [filters, setFilters] = useState(['Select Filter','Eco-friendly','Vegan','Vegetarian','Meat-lover'])

    const handleChange = (e) => {
        const value = e.target.value
        setSelectValue(value)
        if(!tags.includes(value) && value !== 'Select Filter'){
            setTags([...tags, value])
        }
    }

    const deleteTag = (index) => {
        setTags(tags.filter((el, i) => i !== index))
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

    return(
        <form className="firstForm">
            <label>What is your favourite type of food?</label>
            <input type="text" className="preferences" placeholder="Yummy!"/>

            <label>What is food that makes your stomach turn!?</label>
            <input type="text" className="preferences" placeholder="Yuck!"/>

            <label>Select a few additional filters!</label>
            <SelectDropdown />
            <Tags />

            <button type="submit">push</button>
        </form>
    )
}