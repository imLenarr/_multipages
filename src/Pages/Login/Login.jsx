import { useRef } from "react";

import Form from "react-bootstrap/Form";

import "./Login.css";
import { verifyUser } from "../../data/users";

function Login({ setToken, setRole }) {
  const userRef = useRef();
  const passRef = useRef();

  return (
    <div className="login-container">
      <div className="tom">
        <img src="./tom.jpg" alt="tomandjerry" className="img" />
      </div>
      <div className="group">
        <div className="wrapper">
          <span className="icon bi bi-person-fill"></span> {" "}
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            type="text"
            id="username"
            placeholder="Enter username"
            style={{ textAlign: "center" }}
            ref={userRef}
          />
        </div>
        <div>
          <span className="icon bi bi-lock-fill"></span>{" "}
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            id="password"
            placeholder="Enter password"
            style={{ textAlign: "center" }}
            ref={passRef}
          />
        </div>
      </div>

      <div className="button">
        <button
          className="btn btn-danger mt-3"
          onClick={() => {
            userRef.current.value = "";
            passRef.current.value = "";
          }}
        >
          Reset <span className="bi bi-arrow-clockwise"></span>
        </button>

        <button
          className="btn btn-success mt-3 "
          style={{ alignItems: "right" }}
          onClick={() => {
            const user = userRef.current.value.trim();
            const pass = passRef.current.value.trim();
            userRef.current.value = "";
            passRef.current.value = "";
            const userInfo = verifyUser(user, pass);

            if (userInfo === null) {
              alert("User or Password are wrong");
              userRef.current.focus();
            } else {
              setToken(userInfo.token);
              setRole(userInfo.role);
            }
          }}
        >
          {" "}
          Login <span className="bi bi-check2-circle line"></span>
        </button>
      </div>
    </div>
  );
}

export default Login;
