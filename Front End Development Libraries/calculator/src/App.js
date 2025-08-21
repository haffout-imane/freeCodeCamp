import React, { useState } from "react";
import "./App.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [exp, setExp] = useState("");

  const handleClear = () => {
    setDisplay("0");
    setExp("");
  };

  const handleNumber = (num) => {
    if (display === "0" || /[=]/.test(exp)) {
      // start new number after "=" or "0"
      setDisplay(num);
      setExp(num);
    } else {
      setDisplay(display + num);
      setExp(exp + num);
    }
  };

  const handleOperator = (op) => {
    if (/=/.test(exp)) {
      // continue from previous result
      setExp(display + op);
      setDisplay(op);
      return;
    }

    if (/[+\-*/]$/.test(exp)) {
      // multiple operators entered
      if (op === "-") {
        // allow negative numbers
        setExp(exp + op);
      } else {
        // replace last operator(s) with the new one
        setExp(exp.replace(/[+\-*/]+$/, op));
      }
    } else {
      setExp(exp + op);
    }
    setDisplay(op);
  };

  const handleDecimal = () => {
    const parts = exp.split(/[-+*/]/);
    const last = parts[parts.length - 1];
    if (!last.includes(".")) {
      if (/=/.test(exp)) {
        // start fresh after "="
        setExp("0.");
        setDisplay("0.");
      } else {
        setExp(exp + ".");
        setDisplay(display + ".");
      }
    }
  };

  const handleEquals = () => {
    try {
      let result = eval(exp);
      result = parseFloat(result.toFixed(10)).toString();
      setDisplay(result);
      setExp(exp + "=" + result);
    } catch (e) {
      setDisplay("Error");
      setExp("");
    }
  };

  const buttons = [
    { id: "clear", label: "AC", onClick: handleClear, className: "col-span-2" },
    { id: "divide", label: "/", onClick: () => handleOperator("/") },
    { id: "multiply", label: "*", onClick: () => handleOperator("*") },

    { id: "seven", label: "7", onClick: () => handleNumber("7") },
    { id: "eight", label: "8", onClick: () => handleNumber("8") },
    { id: "nine", label: "9", onClick: () => handleNumber("9") },
    { id: "subtract", label: "-", onClick: () => handleOperator("-") },

    { id: "four", label: "4", onClick: () => handleNumber("4") },
    { id: "five", label: "5", onClick: () => handleNumber("5") },
    { id: "six", label: "6", onClick: () => handleNumber("6") },
    { id: "add", label: "+", onClick: () => handleOperator("+") },

    { id: "one", label: "1", onClick: () => handleNumber("1") },
    { id: "two", label: "2", onClick: () => handleNumber("2") },
    { id: "three", label: "3", onClick: () => handleNumber("3") },
    { id: "equals", label: "=", onClick: handleEquals, className: "row-span-2 equals" },

    { id: "zero", label: "0", onClick: () => handleNumber("0"), className: "col-span-2" },
    { id: "decimal", label: ".", onClick: handleDecimal },
  ];

  return (
    <div className="calculator">
      <div id="display">{display}</div>
      <div className="calculator-buttons">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            id={btn.id}
            onClick={btn.onClick}
            className={btn.className || ""}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
