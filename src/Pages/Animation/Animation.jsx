import React, { useState, useEffect } from "react";

import "./Animation.css";

function Animation() {
  const fieldWidth = 700;
  const fieldHeight = 400;
  const diameter = 70;
  const maxLeft = fieldWidth - diameter;
  const maxTop = fieldHeight - diameter;
  const vx = 5;
  const vy = 5;

  const [running, setRunning] = useState(false);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ballImage, setBallImage] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (running) {
        calculate();
      }
    }, 25); // Animation at 40 frames per second
    return () => clearInterval(interval);
  }, [running, position, goRight, goDown]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case " ":
          setRunning(!running);
          break;
        case "1":
          setBallImageHandler("");
          break;
        case "2":
          setBallImageHandler("basketball.png");
          break;
        case "3":
          setBallImageHandler("football.png");
          break;
        case "4":
          setBallImageHandler("volleyball.png");
          break;
        case "5":
          setBallImageHandler("human.jpg");
          break;
        case "6":
          setBallImageHandler("cartoon.png");
          break;
        case "7":
          setBallImageHandler("logo.png");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [running]);

  const runClick = () => {
    setRunning(!running);
  };

  const calculate = () => {
    let { x, y } = position;

    if (goRight) {
      x += vx;
      if (x >= maxLeft) setGoRight(false);
    } else {
      x -= vx;
      if (x <= 0) setGoRight(true);
    }

    if (goDown) {
      y += vy;
      if (y >= maxTop) setGoDown(false);
    } else {
      y -= vy;
      if (y <= 0) setGoDown(true);
    }

    setPosition({ x, y });
  };

  const setBallImageHandler = (image) => {
    setBallImage(image);
  };

  return (
    <div id="container">
      <div
        id="field"
        style={{ width: `${fieldWidth}px`, height: `${fieldHeight}px` }}
      >
        <div
          id="ball"
          className={running ? "rotate" : ""}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            backgroundImage: `url(img/${ballImage})`,
            width: `${diameter}px`,
            height: `${diameter}px`,
          }}
        ></div>
      </div>
      <div id="control">
        <button
          onClick={runClick}
          className={`btn ${running ? "btn-warning" : "btn-success"}`}
        >
          <i className={`bi ${running ? "bi-pause" : "bi-play"}`} style={{ marginRight: "5px" }}></i>
          {running ? "PAUSE" : "RUN"}
        </button>
        <button
          onClick={() => setBallImageHandler("")}
          className="btn btn-light"
        >
          None
        </button>
        <button
          onClick={() => setBallImageHandler("basketball.png")}
          className="btn btn-light"
        >
          Basketball
        </button>
        <button
          onClick={() => setBallImageHandler("football.png")}
          className="btn btn-light"
        >
          Football
        </button>
        <button
          onClick={() => setBallImageHandler("volleyball.png")}
          className="btn btn-light"
        >
          Volleyball
        </button>
        <button
          onClick={() => setBallImageHandler("human.jpg")}
          className="btn btn-light"
        >
          Human
        </button>
        <button
          onClick={() => setBallImageHandler("cartoon.png")}
          className="btn btn-light"
        >
          Cartoon
        </button>
        <button
          onClick={() => setBallImageHandler("logo.png")}
          className="btn btn-light"
        >
          Logo
        </button>
      </div>
    </div>
  );
}

export default Animation;
