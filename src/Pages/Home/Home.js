import React from "react";
import wolf from "../../Assets/wolf.jpg";
import "./Home.css";

export default function Home() {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-center dark">
        <img src={wolf} alt=""></img>
      </div>
    </React.Fragment>
  );
}
