import React from 'react';
import * as freq from './freq.json';
// import styles from './App.module.css';
import GuitarString from './components/GuitarString';

function App() {
  const { string1, string2, string3, string4, string5, string6 } = freq;
  return (
    <div className="App">
      <GuitarString frets={string1} />
      <GuitarString frets={string2} />
      <GuitarString frets={string3} />
      <GuitarString frets={string4} />
      <GuitarString frets={string5} />
      <GuitarString frets={string6} />
    </div>
  );
}

export default App;
