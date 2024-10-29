// import React from 'react';
import "../App.css";
import "./TextField.css";

interface TextFieldProps {
    title: string,
    type?: "text" | "password",
}

const TextField = ({title, type="text"}: TextFieldProps) => {
  return (
    <>
        <div className="springplay-text-container" data-title={title}>
            <input className="stringplay-text-field" type={type} placeholder={title} required />
        </div>
    </>
  )
}

export default TextField;