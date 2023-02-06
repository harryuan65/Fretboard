import React from 'react';
import Guitar from './components/Guitar';
import Scale from './utils/ScaleFinder';

function App() {
  const defaultKey = 'C';
  const defaultScaleType = 'minor';
  const defaultScale = Scale.list(defaultKey, defaultScaleType);
  const scaleNotes = Object.entries(defaultScale)
    .sort(([_noteA, ordInfoA], [_noteB, ordInfoB]) => {
      return ordInfoA.ord - ordInfoB.ord;
    })
    .map(([note, _ord]) => note);

  return (
    <div className="App">
      <br />
      <Guitar highlightScale={defaultScale} />
      <h2>
        Displaying scale: {defaultKey} {defaultScaleType}
      </h2>
      <h3>Notes: {scaleNotes.join(', ')}</h3>
    </div>
  );
}

export default App;
