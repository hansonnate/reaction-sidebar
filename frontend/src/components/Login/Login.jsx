import { TextField } from "components/inputs";
import React, { useState } from "react";
import { useLoginRequest } from "api/resources/authentication";

export const Login = ({ setToken }) => {
  const loginUserRequest = useLoginRequest();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handleSubmit = () => {
    loginUserRequest.mutate(
      {
        username: email,
        password: password,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          setToken(data.authenticateUser.token);
        },
      }
    );
  };

  return (
    <div>
      <h1>Login</h1>
      <TextField label="Email" onSave={setEmail} />
      <TextField label="Password" onSave={setPassword} />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export const useToken = () => {
  const getToken = () => {
    const tokenString = localStorage.getItem("reaction_token");
    if (tokenString != undefined) {
      return JSON.parse(tokenString);
    }
    return null;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    console.log(userToken);
    localStorage.setItem("reaction_token", JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
};
