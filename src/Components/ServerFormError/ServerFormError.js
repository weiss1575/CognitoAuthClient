import React from "react";
import "./ServerFormError.css";

function ServerFormError(props) {
  return (
    <div className="serverError">
      {props.error && (
        <React.Fragment>
          <i className="fas fa-exclamation-circle"></i>
          {props.error}
        </React.Fragment>
      )}
    </div>
  );
}

export default ServerFormError;
