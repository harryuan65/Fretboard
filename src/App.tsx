import React from 'react';
import Guitar from './components/Guitar';
import Scale from './utils/ScaleFinder';

function App() {
  const defaultKey = 'C';
  const defaultScaleType = 'minor';
  const defaultScale = Scale.list(defaultKey, defaultScaleType);
  console.log(defaultScale);

  return (
    <div className="App">
      <h1>
        Displaying scale: {defaultKey} {defaultScaleType}
      </h1>
      <Guitar highlightScale={defaultScale} />
    </div>
  );
}

export default App;
