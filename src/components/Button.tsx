// import React from 'react';
import "../App.css";
import "./Button.css";

interface ButtonProps {
    buttonType?: number;
    text: string;
}

const Button = ({ buttonType = 1, text }: ButtonProps) => {
  return (
    <div className={`stringplay-btn v${buttonType}`}>{text}</div>
  )
}

export default Button;