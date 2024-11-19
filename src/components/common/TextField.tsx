// import React from 'react';
import "../../app/shared.css";
import "./TextField.css";

interface TextFieldProps {
    title: string,
    type?: "text" | "password",
    disabled?: boolean,
    onSubmit?: React.FormEventHandler<HTMLInputElement>;
    name?: string;
}

const TextField = ({title, type="text", disabled=false, onSubmit, name}: TextFieldProps) => {
  return (
    <div className="springplay-text-container" data-title={title}>
        <input 
          className="stringplay-text-field"
          type={type} 
          placeholder={title} 
          disabled={disabled} 
          onSubmit={onSubmit} 
          name={name ?? title} id={name ?? title} 
          required 
        />
    </div>
  )
}

export default TextField;