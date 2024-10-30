// import React from 'react';
import "../app/shared.css";
import "./Button.css";

interface ButtonProps {
    buttonType?: 1 | 2;
    disabled?: boolean;
    text: string;
    onSubmit?: React.FormEventHandler<HTMLButtonElement>;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ buttonType = 1, text, disabled = false, onSubmit, onClick }: ButtonProps) => {
  return (
    <button className={`stringplay-btn v${buttonType}`} disabled={disabled} onSubmit={onSubmit} onClick={onClick}>{text}</button>
  )
}

export default Button;