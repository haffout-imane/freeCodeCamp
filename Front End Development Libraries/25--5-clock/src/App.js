import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef(null);
  const intervalRef = useRef(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const handleBreakDecrement = () => {
    if (breakLength > 1 && !isRunning) {
      setBreakLength(prev => prev - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (breakLength < 60 && !isRunning) {
      setBreakLength(prev => prev + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (sessionLength > 1 && !isRunning) {
      setSessionLength(prev => prev - 1);
      if (timerLabel === "Session") {
        setTimeLeft((sessionLength - 1) * 60);
      }
    }
  };

  const handleSessionIncrement = () => {
    if (sessionLength < 60 && !isRunning) {
      setSessionLength(prev => prev + 1);
      if (timerLabel === "Session") {
        setTimeLeft((sessionLength + 1) * 60);
      }
    }
  };

  const handleStartStop = () => {
    setIsRunning(prev => !prev);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === 0) {
            audioRef.current.play();
            if (timerLabel === "Session") {
              setTimerLabel("Break");
              return breakLength * 60;
            } else {
              setTimerLabel("Session");
              return sessionLength * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, breakLength, sessionLength, timerLabel]);

  return (
    <div className="App">
      <div className="clock">
        <h1>25 + 5 Clock</h1>
        
        <div className="length-controls">
          <div className="break-controls">
            <h2 id="break-label">Break Length</h2>
            <div className="controls">
              <button id="break-decrement" onClick={handleBreakDecrement}>-</button>
              <span id="break-length">{breakLength}</span>
              <button id="break-increment" onClick={handleBreakIncrement}>+</button>
            </div>
          </div>

          <div className="session-controls">
            <h2 id="session-label">Session Length</h2>
            <div className="controls">
              <button id="session-decrement" onClick={handleSessionDecrement}>-</button>
              <span id="session-length">{sessionLength}</span>
              <button id="session-increment" onClick={handleSessionIncrement}>+</button>
            </div>
          </div>
        </div>

		<div className="timer">
		<div className="clock-face">
			<div className="hand minutes" style={{ transform: `rotate(${timeLeft / (sessionLength*60) * 360}deg)` }}></div>
			<div className="hand seconds" style={{ transform: `rotate(${(timeLeft % 60) * 6}deg)` }}></div>
			<div id="time-left">{formatTime(timeLeft)}</div>
		</div>
		<h2 id="timer-label">{timerLabel}</h2>
		<div className="timer-controls">
			<button id="start_stop" onClick={handleStartStop}>
			{isRunning ? 'Pause' : 'Start'}
			</button>
			<button id="reset" onClick={handleReset}>Reset</button>
		</div>
		</div>


        <audio 
          id="beep" 
          ref={audioRef}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    </div>
  );
}

export default App;
