import React, { useState, useEffect } from "react";
import "./Calculator.css";

function Calculator() {
  const [display, setDisplay] = useState("");

  // ฟังก์ชันที่ใช้จับค่าปุ่มที่กด
  function handleClick(value) {
    if (value === "C") {
      setDisplay("");
    } else if (value === "CE") {
      setDisplay(display.slice(0, -1));
    } else if (value === "=") {
      try {
        setDisplay(eval(display).toString());
      } catch (error) {
        setDisplay("Error");
      }
    } else {
      setDisplay(display + value);
    }
  }

  // ฟังก์ชันที่ใช้จับเหตุการณ์จากแป้นพิมพ์
  function handleKeyDown(event) {
    const allowedKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "+", "-", "*", "/", "Enter", "Escape","Backspace"];
    
    if (allowedKeys.includes(event.key)) {
      if (event.key === "Enter") {
        handleClick("=");
      } else if (event.key === "Escape") {
        handleClick("C");
      } else if (event.key === "Backspace") {
        handleClick("CE");
      } else {
        handleClick(event.key);
      }
    }
  }

  // ใช้ useEffect เพื่อจับเหตุการณ์เมื่อแป้นพิมพ์ถูกกด
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [display]);

  return (
    <div className="calculator-container">
      <div className="header">
        <input type="text" value={display} placeholder="0" readOnly style={{fontSize: "30px"}} />
        <div className="b" style={{ alignItems: "flex-end" }}>
          <div className="a1">
            <button onClick={() => handleClick("C")} className="operator">C</button>
            <button onClick={() => handleClick("CE")} className="operator">CE</button>
            <button onClick={() => handleClick(".")} className="operator">.</button>
            <button onClick={() => handleClick("/")} className="operator">/</button>
          </div>

          <div className="a4">
            <button onClick={() => handleClick("1")} className="number">1</button>
            <button onClick={() => handleClick("2")} className="number">2</button>
            <button onClick={() => handleClick("3")} className="number">3</button>
            <button onClick={() => handleClick("+")} className="operator">+</button>
          </div>

          <div className="a3">
            <button onClick={() => handleClick("4")} className="number">4</button>
            <button onClick={() => handleClick("5")} className="number">5</button>
            <button onClick={() => handleClick("6")} className="number">6</button>
            <button onClick={() => handleClick("-")} className="operator">-</button>
          </div>

          <div className="a2">
            <button onClick={() => handleClick("7")} className="number">7</button>
            <button onClick={() => handleClick("8")} className="number">8</button>
            <button onClick={() => handleClick("9")} className="number">9</button>
            <button onClick={() => handleClick("*")} className="operator">x</button>
          </div>

          <div className="a5">
            <button onClick={() => handleClick("0")} className="number">0</button>
            <button onClick={() => handleClick("00")} className="number">00</button>
            <button onClick={() => handleClick("=")} className="equal">=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
