import React from "react";
import "./Input.css";

function Input(props) {
  return (
    <div className="form-group">
      <label htmlFor="username">{props.placeholder}</label>
      <div className="form-input">
        <input
          type={props.type}
          name={props.name}
          className={
            props.error ? `${props.className} form-error` : props.className
          }
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
        />
        <div className="error">
          {props.error && (
            <React.Fragment>
              <i className="fas fa-exclamation-circle"></i>
              {props.error}
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}

export default Input;
