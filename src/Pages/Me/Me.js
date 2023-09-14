import React, { useEffect, useState } from "react";
import AuthService from "../../Auth/AuthService";
import "./Me.css";

function Me() {
  const [isLoading, setIsLoading] = useState(true);
  const [me, setMe] = useState(null);
  const [getMeError, setGetMeError] = useState(null);

  useEffect(() => {
    AuthService.getMe()
      .then((me) => {
        setMe(me);
        console.log(me);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setGetMeError(error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div className="meContainer">
          <h1>Id: {me.attributes.sub}</h1>
          <h1>Username: {me.username}</h1>
          <h1>Email: {me.attributes.email}</h1>
          <h1>
            Email Verified?: {me.attributes.email_verified ? "Yes" : "No"}
          </h1>
          <h1>Preferred MFA Setting: {me.preferredMfaSetting || "None"}</h1>
        </div>
      )}
    </>
  );
}

export default Me;
