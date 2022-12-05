import newdata from "./data.js";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [alert, setAlert] = useState("");

  if (!localStorage.getItem("data")) {
    localStorage.setItem("data", JSON.stringify(newdata));
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = () => {
    let data = JSON.parse(localStorage.getItem("data"));
    console.log(data);
    if (
      data.find((user) => user.username === username) &&
      data.find((user) => user.password === password)
    ) {
      setCount(0);
      setAlert("Sahi hai👌👌!");
    } else {
      setCount(count + 1);
      if (count === 0) {
        setAlert("Galat hai bhai!");
      } else if (count === 1) {
        setAlert("Bhai bola na galat hai😠");
      } else if (count === 2) {
        setAlert("Samajh nahi ata hai kya. Galat hai!😡");
      }
    }
  };

  const onClickRegister = () => {
    let data = JSON.parse(localStorage.getItem("data"));
    if (
      data.find((user) => user.username === username) &&
      data.find((user) => user.password === password)
    ) {
      setAlert("Badmosi nahi! Alreaady Account hai!🤫");
    } else {
      const temp = {
        id: Date.now(),
        username,
        password,
      };
      setAlert("Done! Ban gaya Account")
      data.push(temp);
      localStorage.setItem("data", JSON.stringify(data));
    }
  };

  const onResetHandler = () => {
    setLogin(false);
    setRegister(false);
  };

  if (login) {
    return (
      <div className="App">
        <div>
          <div className="input">
            <p>User Name</p>
            <input
              type="text"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </div>
          <div className="input">
            <p>Password</p>
            <input
              type="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button onClick={onResetHandler}>Back</button>
          <button onClick={onClickLogin}>Login</button>
          <p className="error">{alert}</p>
        </div>
      </div>
    );
  } else if (register) {
    return (
      <div className="App">
        <div className="App">
          <div>
            <div className="input">
              <p>User Name</p>
              <input
                type="text"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="input">
              <p>Password</p>
              <input
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <button onClick={onResetHandler}>Back</button>
            <button onClick={onClickRegister}>Register</button>
            <p className="error">{alert}</p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div>
          <div>Do you have Account? If No Please Sign Up</div>
          <div className="container">
            <button
              onClick={() => {
                setLogin(true);
              }}
            >
              login
            </button>
            <button
              onClick={() => {
                setRegister(true);
              }}
            >
              signup
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
