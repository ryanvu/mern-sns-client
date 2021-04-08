import React from 'react';
import './FormInput.scss';

const FormInput = ({label, type, name, id, value, handleChange, post}) => {
    return (
        <div className="form__input">
            <label 
            className="form__input-label" 
            htmlFor={label}>{label}</label>
            {post ? 
            <textarea
            className="form__input-post"
            onChange={handleChange} 
            type={type} 
            name={name} 
            id={id} 
            value={value} /> : 
            <input 
            className={post ? "form__input-post": "form__input-input"} 
            onChange={handleChange} 
            type={type} 
            name={name} 
            id={id} 
            value={value}/>}
            
        </div>
    )
}

export default FormInput
