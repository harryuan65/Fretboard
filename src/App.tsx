import React from 'react';
import Guitar from './components/Guitar';
import Scale from './utils/ScaleFinder';

function App() {
  const defaultKey = 'C';
  const defaultScaleType = 'minor';
  const defaultScale = new Scale(defaultKey, defaultScaleType);
  defaultScale.calculateList();
  const scaleNotes = defaultScale.scaleNotes;

  return (
    <div className="App">
      <br />
      <Guitar highlightScale={defaultScale.scaleNotesMap} />
      <h2>
        Displaying scale: {defaultKey} {defaultScaleType}
      </h2>
      <h3>Notes: {scaleNotes.join(', ')}</h3>
    </div>
  );
}

export default App;
