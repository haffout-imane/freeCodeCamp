import './App.css';
import Prism from './Prism';
import { useEffect, useState } from 'react';

function App() {
  const [displayText, setDisplayText] = useState('');

  // play audio when clicked or key pressed
  function playSound(letter) {
    const audio = document.getElementById(`${letter}`);
    const sounds = {
      'Q': 'Heater 1',
      'W': 'Heater 2',
      'E': 'Heater 3',
      'A': 'Heater 4',
      'S': 'Clap',
      'D': 'Open-HH',
      'Z': "Kick-n'-Hat",
      'X': 'Kick',
      'C': 'Closed-HH'
    };
    if (audio) {
      audio.currentTime = 0; // restart from beginning
      audio.play();
      setDisplayText(sounds[letter]);
    }
  }

  // keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toUpperCase();
      if (["Q","W","E","A","S","D","Z","X","C"].includes(key)) {
        playSound(key);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className='App' style={{ width: '100%', position: 'relative' }}>
      <Prism
        animationType="rotate"
        timeScale={0.5}
        height={3}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={1}
        noise={0}
        glow={1}
      />

      <div id="drum-machine">
        <div id="display">{displayText}</div>
        <div className="drum-set">
          {/* tom-toms */}
          <div className="drum-pad tom" id="_Q" onClick={() => playSound("Q")}>
            <audio
              className="clip"
              id="Q"
              src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3"
            ></audio>
            Q
          </div>

          <div className="drum-pad tom" id="_W" onClick={() => playSound("W")}>
            <audio
              className="clip"
              id="W"
              src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3"
            ></audio>
            W
          </div>

          {/* snare */}
          <div className="drum-pad snare" id="_E" onClick={() => playSound("E")}>
            <audio
              className="clip"
              id="E"
              src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3"
            ></audio>
            E
          </div>

          {/* floor tom */}
          <div className="drum-pad floor-tom" id="_A" onClick={() => playSound("A")}>
            <audio
              className="clip"
              id="A"
              src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"
            ></audio>
            A
          </div>

          {/* bass drum-pad */}
          <div className="drum-pad bass" id="_S" onClick={() => playSound("S")}>
            <audio
              className="clip"
              id="S"
              src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3"
            ></audio>
            S
          </div>

          {/* extras */}
          <div className="drum-pad extra" id="_D" onClick={() => playSound("D")}>
            <audio
              className="clip"
              id="D"
              src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3"
            ></audio>
            D
          </div>

          <div className="drum-pad extra" id="_Z" onClick={() => playSound("Z")}>
            <audio
              className="clip"
              id="Z"
              src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3"
            ></audio>
            Z
          </div>

          <div className="drum-pad extra" id="_X" onClick={() => playSound("X")}>
            <audio
              className="clip"
              id="X"
              src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3"
            ></audio>
            X
          </div>

          <div className="drum-pad extra" id="_C" onClick={() => playSound("C")}>
            <audio
              className="clip"
              id="C"
              src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3"
            ></audio>
            C
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
